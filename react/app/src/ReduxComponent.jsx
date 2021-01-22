import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import ReduxCounter from "./ReduxCounter"

class ReduxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }
    add = () => {
        this.setState({
            count: this.state.count + 1,
        });
    };
    reduce = () => {
        this.setState({
            count: this.state.count - 1,
        });
    };
    render() {
        return (
            <div>
                <h3>ReduxComponent</h3>
                <p>{this.state.count}</p>
                <button onClick={this.add}>+1</button>
                <button onClick={this.reduce}>-1</button>
                <Provider store={store}>
                    <ReduxCounter />
                </Provider>
            </div>
        );
    }
}

export default ReduxComponent