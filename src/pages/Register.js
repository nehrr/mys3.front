import React, { Component } from "react";
import { TextInputField, Pane } from "evergreen-ui";

export default class Register extends Component {
  //register

  _form() {
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
          label="Email"
          name="text-input-email"
          placeholder="Email"
        />
        <TextInputField
          width={320}
          label="Age"
          name="text-input-age"
          placeholder="Age"
        />
        <TextInputField
          width={320}
          label="Password"
          type="password"
          name="text-input-password"
          placeholder="Password"
        />
        <TextInputField
          width={320}
          label="Password Confirmation"
          type="password"
          name="text-input-password-confirmation"
          placeholder="Password Confirmation"
        />
      </Pane>
    );
  }
  render() {
    return this._form();
  }
}
