import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import ContextChild from "./ContextChild";
import ReducerComponent from "./ReducerComponent";
import useCounter from "./useCounter"; // 自定义hook

function ComponentHook() {
    const basic = 6;

    const inputRef = useRef(null);

    let [num, setNum] = useCounter();
    console.log(`自定义hook -> ${num}`);

    // 初始化赋值，只在首次渲染的时候赋值
    // 再次渲染组件，获取到的就不是初始值，而是闭包中的缓存值
    // let [count, setCount] = useState(0);
    let [count, setCount] = useState(() => 10 * basic);
    let [refresh, setRefresh] = useState(false);

    // dom渲染完成之后执行
    /*
        第二个参数 deps
            @param deps — If present, effect will only activate if the values in the list change.
        effect只会在依赖列表中的值发送改变时触发

        副作用函数的回调函数的调用时机
            1.组件卸载前
            2.下一个副作用执行之前
        不同的effect回调只与其effect匹配
            effect-count => effect-count-callback
            effect-once => effect-once-callback
    */
    useEffect(() => {
        console.log(`effect-count`);
        setTimeout(() => setCount(++count), 1500);
        return () => console.log(`effect-count-callback`);
    }, [refresh]);
    /*
        使用 useEffect 对 count 延时1500ms执行加一的副作用后，
            effect一直都在执行？？
        dom渲染完成 -> useEffect -> 修改state -> 重新渲染 -> dom渲染完成
            无限循环！！
    */
    useEffect(() => {
        console.log(`effect-once`);
        inputRef.current.focus(); // 渲染完成自动获取焦点
        return () => console.log(`effect-once-callback`);
    }, []);

    /*
        数据保存（通过闭包实现）
    */
    const memo1 = useCallback(() => count, [refresh]); // 返回的是一个函数
    const memo2 = useMemo(() => count, [refresh]); // 返回的是具体值
    console.log(`memo1 -> ${memo1()}`);
    console.log(`memo2 -> ${memo2}`);
    console.log(`count -> ${count}`);

    function handleClick() {
        // 传入值可以是任意类型，state的改变都是异步的
        // setCount(++count);
        setCount((count) => ++count);
    }
    function handleRefresh() {
        setRefresh((refresh) => !refresh); // 多次点击 -> 多次渲染 -> 多次触发effect-count -> 但是只改变了一次count
    }
    return (
        <div>
            <input type="text" id="melon" ref={inputRef} />
            <h3>Component-Hook-{count}</h3>
            <button onClick={handleClick}>+1</button>
            <button onClick={handleRefresh}>刷新</button>
            <p>
                -------------------------------------------------------------------------------------------------
            </p>
            <ContextChild />
            <p>
                -------------------------------------------------------------------------------------------------
            </p>
            <ReducerComponent />
            <p>
                -------------------------------------------------------------------------------------------------
            </p>
        </div>
    );
}

export default ComponentHook;
