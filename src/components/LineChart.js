import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import '../css/LineChart.css';

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      arrCountry: null,
    };
  }

  componentDidMount() {
    // PUSH DATA ARRAY
    axios.get('https://api.covid19api.com/summary').then((doc) => {
      let listCountry = [];
      doc.data.Countries.forEach((name) => {
        listCountry.push(name.Country);
      });

      listCountry.sort();

      this.setState({
        arrCountry: listCountry,
      });
    });

    // Get Data Covid per Country
    axios
      .get('https://api.covid19api.com/total/dayone/country/Afghanistan')
      .then((doc) => {
        if (doc.data.length > 0) {
          this.setState({
            data: doc.data,
          });
        } else {
          this.setState({
            data: null,
          });
        }
      })
      .catch((err) => {
        return;
      });
  }

  handleUpdateData = () => {
    let selectCountrys = document.querySelector('select').value;
    this.setState(
      {
        countryName: selectCountrys,
      },
      () => {
        axios
          .get('https://api.covid19api.com/total/dayone/country/' + this.state.countryName)
          .then((doc) => {
            if (doc.data.length > 0) {
              this.setState({
                data: doc.data,
              });
            } else {
              this.setState({
                data: null,
              });
            }
          })
          .catch((err) => {
            return;
          });
      }
    );
  };

  render() {
    let option = [];
    if (this.state.arrCountry) {
      const dataNameCountry = this.state.arrCountry;
      dataNameCountry.forEach((list, index) => {
        option.push(
          <option value={list} key={index}>
            {list}
          </option>
        );
      });
    }

    const CustomTooltip = ({ payload }) => {
      let tgl = null;
      let positiveCovid = 0;
      let recoveredCovid = 0;
      let deathCovid = 0;
      if (payload.length > 0) {
        tgl = moment(payload[0].payload.Date).subtract(1, '10').format('DD MMM YYYY');
        positiveCovid = payload[0].value;
        recoveredCovid = payload[1].value;
        deathCovid = payload[2].value;
      } else {
        return false;
      }

      return (
        <div className="tooltip-board">
          <p>{tgl}</p>
          <p className="positive-case">{`Positive: ${positiveCovid}`}</p>
          <p className="recovered-case">{`Recovered: ${recoveredCovid}`}</p>
          <p className="death-case">{`Deaths: ${deathCovid}`}</p>
        </div>
      );
    };

    return (
      <div className="line-chart">
        <div className="board-lineChart">
          <div className="line-chart-st">
            <h2>CHART DATA COVID-19</h2>
            <select name="list" id="selectCountry" onChange={() => this.handleUpdateData()}>
              {option}
            </select>
          </div>
          {this.state.data ? (
            <div className="line-chart-sb">
              <ResponsiveContainer>
                <AreaChart
                  data={this.state.data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis
                    stroke="white"
                    dataKey={(key) => {
                      let dateTime = moment(key.Date).subtract(1, 10).format('DD MMM');
                      return dateTime;
                    }}
                  />
                  <YAxis stroke="white" dataKey="Confirmed" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="Confirmed" stroke="rgb(40, 160, 230)" fill="rgba(40, 160, 230, 0.3)" />
                  <Area type="monotone" dataKey="Recovered" stroke="rgb(23, 136, 70)" fill="rgba(30, 206, 104, 0.3)" />
                  <Area type="monotone" dataKey="Deaths" stroke="rgb(255, 37, 37)" fill="rgba(255, 56, 56, 0.3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            'DATA UNDEFINED'
          )}
        </div>
      </div>
    );
  }
}
