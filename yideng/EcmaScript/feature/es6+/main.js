const worker = new Worker('./worker.js');

// worker.onmessage = (event) => {
//     console.log(event.data);
//     console.log(event);
// }

// worker.postMessage('hello melon~')

/*
    数据量大 -> 通讯效率低
        -> 多线程共享内存
        -> SharedArrayBuffer（可共享的ArrayBuffer）
*/
const sab = new SharedArrayBuffer(1024); // 1kb内存的地址

// 建视图
const intArrBuffer = new Int32Array(sab);
for (let i = 0; i < intArrBuffer.length; i++) {
    intArrBuffer[i] = i
}
console.log(intArrBuffer);

worker.postMessage(sab)