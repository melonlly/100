function updateTime() {
    this.time = new Date().toUTCString()
    this.timmer = this.timmer || setInterval(() => {
        this.time = new Date().toUTCString()
    }, 1000)
    return this.time
}

const http = require('http')
http.createServer((req, res) => {
    const { url } = req
    console.log(`${ new Date().getTime() } : ${ url }`)
    if ("/" === url) {
        res.end(`
            <html>
                html get now time -> ${ updateTime() }
                <script src="main.js"></script>
            </html>
        `)
    } else if ("/main.js" === url) {
        const js = `document.writeln('<br/>js get now time -> ${ updateTime() }')`

        /*
            强缓存策略：在浏览器内部通过时间比对完成
                expires - http 1.0
                    指定时间副本过期，未过期期间，浏览器不会请求后台，会请求到缓存数据
                    问题：
                        将客户端时间与服务端时间进行比对，不太靠谱，因为客户端和服务端是两台不同机器

                cache-control - http 1.1 （优先级高于expires）

        */
        // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString()) // 当前时间10秒后过期（格林尼治时间）
        // res.setHeader('Cache-Control', 'max-age=20') // 20秒后过期

        /*
            协商缓存
                last-modified & if-modified-since
                    浏览器                                                                  服务器
                                            --> request index.js
                                <-- response index.js ( last-modified: 上次更新时间 )
                            --> request index.js ( if-modified-since: 同last-modified )
                                            <-- 200 index.js (过期)
                                                   或                                     判断是否过期：最近修改时间 + 存活时间 > 当前时间 ? 缓存命中（304） : 缓存失效（200）
                                            <-- 304 index.js (未过期)
                
                etag & if-None-Match
                    浏览器                                                                  服务器
                                            --> request index.js
                                <-- response index.js ( etag: 目标内容hash值 )
                                --> request index.js ( if-none-match: 同etag )
                                            <-- 200 index.js (过期)
                                                   或                                     判断是否过期：请求的etag === 目标内容最新etag ? 缓存命中（304） : 缓存失效（200）
                                            <-- 304 index.js (未过期)

        */
        res.setHeader('Cache-Control', 'no-cache') // 不强制缓存
        // res.setHeader('last-modified', new Date().toUTCString()) // 最近修改时间（格林尼治时间）
        // // 最近修改时间 + 存活时间 > 当前时间 ? 缓存命中（304） : 缓存失效（200）
        // if (new Date(req.headers['if-modified-since']).getTime() + 10 * 1000 > Date.now()) {
        //     console.log(`${ url } -> modified -> 缓存命中`)
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }

        const crypto = require('crypto')
        // js字符串 通过 sha1算法 转成 Hash对象 再转换成 十六进制字符串
        const hash = crypto.createHash('sha1').update(js).digest('hex')
        res.setHeader('Etag', hash)
        if (req.headers['if-none-match'] === hash) {
            console.log(`${ url } -> etag -> 缓存命中`)
            res.statusCode = 304
            res.end()
            return
        }

        res.statusCode = 200
        res.end(js)
    } else if ("/favicon.ico" === url) {
        res.end('')
    }
}).listen(9999, () => {
    console.log(`http cache server is running at 9999`)
})