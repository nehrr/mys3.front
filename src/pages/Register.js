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
    }
  }

  async _test() {
    let uuid = "64aa2180-9880-4cb4-b04c-c721f460ba5b";
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjRhYTIxODAtOTg4MC00Y2I0LWIwNGMtYzcyMWY0NjBiYTViIiwibmlja25hbWUiOiJKYWNrIiwiZW1haWwiOiJqYWNrQGNpdGFkZWwuaG0iLCJpYXQiOjE1NDM1NzUxNTJ9.zKpNrLLcHNxfhrxamJCUnxGYwvXlwblE0GclxFaE2jA";
    let data = await fetch(`http://localhost:5000/api/users/${uuid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    data = await data.json();
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
