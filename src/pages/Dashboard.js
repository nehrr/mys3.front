import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Table, TextInput, Button, toaster } from "evergreen-ui";

export default class Dashboard extends Component {
  //arbo
  state = { bucket: "", isLoading: true };

  _update(field, value) {
    this.setState({ [field]: value });
  }

  async _addBucket(name) {
    let uuid, token;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      }
    );

    if (data.status === 400) {
      this._err("Uh oh, something went wrong");
    } else {
      toaster.notify("Your bucket was added");
      const buckets = await this._fetchBuckets();
      this.setState({ buckets });
    }
  }

  _err(err) {
    toaster.warning(err);
  }

  async _fetchBuckets() {
    let uuid, token;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }

    let data = await fetch(`http://localhost:5000/api/users/${uuid}/buckets/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    data = await data.json();

    return data.data.buckets;
  }

  async componentDidMount() {
    const buckets = await this._fetchBuckets();
    this.setState({ buckets, isLoading: false });
  }

  _renderTable() {
    const { buckets } = this.state;
    return (
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Bucket name</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {buckets.map(bucket => {
            return (
              <Table.Row key={bucket.id}>
                <Table.TextCell>{bucket.name}</Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  render() {
    if (this.isLoading) {
      return <h1>Please Wait</h1>;
    } else {
      return (
        <>
          Bucket name
          <TextInput
            width={300}
            name="text-input-nickname"
            placeholder='"Bucket name"'
            onChange={e => {
              this._update("bucket", e.target.value);
            }}
          />
          <Button
            type="primary"
            size="small"
            onClick={() => this._addBucket(this.state.bucket)}
          >
            Add bucket
          </Button>
          {this.state.buckets ? this._renderTable() : null}
        </>
      );
    }
  }
}
