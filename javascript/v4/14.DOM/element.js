/*
    Element
*/
const div = document.createElement('div') // Element
div.className = 'app' // 定义 div 样式
console.log(div)
const text = document.createTextNode('melon')
div.append(text) // 为 div 添加 text

console.log(typeof div)