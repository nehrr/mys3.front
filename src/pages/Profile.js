import React, { Component } from "react";
import { Card, Button } from "antd";
import { TextInputField } from "evergreen-ui";
import "antd/dist/antd.css";

export default class Profile extends Component {
  //profile
  render() {
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
            onClick={() => console.log("click")}
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
            placeholder="Nickname"
            onChange={e => {
              console.log(e.target.value);
            }}
          />
        </p>
        <p>
          Email
          <TextInputField
            width={300}
            name="text-input-email"
            placeholder="Email"
            onChange={e => {
              console.log(e.target.value);
            }}
          />
        </p>
        <p>
          Age
          <TextInputField
            width={300}
            name="text-input-age"
            placeholder="Age"
            onChange={e => {
              console.log(e.target.value);
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
      </Card>
    );
  }
}
