import './Header.css';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

// import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { AuthContext } from "./Context/AuthContext";

const Header = ({ loggedInUser }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("user");
    // history.push("/"); // Navigate to Home.js after logout
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={`admin-header ${isDropdownOpen ? 'dropdown-open' : ''}`}>
      <div className="admin-header-title">IT Library</div>
      <div className="admin-header-profile">
        {/* <button className="profile-button" onClick={toggleDropdown}> */}
          {/* {loggedInUser} */}
          {/* {isDropdownOpen && ( */}
            {/* // <div className="dropdown-content"> */}
              {/* <a href="#">Settings</a> */}
              {/* <a onClick={logout}>Logout</a> */}
            {/* </div> */}

            
          {/* // )} */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default Header;
