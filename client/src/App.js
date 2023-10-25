// Dashboard.js
import React, { useState } from 'react';
import SideNav from './SideNav';
import MainContent from './MainContent';
import './App.css'
function App() {
  const [selectedTab, setSelectedTab] = useState('dashboard'); // Default to 'dashboard'

  return (
      <div className="container">
          <div className="header">
              Interactive Dashboard
          </div>
          <div className="content-wrapper">
              <SideNav onTabSelect={setSelectedTab} />
              <MainContent selectedTab={selectedTab} />
          </div>
      </div>
  );
}

export default App;
