import { useContext } from "react";
import { context, ContextProvider } from "./ContextProvider";

function ContextChild() {
    const { count = 0, mul, divide } = useContext(context);
    return (
        <div>
            <h3>ContextChild组件</h3>
            <p>{count}</p>
            <button onClick={mul}>乘</button>
            <button onClick={divide}>除</button>
        </div>
    );
}

export default () => (
    <ContextProvider>
        <ContextChild />
    </ContextProvider>
);
