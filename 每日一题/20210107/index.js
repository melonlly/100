//index.js
add(); // 10
import { counter, add } from "./counter.js";
counter += 1; // 报错 Assignment to constant variable.
console.log(counter);

/*
    MDN 原文：
        The static import statement is used to import read only live bindings 
        which are exported by another module

    1.import引入的模块是只读的
    2.import命令有提升效果
    3.import是静态执行，所以不能对 导入的模块或变量 使用表达式和变量
    4.import语句是Singleton模式
        // 虽然 foo和bar 分别两次导入，但是都来自于同一实例module
        import {foo} from "module";
        import {bar} from "module";
        // 等同于
        import {foo, bar} from "module";
*/