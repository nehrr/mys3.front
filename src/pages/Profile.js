import React, { Component } from "react";
import { Card, Button } from "antd";
import { TextInput } from "evergreen-ui";
import "antd/dist/antd.css";

export default class Profile extends Component {
  //profile

  state = {
    nickname: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  componentDidMount() {
    if (this.props.user) {
      const { nickname, email } = this.props.user;
      this.setState({ nickname, email });
    }
  }

  _update(field, value) {
    this.setState({ [field]: value });
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
            onClick={() => console.log(this.state)}
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
              console.log(e.target.value);
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
              console.log(e.target.value);
            }}
          />
        </>
      </Card>
    );
  }
}
