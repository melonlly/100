const div = document.createElement('div')
div.className = 'app' // 定义 div 样式
console.log(div.nodeType) // 1
console.log(div.nodeName, div.nodeValue) // DIV null
const text = document.createTextNode('melon')
console.log(text.nodeType) // 3
console.log(text.nodeName, text.nodeValue) // #text melon
div.append(text) // 为 div 添加 text

/*
    Document 类型
*/
console.log(
    document.nodeType,
    document.nodeName,
    document.nodeValue,
    document.parentNode,
    document.ownerDocument
) // 9 "#document" null null null
// 文档写入
document.write(`<strong>${ (new Date()).toUTCString() }</strong>`)
document.writeln(div.outerHTML)
document.write(`<script onload="onScriptLoaded()" src="./test.js"></script>`)
try {
    console.log(`查看全局变量test：${ test }`)
} catch (error) {
    console.log(error) // test is not defined
}
// 脚本加载完成回调
function onScriptLoaded(e) {
    console.log(`脚本加载完成`)
    console.log(e)
    console.log(`查看全局变量test：${ test }`) // 111
    test = 222 // 修改全局变量test

    hi() // 222
}

// sleep(300)

/*
    DOM 编程
*/
const script = document.createElement('script')
script.appendChild(document.createTextNode(
    `
        function hi() {
            console.log('invoke dynamic function hi：' + test)
        }
    `
))
script.text = `
    function hi() {
        console.log('invoke dynamic function hi-text：' + test)
    }
`
document.body.appendChild(script)
// hi() // 111