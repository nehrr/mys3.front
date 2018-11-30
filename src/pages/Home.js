import React, { Component } from "react";
import { TextInputField, Pane, toaster } from "evergreen-ui";
import { Button } from "antd";

export default class Home extends Component {
  state = {
    nickname: "",
    password: "",
    err: "",
    token: "",
    isConnected: false,
    uuid: ""
  };

  _update(field, value) {
    this.setState({ [field]: value });
  }

  async _login(user) {
    const { nickname, password } = this.state;
    user = { nickname, password };
    const data = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const res = await data.json();
    // let err = res.err ? res.err.fields : null;
    if (res.err) {
      this.setState({ err: res.err.description });
    } else {
      const { token } = res.meta;
      const { uuid } = res.data.user;
      this.setState({ token, isConnected: true, uuid });
      console.log(this.state);
    }
  }

  _err() {
    const { err } = this.state;
    toaster.warning(err);
  }

  _render() {
    if (!this.state.isConnected) {
      const { err } = this.state;
      return (
        <Pane>
          <TextInputField
            width={320}
            label="Nickname"
            name="text-input-nickname"
            placeholder="Nickname"
            onChange={e => this._update("nickname", e.target.value)}
          />
          <TextInputField
            width={320}
            label="Password"
            type="password"
            name="text-input-password"
            placeholder="Password"
            onChange={e => this._update("password", e.target.value)}
          />
          <Button
            type="primary"
            size="small"
            onClick={() => this._login(this.state)}
          >
            Login
          </Button>
          {/* {err ? this._err() : null} */}
        </Pane>
      );
    } else {
      const { nickname } = this.state;
      return (
        <Pane>
          <h1>Hello {nickname}</h1>
        </Pane>
      );
    }
  }
  render() {
    return this._render();
  }
}
