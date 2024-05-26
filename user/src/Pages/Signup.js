import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './Signin.css'; 
import Footer from '../Components/Footer';

function Signup() {
    const [admissionId, setAdmissionId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/';

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL + 'api/users/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    admissionId,
                    password,
                    isAdmin: false,
                    activeTransactions: []
                })
            });
            const data = await response.json(); // Parse response body as JSON
            console.log(data); // Log the response data for debugging
            if (response.ok) {
                // If signup is successful, navigate to the signin page
                history.push('/signin');
            } else {
                throw new Error('Signup failed');
            }
        } catch (err) {
            console.error(err);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <div className="signin-container">
                <div className="signin-card">
                    <form onSubmit={handleForm}>
                        <h2 className="signin-title">Sign Up</h2>
                        <p className="line"></p>
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                        <div className="signin-fields">
                            <label htmlFor="admissionId">
                                <b>Admission ID</b>
                            </label>
                            <input
                                className="signin-textbox"
                                type="text"
                                placeholder="Enter Admission ID"
                                id="admissionId"
                                name="admissionId"
                                required
                                value={admissionId}
                                onChange={(e) => setAdmissionId(e.target.value)}
                            />
                            <label htmlFor="password">
                                <b>Password</b>
                            </label>
                            <input
                                className="signin-textbox"
                                type="password"
                                minLength="6"
                                placeholder="Enter Password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="signin-button">Sign Up</button>
                    </form>
                    <div className="signup-option">
                        {/* Link to the Signin component */}
                        <p className="signup-question">
                            Already have an account? <Link to="/signin">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* Assuming Footer component is imported and used here */}
             {/* <Footer />  */}
        </div>
    );
}

export default Signup;
