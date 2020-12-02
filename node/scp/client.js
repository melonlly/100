var fs = require("fs");
var path = require("path");
var util = require("util");
var async = require("async");
var Buffer = require("buffer").Buffer;
var EventEmitter = require("events").EventEmitter;
var Connection = require("ssh2");
var _ = require("lodash");

function Client(options) {
    this._options = options || {};

    this.remote = {};
}
util.inherits(Client, EventEmitter);

Client.prototype.defaults = function (options) {
    if (options) {
        this._options = options || {};
    } else {
        return this._options;
    }
};

Client.prototype.parse = function (remote) {
    if (_.isString(remote)) {
        // username:password@host:/path/to
        var regex = /^([a-zA-Z0-9\-\.]+)(\:.*)?@([^:]+)(\:.*)?$/;
        var m = remote.match(regex);
        if (!m) return {};
        var ret = {
            username: m[1],
            host: m[3],
        };
        if (m[2]) {
            ret.password = m[2].slice(1);
        }
        if (m[4]) {
            ret.path = m[4].slice(1);
        }
        this.remote = ret;
        return ret;
    }
    this.remote = remote;
    return remote;
};

Client.prototype.sftp = function (callback) {
    if (this.__sftp) {
        callback(null, this.__sftp);
        return;
    }

    var remote = _.defaults(this.remote, this._options);
    if (this.__ssh) {
        this.__ssh.connect(remote);
        return;
    }

    var self = this;
    var ssh = new Connection();
    ssh.on("connect", function () {
        console.log(`connect~~~`);
        self.emit("connect");
    });
    ssh.on("ready", function () {
        console.log(`ready~~~`);
        self.emit("ready");

        ssh.sftp(function (err, sftp) {
            console.log(`ssh.sftp~~~`);
            if (err) throw err;
            // save for reuse
            self.__sftp = sftp;
            callback(err, sftp);
        });
    });
    ssh.on("error", function (err) {
        console.error(err);
        self.emit("error", err);
    });
    ssh.on("end", function () {
        console.log(`end~~~`);
        self.emit("end");
    });
    ssh.on("close", function () {
        console.log(`close~~~`);
        self.emit("close");
    });
    ssh.connect(remote);
    this.__ssh = ssh;
};
Client.prototype.close = function () {
    if (this.__sftp) {
        this.__sftp.end();
    }
    if (this.__ssh) {
        this.__ssh.end();
    }
};

Client.prototype.mkdir = function (dir, attrs, callback) {
    if (_.isFunction(attrs)) {
        callback = attrs;
        attrs = undefined;
    }
    var self = this;
    var dirs = [];
    var exists = false;

    this.sftp(function (err, sftp) {
        console.log(`sftp callback~`);
        // for record log
        var mkdir = function (dir, callback) {
            self.emit("mkdir", dir);
            sftp.mkdir(dir, attrs, callback);
        };

        async.until(
            function () {
                console.log(exists);
                return exists;
            },
            function (done) {
                console.log(dir);
                // detect if the directory exists
                sftp.stat(dir, function (err, attr) {
                    if (err) {
                        dirs.push(dir);
                        dir = path.dirname(dir);
                    } else {
                        exists = true;
                    }
                    done();
                });
            },
            function (err) {
                if (err) {
                    callback(err);
                } else {
                    // just like mkdir -p
                    async.eachSeries(dirs.reverse(), mkdir, callback);
                }
            }
        );
    });
};

Client.prototype.write = function (options, callback) {
    var destination = options.destination;
    destination = unixy(destination);

    var attrs = options.attrs;
    var content = options.content;
    if (!Buffer.isBuffer(content)) {
        content = new Buffer(content, options.encoding);
    }
    var self = this;

    this.sftp(function (err, sftp) {
        var _write = function (handle) {
            self.emit("write", options);
            console.log(`sftp.write~~~ ${ handle }`);
            try {
                sftp.write(handle, content, 0, content.length, 0, function (err) {
                    var writeErr = err;
                    console.error(err);
                    sftp.close(handle, function (err) {
                        callback(err || writeErr);
                    });
                });
            } catch (error) {
                console.error(error);
            }
        };

        console.log(destination);
        sftp.open(destination, "w", attrs, function (err, handle) {
            try {
                const ws = sftp.createWriteStream(destination)
                // ws.write(content, '', () => {
                //     console.log(`sftp.stream.write~~~`);
                //     self.emit("write", options)
                // })
                ws.end(content, '', () => {
                    console.log(`${ destination } 传输完成`);
                    sftp.close(handle, function (err) {
                        callback(err || '');
                    })
                })
            } catch (error) {
                console.error(error);
            }
        })

        // sftp.open(destination, "w", attrs, function (err, handle) {
        //     console.error(err, handle.length, handle.toString());
        //     if (err) {
        //         // destination is directory
        //         destination = path.join(
        //             destination,
        //             path.basename(options.source)
        //         );
        //         destination = unixy(destination);

        //         // for emit write event
        //         options.destination = destination;
        //         sftp.open(destination, "w", attrs, function (err, handle) {
        //             _write(handle);
        //         });
        //     } else {
        //         _write(handle);
        //     }
        // });
    });
};

Client.prototype.upload = function (src, dest, callback) {
    dest = unixy(dest);

    var self = this,
        _attrs,
        _buffer;

    async.waterfall(
        [
            function (callback) {
                fs.stat(src, callback);
            },
            function (stats, callback) {
                _attrs = util.inspect(stats);
                fs.readFile(src, callback);
            },
            function (buffer, callback) {
                _buffer = buffer;
                // 是否包含反斜杠
                if (/\/$/.test(dest)) {
                    self.mkdir(dest, _attrs, callback);
                } else {
                    self.mkdir(path.dirname(dest), _attrs, callback);
                }
            },
            function (callback) {
                console.log(`write~~~ ${ _buffer.length }`);
                self.write(
                    {
                        source: src,
                        destination: dest,
                        content: _buffer,
                        attrs: _attrs,
                    },
                    callback
                );
            },
        ],
        function (err) {
            callback(err);
        }
    );
};

Client.prototype.download = function (src, dest, callback) {
    var self = this;
    var _sftp, _handle, _buffer;

    async.waterfall(
        [
            function (callback) {
                self.sftp(function (err, sftp) {
                    _sftp = sftp;
                    callback(err, sftp);
                });
            },
            function (sftp, callback) {
                sftp.open(src, "r", callback);
            },
            function (handle, callback) {
                _handle = handle;
                _sftp.fstat(handle, callback);
            },
            function (attrs, callback) {
                _buffer = new Buffer(attrs.size);
                self.emit("read", src);
                _sftp.read(_handle, _buffer, 0, attrs.size, 0, callback);
            },
            function (bytesRead, buffer, position, callback) {
                callback(null, buffer);
            },
            function (buffer, callback) {
                fs.writeFile(dest, buffer, callback);
            },
        ],
        function (err) {
            callback(err);
        }
    );
};

var client = new Client();
exports = module.exports = client;
exports.Client = Client;

function unixy(filepath) {
    if (process.platform === "win32") {
        filepath = filepath.replace(/\\/g, "/");
    }
    return filepath;
}
