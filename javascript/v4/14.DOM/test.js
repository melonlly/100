console.log(`add by document.write(script)`)
let test = 111 // 变量测试
console.log(`通过 document.write 添加的脚本被执行时的test：${ test }`) // 111
setTimeout(() => {
    // 被其他脚本改变了
    console.log(`被修改的全局变量test：${ test }`) // 222
}, 1000)