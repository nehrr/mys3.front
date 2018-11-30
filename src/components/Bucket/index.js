import React, { Component } from "react";

class Bucket extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
      </div>
    );
  }
}

export default Bucket;
