import React, { Component } from "react";

import { Row, Col, Card } from "antd";

import api from "../../services/api";
import "antd/dist/antd.css";

import CountrySelect from "../../components/CountrySelect";
import Number from "../../components/Number";

import "./styles.css";

export default class Main extends Component {
  state = {
    statistics: [],
    filtered_statistics: [],
    filter: "",
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const response = await api.get("/statistics");
    const statistics = response.data.response;
    const ordered_statistics = this.orderData(statistics);

    this.setState({ statistics: ordered_statistics });
    setTimeout(this.fadeIn, 1);
  };

  fadeIn = () => this.setState({ loading: false });

  selectCountry = filter => {
    this.setState({ filter });
    this.filterData(filter);
  };

  clearFilter = () => {
    this.setState({ filtered_statistics: [] });
  };

  orderData = statistics =>
    statistics.sort((a, b) => b.cases.total - a.cases.total);

  filterData = filterArray => {
    const filtered_statistics = this.state.statistics.filter(stat => {
      if (filterArray.indexOf(stat.country) !== -1) {
        return stat;
      }
      return false;
    });

    this.setState({ filtered_statistics: this.orderData(filtered_statistics) });
  };

  render() {
    let { statistics, filtered_statistics } = this.state;

    let stats = statistics;
    if (filtered_statistics.length > 0) {
      stats = filtered_statistics;
    }

    return (
      <div>
        <div id="overlay" className={this.state.loading ? "show" : ""}></div>
        <CountrySelect onChange={this.selectCountry} />
        <div className="country-list">
          <Row gutter={[24, 24]} justify="center">
            {stats.map((stat, index) => (
              <Col
                className="gutter-row"
                xs={24}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                key={stat.country}
              >
                <Card
                  className={this.state.loading ? "hidden" : ""}
                  style={{ transitionDelay: index * 50 + "ms" }}
                  bordered={false}
                >
                  <strong>{stat.country}</strong>
                  <hr></hr>
                  <p>
                    <small>{stat.day}</small>
                  </p>
                  <div className="inner-container">
                    <p className="subtitle">Cases</p>

                    <div className="info">
                      <div className="bullet new"></div>
                      <p>
                        New: +<Number value={stat.cases.new} />
                      </p>
                    </div>

                    <div className="info">
                      <div className="bullet active"></div>
                      <p>
                        Active: <Number value={stat.cases.active} />
                      </p>
                    </div>

                    <div className="info">
                      <div className="bullet recovered"></div>
                      <p>
                        Recovered: <Number value={stat.cases.recovered} />
                      </p>
                    </div>
                  </div>

                  <div className="statistics-total">
                    <p className="total">
                      Total cases:{" "}
                      <span className="value">
                        <Number value={stat.cases.total} />
                      </span>
                    </p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
