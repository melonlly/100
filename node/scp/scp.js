var fs = require("fs");
var path = require("path");
var glob = require("glob");
var async = require("async");
var client = require("./client");

function cp2remote(src, dest, callback) {
    client.parse(dest);

    var _upload = function (files, callback) {
        var rootdir = files[0];

        async.eachSeries(
            files,
            function (fpath, done) {
                fs.stat(fpath, function (err, stats) {
                    if (err) {
                        done(err);
                        return;
                    }
                    if (stats.isFile()) {
                        var fname = path.relative(rootdir, fpath);
                        var dest = path.join(client.remote.path, fname)
                        dest = dest.replace(/\\/g, '/')
                        console.log(fpath);
                        console.log(dest);
                        client.upload(
                            fpath,
                            dest,
                            done
                        );
                    } else {
                        done();
                    }
                });
            },
            function (err) {
                // never forget to close the session
                client.on("close", function () {
                    console.error(err);
                    callback(err);
                });
                client.close();
            }
        );
    };
    console.log(src, dest);
    if (src.indexOf("*") === -1) {
        fs.stat(src, function (err, stats) {
            if (err) {
                callback(err);
                return;
            }
            // console.log(stats.isFile(), stats.isDirectory());
            if (stats.isFile()) {
                client.upload(src, client.remote.path, function (err) {
                    client.on("close", function () {
                        callback(err);
                    });
                    client.close();
                });
            } else if (stats.isDirectory()) {
                console.log(src.replace(/\/$/, "") + "/**/**");
                glob(src.replace(/\/$/, "") + "/**/**", function (err, files) {
                    if (err) {
                        callback(err);
                    } else {
                        // console.log(files);
                        _upload(files, callback);
                    }
                });
            } else {
                callback("unsupported");
            }
        });
    } else {
        glob(src, function (err, files) {
            if (err) {
                callback(err);
                return;
            }
            _upload(files, callback);
        });
    }
}

function cp2local(src, dest, callback) {
    var remote = client.parse(src);
    // only works on single file now
    // TODO: glob match
    if (/\/$/.test(dest)) {
        dest = dest + path.basename(remote.path);
    }
    client.download(remote.path, dest, callback);
}

exports = module.exports = client;

exports.scp = function (src, dest, callback) {
    var parsed = client.parse(src);
    if (parsed.host && parsed.path) {
        cp2local(parsed, dest, callback);
    } else {
        cp2remote(src, dest, callback);
    }
};
