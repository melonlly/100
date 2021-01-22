import { createStore } from "redux";

const initialState = {
    count: 0
}

// ！state变化时需要返回全新的对象，而不是修改传入的state
function reducer(state = initialState, action) {
    console.log("reducer", state, action);
    return state
}

const store = createStore(reducer);
store.dispatch({type:'ADD'})
store.dispatch({type:'REDUCE'})

export default store
