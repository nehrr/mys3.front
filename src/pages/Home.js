import React, { Component } from "react";
import { TextInputField, Pane } from "evergreen-ui";

export default class Home extends Component {
  _render() {
    if (!this.props.isConnected) {
      return (
        <Pane>
          <TextInputField
            width={320}
            label="Nickname"
            name="text-input-nickname"
            placeholder="Nickname"
          />
          <TextInputField
            width={320}
            label="Password"
            type="password"
            name="text-input-password"
            placeholder="Password"
          />
        </Pane>
      );
    } else {
      return (
        <Pane>
          <h1>Hello {this.props.name}</h1>
        </Pane>
      );
    }
  }
  render() {
    return this._render();
  }
}
