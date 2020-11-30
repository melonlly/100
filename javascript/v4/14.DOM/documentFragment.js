/*
    DocumentFragment
        唯一一个在标记中没有对应表示的类型
    DOM将 文档片段 定义为 “轻量级” 文档，能过包含和操作节点，没有完整文档的额外消耗。（不涉及渲染）
*/
let fragment = document.createDocumentFragment()
/*
    文档片段从 Node 类型继承了所有文档类型具备的可执行DOM操作的方法
        如果文档中的一个节点被添加到一个文档片段，则该节点会从文档树种移除，不会再被浏览器渲染
        添加到 文档片段 的新节点不属于文档，所以不会被浏览器渲染
    文档片段就像一个“不会被浏览器渲染的div”
*/
const ul = document.createElement('ul')
ul.id = 'myList'
document.getElementById('app').appendChild(ul) // 将ul添加到app下
/*
    如果想给这个 ul 添加3个列表项，每添加一次，浏览器就要重新渲染一次也
*/
const myList = document.getElementById('myList')
for (let i = 0; i < 3; i++) {
    let li = document.createElement('li')
    li.appendChild(document.createTextNode(`Item ${ i + 1 }`))
    fragment.appendChild(li)
}
ul.appendChild(fragment) // 将文本片段添加到真实DOM中