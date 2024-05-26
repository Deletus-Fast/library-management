import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarMenu.css';
import { ExpandLess, ExpandMore, Dashboard, People, LibraryBooks } from '@mui/icons-material';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { blue, grey } from '@mui/material/colors';
import logo from './logo1.png'

const logoutButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[50]),
  backgroundColor: blue[50],
  '&:hover': {
    backgroundColor: grey[300],
  },
}));


const SidebarMenu = ({ loggedInUser }) => {
    if (!loggedInUser) {
        loggedInUser = 'Admin';
    }
  // State to manage open/close state of each submenu
  const [menuOpen, setMenuOpen] = useState({
    dashboard: false,
    users: false,
    books: false,
  });

  // Function to toggle submenu open/close state
  const toggleSubMenu = (menu) => {
    setMenuOpen((prevMenuOpen) => ({
      ...prevMenuOpen,
      [menu]: !prevMenuOpen[menu],
    }));
  };

  // Function to close all submenus except the selected one
  const closeOtherSubMenus = (selectedMenu) => {
    setMenuOpen((prevMenuOpen) => ({
      ...Object.keys(prevMenuOpen).reduce((acc, menu) => {
        acc[menu] = menu === selectedMenu ? prevMenuOpen[menu] : false;
        return acc;
      }, {}),
    }));
  };

  return (
    <div className="sidebar-flex">
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
      <div className="menu_section">
        {/* <h3 className="lms-admin-title">LMS Admin</h3> */}
        <img src={logo} alt="logo" className="logo" />
        <div className="welcome-text">Welcome, {loggedInUser}</div>
        <ul className="nav side-menu">
          <li className='menu-option'>
          <Link to="/"><span>
              <Dashboard />
              &nbsp;&nbsp;&nbsp;Dashboard
            </span></Link>
          </li>
          
          {/* <li className={`menu-option ${menuOpen.users ? 'selected' : ''}`} onClick={() => {toggleSubMenu('users'); closeOtherSubMenus('users');}}>
            <span>
              <People />
              &nbsp;&nbsp;&nbsp;Manage Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {menuOpen.users ? <ExpandLess /> : <ExpandMore />}
            </span>
            <ul className={`nav child_menu ${menuOpen.users ? 'open' : ''}`}>
              <li><Link to="/users/all">All Users</Link></li>
              <li><Link to="/users/active">Active Users</Link></li>
              <li><Link to="/users/Inactive">Inactive Users</Link></li>
            </ul>
          </li> */}
          {/* <li className={`menu-option ${menuOpen.books ? 'selected' : ''}`} onClick={() => {toggleSubMenu('books'); closeOtherSubMenus('books');}}> */}
          <li className={`menu-option ${menuOpen.books ? 'selected' : ''}`}>
          <Link to="/books"><span>
              <LibraryBooks /> 
              <li>&nbsp;&nbsp;&nbsp;Books&nbsp;&nbsp;</li>
              {/* {menuOpen.books ? <ExpandLess /> : <ExpandMore />} */}
            </span></Link>
            {/* <ul className={`nav child_menu ${menuOpen.books ? 'open' : ''}`}>
              <li><Link to="/books/add">Add Books</Link></li>
              <li><Link to="/books/all">All Books</Link></li>
              {/* <li><Link to="/books/issued">Issued Books</Link></li> */}
              {/* <li><Link to="/books/issue">Issue Book</Link></li>
              <li><Link to="/books/return">Return Book</Link></li> */}
            {/* </ul> */} 
          </li>
        </ul>
    </div>
    <div className="sidebar-footer">
      <Button variant="contained" color="error" href="/logout"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      </div>
  );
};

export default SidebarMenu;
