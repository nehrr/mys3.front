import React, { Component } from "react";
import { TextInputField, Pane, toaster } from "evergreen-ui";
import { Button } from "antd";

export default class Register extends Component {
  //register

  state = {
    nickname: "",
    email: "",
    password: "",
    password_confirmation: "",
    err: ""
  };

  _fill(field, value) {
    this.setState({ [field]: value });
  }

  async _register(user) {
    const { nickname, email, password, password_confirmation } = this.state;
    user = { nickname, email, password, password_confirmation };
    const data = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const res = await data.json();

    if (res.err) {
      this._err(res.err.fields);
    } else {
      toaster.notify("You were registered");
    }
  }

  _err(err) {
    toaster.warning(err);
  }

  _form() {
    return (
      <Pane>
        <TextInputField
          width={320}
          label="Nickname"
          name="text-input-nickname"
          placeholder="Nickname"
          onChange={e => {
            this._fill("nickname", e.target.value);
          }}
        />
        <TextInputField
          width={320}
          label="Email"
          name="text-input-email"
          placeholder="Email"
          onChange={e => {
            this._fill("email", e.target.value);
          }}
        />
        <TextInputField
          width={320}
          label="Password"
          type="password"
          name="text-input-password"
          placeholder="Password"
          onChange={e => {
            this._fill("password", e.target.value);
          }}
        />
        <TextInputField
          width={320}
          label="Password Confirmation"
          type="password"
          name="text-input-password-confirmation"
          placeholder="Password Confirmation"
          onChange={e => {
            this._fill("password_confirmation", e.target.value);
          }}
        />
        <Button
          type="primary"
          size="small"
          onClick={() => this._register(this.state)}
        >
          Register
        </Button>
      </Pane>
    );
  }
  render() {
    return this._form();
  }
}
