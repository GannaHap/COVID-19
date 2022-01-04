import React from 'react';

// import Navbar from '../components/Navbar.js';

import '../css/view/Dashboard.css';
import StatsCard from '../components/StatsCard';
import LineChart from '../components/LineChart';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="content">
        <div className="bg-jumbotron"></div>
        {/* <Navbar /> */}
        <StatsCard />
        <LineChart />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
