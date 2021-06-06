let isDone: boolean = false;
let num: number = 0;
let hexLiteral: number = 0xf00d;
let myName: string = '京程一灯';

//输入和输出一定养成好习惯
function alertName(something: string | number): void {
  console.log('something: ', something.toString());
}
const unusable: void = undefined;
// javascript:void(0) == undefined

//区别对待
//1.interface 不知道数据是什么类型！！！ sdk的时候
// interface Idata {
//   data: string;
//   item: number;
// }
// fetch("a.php").then((a:Idata))

//2.type 业务中的
//3.class类型 node多 nest.js  ioc @！！！元编程
//4.抽象类

const s = {
  data: '老袁666',
};
