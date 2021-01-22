import React from "react";
import { connect } from "react-redux";

class ReduxCounter extends React.Component {
    add = () => {};
    reduce = () => {};
    render() {
        return (
            <div>
                <h3>ReduxCounter</h3>
                <p></p>
                <button onClick={this.add}>+1</button>
                <button onClick={this.reduce}>-1</button>
            </div>
        );
    }
}

function mapStateToProp(state) {
    return {
        count: state.count
    }
}

export default connect(mapStateToProp)(ReduxCounter);
