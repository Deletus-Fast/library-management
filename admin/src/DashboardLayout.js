import React from 'react';
import SidebarMenu from './SideBarMenu';
import TopNavigation from './TopNavigation';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Header from './Header';

const DashboardLayout = ({ loggedInUser }) => {
    if (!loggedInUser) {
        loggedInUser = 'Admin';
    }
  return (
    <div className="container body">
      <div className="main_container">
        <div className="col-md-3 left_col">
          <div className="left_col scroll-view">
          <SidebarMenu loggedInUser={loggedInUser} />
          </div>
        </div>
        <Header loggedInUser={loggedInUser} />
        <div className="right_col" role="main">
          <Dashboard />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
