import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Card, Button } from "antd";
import { TextInput, toaster } from "evergreen-ui";
import "antd/dist/antd.css";

export default class Profile extends Component {
  //profile
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      email: "",
      password: "",
      password_confirmation: "",
      isConnected: false
    };
  }

  componentDidMount() {
    if (this.props.user) {
      const { nickname, email } = this.props.user;
      this.setState({ nickname, email, isConnected: true });
    }
  }

  _update(field, value) {
    this.setState({ [field]: value });
  }

  async _updateUser(user) {
    let uuid, token;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const { nickname, email, password, password_confirmation } = this.state;
    user = { nickname, email, password, password_confirmation };
    if (user.password !== user.password_confirmation) {
      this._err("Passwords don't match");
    }

    const data = await fetch(`http://localhost:5000/api/users/${uuid}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });

    if (data.status === 400) {
      const res = await data.json();
      this._err(res.err.fields);
    } else {
      toaster.notify("Your profile was modified");
    }
  }

  _err(err) {
    toaster.warning(err);
  }

  render() {
    const { nickname, email } = this.state;
    return (
      <Card
        style={{ width: 360 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Button
            type="primary"
            size="small"
            onClick={() => this._updateUser(this.state)}
          >
            Edit
          </Button>
        ]}
      >
        <>
          Nickname
          <TextInput
            width={300}
            name="text-input-nickname"
            placeholder={nickname}
            onChange={e => {
              this._update("nickname", e.target.value);
            }}
          />
        </>

        <>
          Email
          <TextInput
            width={300}
            name="text-input-email"
            placeholder={email}
            onChange={e => {
              this._update("email", e.target.value);
            }}
          />
        </>

        <>
          Password
          <TextInput
            width={300}
            type="password"
            name="text-input-password"
            placeholder="Password"
            onChange={e => {
              this._update("password", e.target.value);
            }}
          />
        </>

        <>
          Password Confirmation
          <TextInput
            width={300}
            type="password"
            name="text-input-password-confirmation"
            placeholder="Password Confirmation"
            onChange={e => {
              this._update("password_confirmation", e.target.value);
            }}
          />
        </>
      </Card>
    );
  }
}
