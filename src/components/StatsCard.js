import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';
import numeral from 'numeral';

import Logo from '../assets/logo.png';
import '../css/StatsCard.css';

export default class StatsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      timeUpdated: null,
    };
  }

  componentDidMount() {
    axios.get('https://api.covid19api.com/summary').then((doc) => {
      let dateTime = moment(doc.data.Date).subtract(1, 10).format('LLL');
      this.setState({
        data: doc.data,
        timeUpdated: dateTime,
      });
    });
  }

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
                <span>{this.state.data && numeral(this.state.data.Global.TotalConfirmed).format('0,0')}</span>
              </div>
              <div className="icon">
                <i className="fal fa-heart-rate"></i>
              </div>
            </div>
            <div className="section-bottom finance-down">
              <i className="far fa-arrow-up"></i>
              <span className="percent">{this.state.data && numeral(this.state.data.Global.NewConfirmed).format('0,0')}</span>
              <span className="text">Today</span>
            </div>
          </div>
          {/* Recovered */}
          <div className="card">
            <div className="section-top">
              <div className="top-text">
                <h2>RECOVERED</h2>
                <span>{this.state.data && numeral(this.state.data.Global.TotalRecovered).format('0,0')}</span>
              </div>
              <div className="icon">
                <i className="fas fa-first-aid"></i>
              </div>
            </div>
            <div className="section-bottom finance-down">
              <i className="far fa-arrow-up"></i>
              <span className="percent">{this.state.data && numeral(this.state.data.Global.NewRecovered).format('0,0')}</span>
              <span className="text">Today</span>
            </div>
          </div>
          {/* Deaths */}
          <div className="card">
            <div className="section-top">
              <div className="top-text">
                <h2>DEATHS</h2>
                <span>{this.state.data && numeral(this.state.data.Global.TotalDeaths).format('0,0')}</span>
              </div>
              <div className="icon">
                <i className="fas fa-tombstone-alt"></i>
              </div>
            </div>
            <div className="section-bottom finance-down">
              <i className="far fa-arrow-up"></i>
              <span className="percent">{this.state.data && numeral(this.state.data.Global.NewDeaths).format('0,0')}</span>
              <span className="text">Today</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
