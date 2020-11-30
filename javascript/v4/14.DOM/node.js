/*
    节点类型 nodeType
        最常用节点类型
            Node.ELEMENT_NODE   元素 1
            Node.TEXT_NODE      文本 3
*/
// 一个 元素 节点
console.log(Node.ELEMENT_NODE) // 1
// 已被弃用
console.log(Node.ATTRIBUTE_NODE) // 2
// Element 或者 Attr 中实际的  文字
console.log(Node.TEXT_NODE) // 3
// 一个 CDATASection，例如 <!CDATA[[ … ]]>
console.log(Node.CDATA_SECTION_NODE) // 4
// 已被弃用
console.log(Node.ENTITY_REFERENCE_NODE) // 5
// 已被弃用
console.log(Node.ENTITY_NODE) // 6
// 一个用于XML文档的 ProcessingInstruction ，例如 <?xml-stylesheet ... ?> 声明
console.log(Node.PROCESSING_INSTRUCTION_NODE) // 7
// 一个 Comment 节点
console.log(Node.COMMENT_NODE) // 8
// 一个 Document 节点
console.log(Node.DOCUMENT_NODE) // 9
// 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html>  就是用于 HTML5 的
console.log(Node.DOCUMENT_TYPE_NODE) // 10
// 一个 DocumentFragment 节点
console.log(Node.DOCUMENT_FRAGMENT_NODE) // 11
// 已被弃用
console.log(Node.NOTATION_NODE) // 12 

console.log(`============================================================`)

const div = document.createElement('div')
div.className = 'app' // 定义 div 样式
console.log(div.nodeType) // 1
console.log(div.nodeName, div.nodeValue) // DIV null
const text = document.createTextNode('melon')
console.log(text.nodeType) // 3
console.log(text.nodeName, text.nodeValue) // #text melon
div.append(text) // 为 div 添加 text