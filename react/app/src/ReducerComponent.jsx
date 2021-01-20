import { useReducer } from "react";

/*
    useReducer  三个入参
        reducer

*/

const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return { ...state, count: state.count + 1 };
        case "reduce":
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

// 指定state的初始值
const initializer = { count: 1000, name: "reducer" };

const action = (state) => {
    return { count: state.count + 66 };
};

// Reducer, Store, Action  三大核心Redux

export default function ReducerComponent() {
    const [state, dispatch] = useReducer(reducer, initializer, action);
    return (
        <div>
            <h3>ReducerComponent</h3>
            <p>{state.count}</p>
            <button onClick={() => dispatch({ type: "add" })}>加</button>
            <button onClick={() => dispatch({ type: "reduce" })}>减</button>
        </div>
    );
}
