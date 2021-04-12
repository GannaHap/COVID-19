import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';

import Logo from '../assets/logo.png';
import '../css/StatsCard.css';

export default class StatsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      timeUpdated: null,
      totalPostive: null,
      totalRecovered: null,
      totalDeaths: null,
      newPositive: null,
      newRecovered: null,
      newDeaths: null,
    };
  }

  componentDidMount() {
    axios.get('https://api.covid19api.com/summary').then((doc) => {
      let dateTime = moment(doc.data.Date).subtract(1, 10).format('LLL');
      let totalConfirmed = this.handleFormatNumber(doc.data.Global.TotalConfirmed);
      let totalRecovered = this.handleFormatNumber(doc.data.Global.TotalRecovered);
      let totalDeaths = this.handleFormatNumber(doc.data.Global.TotalDeaths);
      let newPositive = this.handleFormatNumber(doc.data.Global.NewConfirmed);
      let newRecovered = this.handleFormatNumber(doc.data.Global.NewRecovered);
      let newDeaths = this.handleFormatNumber(doc.data.Global.NewDeaths);
      this.setState({
        data: doc.data,
        timeUpdated: dateTime,
        totalPostive: totalConfirmed,
        totalRecovered: totalRecovered,
        totalDeaths: totalDeaths,
        newPositive: newPositive,
        newRecovered: newRecovered,
        newDeaths: newDeaths,
      });
    });
  }

  handleFormatNumber = (number) => {
    if (number) {
      let formatNumber = '';
      let numberrev = number.toString().split('').reverse().join('');
      for (let i = 0; i < numberrev.length; i++) {
        if (i % 3 === 0) {
          formatNumber += numberrev.substr(i, 3) + ' ';
        }
      }
      formatNumber = formatNumber
        .split('', formatNumber.length - 1)
        .reverse()
        .join('');
      return formatNumber;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="stats-card">
        <div className="title-stats-card">
          <div className="logo">
            <img src={Logo} alt="Logo"></img>
          </div>
          <div>
            <h2>Global Data</h2>
            <span>Last Updated : {this.state.timeUpdated ? this.state.timeUpdated : '-'}</span>
          </div>
        </div>
        <div className="board-stats-card">
          {/* Positive */}
          <div className="card">
            <div className="section-top">
              <div className="top-text">
                <h2>POSITIVE</h2>
                <span>{this.state.totalPostive && this.state.totalPostive}</span>
              </div>
              <div className="icon">
                <i className="fal fa-heart-rate"></i>
              </div>
            </div>
            <div className="section-bottom finance-down">
              <i className="far fa-arrow-up"></i>
              <span className="percent">{this.state.newPositive && this.state.newPositive}</span>
              <span className="text">Today</span>
            </div>
          </div>
          {/* Recovered */}
          <div className="card">
            <div className="section-top">
              <div className="top-text">
                <h2>RECOVERED</h2>
                <span>{this.state.totalRecovered && this.state.totalRecovered}</span>
              </div>
              <div className="icon">
                <i className="fas fa-first-aid"></i>
              </div>
            </div>
            <div className="section-bottom finance-down">
              <i className="far fa-arrow-up"></i>
              <span className="percent">{this.state.newRecovered && this.state.newRecovered}</span>
              <span className="text">Today</span>
            </div>
          </div>
          {/* Deaths */}
          <div className="card">
            <div className="section-top">
              <div className="top-text">
                <h2>DEATHS</h2>
                <span>{this.state.totalDeaths && this.state.totalDeaths}</span>
              </div>
              <div className="icon">
                <i className="fas fa-tombstone-alt"></i>
              </div>
            </div>
            <div className="section-bottom finance-down">
              <i className="far fa-arrow-up"></i>
              <span className="percent">{this.state.newDeaths && this.state.newDeaths}</span>
              <span className="text">Today</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
