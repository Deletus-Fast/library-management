import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function Header({ user }) {
    const [menuToggle, setMenuToggle] = useState(false);
    const [admissionIdDropdown, setAdmissionIdDropdown] = useState(false); // Define admissionIdDropdown state
    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const toggleMenu = () => {
        setMenuToggle(!menuToggle);
    };

    const closeMenu = () => {
        setMenuToggle(false);
    };

    const handleLogout = () => {
        // Remove user data from local storage
        localStorage.removeItem("user");
        
        // Dispatch the logout action to your reducer
        dispatch({ type: 'LOGOUT' });
        
        // Optionally redirect to the login page
        history.push('/login');
    };

    const toggleAdmissionIdDropdown = () => {
        setAdmissionIdDropdown(!admissionIdDropdown);
    };

    return (
        <div className="header">
            <div className="logo-nav">
                <Link to='/'>
                    <a href="#home">IT LIBRARY</a>
                </Link>
            </div>
            <div className='nav-right'>
                <ul className={menuToggle ? "nav-options active" : "nav-options"}>
                    <li className="option" onClick={toggleMenu}>
                        <Link to='/'>
                            <a href="#home">Home</a>
                        </Link>
                    </li>
                    <li className="option" onClick={toggleMenu}>
                        <Link to='/books'>
                            <a href="#books">Books</a>
                        </Link>
                    </li>
                    {!user ? (
                        <li className="option" onClick={toggleMenu}>
                            <Link to='/signin'>
                                <a href='signin'>Sign In</a>
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className="option" onClick={toggleMenu}>
                                <Link to='/search/AI'>
                                    <a href='search/AI'>Search AI</a>
                                </Link>
                            </li>
                            {/* <li className="option" onClick={toggleMenu}>
                                <Link to='/chatbot'>
                                    <a href='chatbot'>Chatbot</a>
                                </Link>
                            </li> */}
                            <li className="option" onClick={toggleAdmissionIdDropdown}>
                                <a href='javascript:void(0)'>{user.admissionId}</a>
                                {admissionIdDropdown ? <ExpandLess /> : <ExpandMore />}
                                {admissionIdDropdown && (
                                    <div className="dropdown-content">
                                        {/* Dropdown content */}
                                        <a href="/dashboard@member">Profile</a>
                                        <a href="/" onClick={handleLogout}>Logout</a>
                                    </div>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="mobile-menu" onClick={toggleMenu}>
                {menuToggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    );
}
export default Header;
