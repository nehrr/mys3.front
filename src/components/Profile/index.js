import React, { Component } from "react";
import { Card, Button } from "antd";
import { TextInputField } from "evergreen-ui";
import "antd/dist/antd.css";

export default class Profile extends Component {
  //profile

  state = {
    nickname: "",
    email: "",
    age: "",
    password: "",
    password_confirmation: ""
  };

  _update(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const { nickname, email, age } = this.state;
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
            onClick={() => console.log(this.state)}
          >
            Edit
          </Button>
        ]}
      >
        <p>
          Nickname
          <TextInputField
            width={300}
            name="text-input-nickname"
            placeholder={nickname}
            onChange={e => {
              this._update("nickname", e.target.value);
            }}
          />
        </p>
        <p>
          Email
          <TextInputField
            width={300}
            name="text-input-email"
            placeholder={email}
            onChange={e => {
              this._update("email", e.target.value);
            }}
          />
        </p>
        <p>
          Age
          <TextInputField
            width={300}
            name="text-input-age"
            placeholder={age}
            onChange={e => {
              this._update("age", e.target.value);
            }}
          />
        </p>
        <p>
          Password
          <TextInputField
            width={300}
            type="password"
            name="text-input-password"
            placeholder="Password"
            onChange={e => {
              console.log(e.target.value);
            }}
          />
        </p>
        <p>
          Password Confirmation
          <TextInputField
            width={300}
            type="password"
            name="text-input-password-confirmation"
            placeholder="Password Confirmation"
            onChange={e => {
              console.log(e.target.value);
            }}
          />
        </p>
      </Card>
    );
  }
}
