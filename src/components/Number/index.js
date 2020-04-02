import React, { Component } from "react";
import NumberFormat from "react-number-format";

export default class Number extends Component {
  render() {
    return (
      <NumberFormat
        value={this.props.value}
        displayType={"text"}
        thousandSeparator={true}
      />
    );
  }
}
