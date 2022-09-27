import React from "react";

export class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 1,
    };
  }

  compontentDidUpdate() {
    console.log("Hello from componentDidUpdate");
  }

  handleCounterIncrement = () => {
    // this.state.counter++;
    this.setState({ counter: ++this.state.counter });
    console.log(this.counter);
  };

  handleCounterDecrement = () => {
    this.setState({ counter: --this.state.counter });
  };

  render() {
    return (
      <div>
        <h1 className="p-4 bg-light">{this.state.counter}</h1>
        <button
          className="btn btn-outline-success d-block mb-3"
          type="submit"
          onClick={this.handleCounterIncrement}
        >
          Increment counter
        </button>

        <button
          className="btn btn-outline-success d-block mb-3"
          type="submit"
          onClick={this.handleCounterDecrement}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}
