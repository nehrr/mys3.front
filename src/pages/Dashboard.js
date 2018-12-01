import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Table, TextInput, Button, toaster, Dialog } from "evergreen-ui";

export default class Dashboard extends Component {
  //arbo
  state = { bucket: "", isLoading: true, isShown: false };

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

  async _updateBucket(name) {
    let uuid, token;
    const { id } = this.state;
    console.log(name, this.state.id);
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${id}`,
      {
        method: "PUT",
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
      toaster.notify("Your bucket was updated");
      const buckets = await this._fetchBuckets();
      this.setState({ buckets });
    }

    this.setState({ id: null });
  }

  _openDialog() {
    console.log(this.state);
    this.setState({ isShown: true });
    return (
      <Dialog
        isShown={this.state.isShow}
        title="Dialog title"
        onCloseComplete={() => this.setState({ isShown: false })}
        confirmLabel="Custom Label"
      >
        Rename your bucket
        <TextInput
          width={300}
          name="text-input-bucket-name"
          placeholder="Name"
          onChange={e => {
            this._update("bucket", e.target.value);
          }}
        />
      </Dialog>
    );
  }

  _renderTable() {
    const { buckets, bucket } = this.state;
    return (
      <>
        <Dialog
          isShown={this.state.isShown}
          title="Rename your bucket"
          onCloseComplete={() => this.setState({ isShown: false })}
          confirmLabel="Confirm"
          onConfirm={() => {
            this._updateBucket(bucket);
          }}
        >
          <TextInput
            width={300}
            name="text-input-bucket-name"
            placeholder="Name"
            onChange={e => {
              this._update("bucket", e.target.value);
            }}
          />
        </Dialog>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Bucket name</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={240}>
            {buckets.map(bucket => {
              const { name, id } = bucket;
              return (
                <Table.Row key={id}>
                  <Table.TextCell>{id}</Table.TextCell>
                  <Table.TextCell>{name}</Table.TextCell>
                  <Table.TextCell>
                    <Button
                      onClick={() => {
                        this.setState({ isShown: true, id });
                      }}
                    >
                      Edit
                    </Button>
                  </Table.TextCell>
                  <Table.TextCell>Delete</Table.TextCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  }

  render() {
    const { bucket, buckets } = this.state;
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
            onClick={() => this._addBucket(bucket)}
          >
            Add bucket
          </Button>
          {buckets ? this._renderTable() : null}
        </>
      );
    }
  }
}
