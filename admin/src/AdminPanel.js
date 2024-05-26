import React from 'react';
import Header from './Header';
import DashboardLayout from './DashboardLayout';
import './AdminPanel.css';

const AdminPanel = ({ loggedInUser }) => {
    if (!loggedInUser) {
        loggedInUser = 'Admin';
    }
  return (
    <DashboardLayout loggedInUser={loggedInUser}>
      {/* <Header loggedInUser={loggedInUser} /> */}
      <div className="admin-welcome-container">
        <h2 className="welcome-text1">Welcome to Admin Panel</h2>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
