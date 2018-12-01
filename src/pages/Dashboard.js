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

    this.setState({ isShownEdit: false, id: null });
  }

  async _deleteBucket() {
    let uuid, token;
    const { id } = this.state;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.status === 400) {
      this._err("Uh oh, something went wrong");
    } else {
      toaster.notify("Your bucket was deleted");
      const buckets = await this._fetchBuckets();
      this.setState({ buckets });
    }

    this.setState({ isShownDelete: false, id: null });
  }

  _renderTable() {
    const { buckets, bucket } = this.state;
    return (
      <>
        <Dialog
          isShown={this.state.isShownEdit}
          title="Rename your bucket"
          onCloseComplete={() => this.setState({ isShownEdit: false })}
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
        <Dialog
          isShown={this.state.isShownDelete}
          title="Delete your bucket"
          intent="danger"
          onCloseComplete={() => this.setState({ isShownDelete: false })}
          confirmLabel="Confirm"
          onConfirm={() => {
            this._deleteBucket();
          }}
        >
          Are you sure you want to delete this bucket ?
        </Dialog>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Bucket name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={240}>
            {buckets.map(bucket => {
              const { name, id } = bucket;
              return (
                <Table.Row key={id}>
                  <Table.TextCell>{name}</Table.TextCell>
                  <Table.TextCell>
                    <Button
                      onClick={() => {
                        this.setState({ isShownEdit: true, id });
                      }}
                    >
                      Edit
                    </Button>
                  </Table.TextCell>
                  <Table.TextCell>
                    <Button
                      onClick={() => {
                        this.setState({ isShownDelete: true, id });
                      }}
                    >
                      Delete
                    </Button>
                  </Table.TextCell>
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
