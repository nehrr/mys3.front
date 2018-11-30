import React, { Component } from "react";
import { Table } from "evergreen-ui";
import Bucket from "../components/Bucket";

export default class Dashboard extends Component {
  buckets = this.props.buckets;
  //arbo
  render() {
    return (
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Bucket name</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {this.buckets.map(bucket => {
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
}
