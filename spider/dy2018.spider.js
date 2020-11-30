const originRequest = require("request");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");

function request(url, callback) {
    originRequest(
        url,
        {
            encoding: null,
        },
        callback
    );
}

for (let i = 100553; i < 100564; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`
    request(url, function (err, res, body) {
        if (body) {
            let html = ''
            if (typeof body === 'object') {
                // body = body.toString()
                html = iconv.decode(body, 'gb2312')
            }
            const $ = cheerio.load(html)
            console.log($('.title_all h1').text())
        } else {
            console.error(err)
        }
    })
}
