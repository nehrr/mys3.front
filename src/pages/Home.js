import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { TextInputField, Pane, toaster } from "evergreen-ui";
import { Button } from "antd";

export default class Home extends Component {
  state = {
    nickname: "",
    password: "",
    err: "",
    token: "",
    isConnected: false,
    uuid: "",
    redirect: false
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

    if (res.err) {
      this._err(res.err.description);
    } else {
      const { token } = res.meta;
      const { uuid } = res.data.user;
      const { user } = res.data;
      console.log(token);
      this.setState({ token, isConnected: true, uuid, redirect: true });
      this.props.handleUser(user, token);
    }
  }

  _err(err) {
    toaster.warning(err);
  }

  _render() {
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
      </Pane>
    );
  }
  render() {
    const { nickname } = this.state;
    if (!this.state.redirect) {
      return this._render();
    } else {
      return <h1>Hello {nickname}</h1>;
    }
  }
}
