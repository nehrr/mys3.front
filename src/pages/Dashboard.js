import React, { Component } from "react";

import jwt from "jsonwebtoken";
import {
  Table,
  TextInput,
  toaster,
  Dialog,
  SideSheet,
  Card,
  Icon
} from "evergreen-ui";

export default class Dashboard extends Component {
  //arbo
  state = { bucket: "", isLoading: true, myFile: null };

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
      const res = await data.json();
      this._err(res.err.fields);
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

  async _fetchBlobs(id) {
    let uuid, token;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }

    let data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${id}/blobs`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    data = await data.json();

    if (data.data.blobs) {
      this.setState({ blobs: data.data.blobs });
    }
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
      const res = await data.json();
      this._err(res.err.fields);
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
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.status === 400) {
      const res = await data.json();
      this._err(res.err.fields);
    } else {
      toaster.notify("Your bucket was deleted");
      const buckets = await this._fetchBuckets();
      this.setState({ buckets });
    }

    this.setState({ isShownDelete: false, id: null });
  }

  async _uploadBlob() {
    const { blob, myFile, bucket } = this.state;

    let formData = new FormData();

    formData.append("file_to_upload", myFile);
    formData.append("name", blob);

    let uuid, token;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${bucket}/blobs/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    if (data.status === 400) {
      const res = await data.json();
      this._err(res.err.fields);
    } else {
      toaster.notify("Your blob was added");
      const blobs = await this._fetchBlobs(bucket);
    }
  }

  async _deleteBlob() {
    let uuid, token;
    const { bucket, id } = this.state;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${bucket}/blobs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (data.status === 400) {
      const res = await data.json();
      this._err(res.err.fields);
    } else {
      toaster.notify("Your blob was deleted");
      const blobs = await this._fetchBlobs(bucket);
    }

    this.setState({ isShownDeleteBlob: false, id: null });
  }

  async _updateBlob(name) {
    let uuid, token;
    const { bucket, id } = this.state;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }
    const data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${bucket}/blobs/${id}`,
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
      const res = await data.json();
      this._err(res.err.fields);
    } else {
      toaster.notify("Your blob was updated");
      const blobs = await this._fetchBlobs(bucket);
    }

    this.setState({ isShownEditBlob: false, id: null });
  }

  async _downloadBlob(id) {
    let uuid, token;
    const { bucket } = this.state;
    const meta = JSON.parse(localStorage.getItem("myS3.app"));
    if (meta) {
      const decoded = jwt.decode(meta);
      uuid = decoded.uuid;
      token = meta;
    }

    let data = await fetch(
      `http://localhost:5000/api/users/${uuid}/buckets/${bucket}/blobs/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    data = await data.blob();
    const url = URL.createObjectURL(data);

    this.download("myFile", url);
  }

  download(filename, image) {
    var element = document.createElement("a");
    element.setAttribute("href", image);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  _renderBlobs(id) {
    const { blobs } = this.state;
    return (
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Blob name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.TextCell>
              <TextInput
                width={150}
                name="text-input-blob-name"
                placeholder="Name"
                onChange={e => {
                  this._update("blob", e.target.value);
                }}
              />
            </Table.TextCell>

            <Table.TextCell>
              <input type="file" onChange={this._handleselectedFile} />
            </Table.TextCell>
            <Table.TextCell>
              <Icon
                icon="add"
                color="green"
                size={20}
                onClick={() => {
                  this._uploadBlob();
                }}
              />
            </Table.TextCell>
          </Table.Row>
          {blobs.map(blob => {
            const { name, id } = blob;
            return (
              <Table.Row key={id}>
                <Table.TextCell style={{ textAlign: "left" }}>
                  {" "}
                  <Icon
                    icon="folder-close"
                    color="grey"
                    size={20}
                    style={{ textAlign: "left", marginRight: 10 }}
                  />{" "}
                  {name}
                </Table.TextCell>
                <Table.TextCell />
                <Table.TextCell>
                  <Icon
                    icon="download"
                    size={20}
                    onClick={() => {
                      this._downloadBlob(id);
                    }}
                  />
                </Table.TextCell>
                <Table.TextCell>
                  <Icon
                    icon="edit"
                    color="blue"
                    size={20}
                    onClick={() => {
                      this.setState({ isShownEditBlob: true, id });
                    }}
                  />
                </Table.TextCell>
                <Table.TextCell>
                  <Icon
                    icon="delete"
                    color="red"
                    size={20}
                    onClick={() => {
                      this.setState({ isShownDeleteBlob: true, id });
                    }}
                  />
                </Table.TextCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }

  _handleselectedFile = event => {
    this.setState({
      myFile: event.target.files[0]
    });
  };

  _renderTable() {
    const { buckets, bucket, blobs, blob, bucket_name } = this.state;
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
        <Dialog
          isShown={this.state.isShownDeleteBlob}
          title="Delete your blob"
          intent="danger"
          onCloseComplete={() => this.setState({ isShownDeleteBlob: false })}
          confirmLabel="Confirm"
          onConfirm={() => {
            this._deleteBlob();
          }}
        >
          Are you sure you want to delete this blob ?
        </Dialog>
        <Dialog
          isShown={this.state.isShownEditBlob}
          title="Edit your blob"
          onCloseComplete={() => this.setState({ isShownEditBlob: false })}
          confirmLabel="Confirm"
          onConfirm={() => {
            this._updateBlob(blob);
          }}
        >
          <TextInput
            width={300}
            name="text-input-blob-name"
            placeholder="Name"
            onChange={e => {
              this._update("blob", e.target.value);
            }}
          />
        </Dialog>
        <SideSheet
          isShown={this.state.isShownBlobs}
          onCloseComplete={() => this.setState({ isShownBlobs: false })}
        >
          <h1 style={{ margin: 40 }}>Bucket {bucket_name}</h1>

          {blobs ? this._renderBlobs() : null}
        </SideSheet>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Bucket name</Table.TextHeaderCell>
            <Table.TextHeaderCell>Actions</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.TextCell style={{ textAlign: "left" }}>
                <TextInput
                  style={{ textAlign: "center" }}
                  name="text-input-nickname"
                  placeholder="Choose a name"
                  onChange={e => {
                    this._update("bucket", e.target.value);
                  }}
                />
              </Table.TextCell>
              <Table.TextCell>
                <Icon
                  icon="add"
                  color="green"
                  size={20}
                  onClick={() => this._addBucket(bucket)}
                />
              </Table.TextCell>
            </Table.Row>
            {buckets.map(bucket => {
              const { name, id } = bucket;
              return (
                <Table.Row key={id}>
                  <Table.TextCell
                    size={200}
                    isSelectable
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      this.setState({
                        isShownBlobs: true,
                        bucket: id,
                        bucket_name: name
                      });
                      this._fetchBlobs(id);
                    }}
                  >
                    <Icon
                      icon="folder-close"
                      color="grey"
                      size={20}
                      style={{ textAlign: "left", marginRight: 10 }}
                    />{" "}
                    {name}
                  </Table.TextCell>
                  <Table.TextCell />
                  <Table.TextCell>
                    <Icon
                      icon="edit"
                      color="blue"
                      size={20}
                      onClick={() => {
                        this.setState({ isShownEdit: true, id });
                      }}
                    />
                  </Table.TextCell>
                  <Table.TextCell>
                    <Icon
                      icon="delete"
                      color="red"
                      size={20}
                      onClick={() => {
                        this.setState({ isShownDelete: true, id });
                      }}
                    />
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
        <Card style={{ width: 700 }}>
          {buckets ? this._renderTable() : null}
        </Card>
      );
    }
  }
}
