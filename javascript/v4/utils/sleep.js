/*
    伪死循环
        由于 js 是单线程，通过 while 制造伪死循环，实现真正的阻塞
*/
function sleep(delay) {
    var start = new Date().getTime()
    while (new Date().getTime() - start < delay) {
        continue
    }
}

/*
    异步模式
        setTimeout
        Promise
        generator
        async/await
*/