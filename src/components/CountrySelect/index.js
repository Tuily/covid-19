import React, { Component } from "react";

import { Select } from "antd";

import api from "../../services/api";

import "antd/dist/antd.css";
import "./styles.css";

const { Option } = Select;

export default class CountrySelect extends Component {
  state = {
    countries: []
  };

  componentDidMount() {
    this.loadCountryList();
  }

  loadCountryList = async () => {
    const response = await api.get("/countries");
    let countries = response.data.response;
    this.setState({ countries });
  };

  onChange = selected => {
    this.countrySelect.blur();
    this.props.onChange(selected);
  };

  render() {
    const countries = this.state.countries;

    return (
      <div id="country-select">
        <Select
          mode="multiple"
          size="large"
          placeholder="Search a country"
          ref={select => (this.countrySelect = select)}
          onChange={this.onChange}
          style={{ width: "100%" }}
          showSearch
        >
          {countries.map(country => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>
        <small>Ordered by total cases</small>
      </div>
    );
  }
}
