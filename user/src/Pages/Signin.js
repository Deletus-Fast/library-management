import React, { useEffect, useContext, useState } from 'react';
import './Signin.css';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.js';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import Footer from '../Components/Footer';

function Signin() {
    const [admissionId, setAdmissionId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { dispatch } = useContext(AuthContext);
    const history = useHistory(); // Access useHistory hook

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Function to fetch active book transactions
        const fetchBookTransactions = async () => {
            try {
                const res = await axios.get(API_URL + `api/book-transactions/${admissionId}`);
                if (res.data.length > 0) {
                    // Extract book names and due dates from transactions
                    const books = res.data.map(transaction => ({
                        bookName: transaction.bookName,
                        dueDate: transaction.dueDate
                    }));
                    // Display a notification with book names and due dates
                    showNotification(`You have the following books issued:\n${books.map(book => `${book.bookName} (Due Date: ${book.dueDate})`).join('\n')}`);
                }
            } catch (err) {
                console.error('Error fetching book transactions:', err);
            }
        };

        if (admissionId) {
            fetchBookTransactions();
        }
    }, [admissionId, API_URL]); // Fetch transactions whenever admissionId changes

    const showNotification = (message, type) => {
        // Use your preferred notification method here
        alert(message);
    };

   const loginCall = async (userCredential, dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    try {
        const res = await axios.post(API_URL + 'api/auth/signin', userCredential);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        // Redirect user to HomeAfterLogin page after successful login
        history.push('/');
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
        setError('Wrong Password Or Admission ID');
    }
};



    const handleForm = async (e) => {
        e.preventDefault();
        // Validate form inputs
        if (!admissionId || !password) {
            setError('Please provide Admission ID and Password');
            return;
        }
        // Call login function
        await loginCall({ admissionId, password }, dispatch);
    };

    return (
        <div>
            <div className="signin-container">
                <div className="signin-card">
                    <form onSubmit={handleForm}>
                        <h2 className="signin-title"> Log in</h2>
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
                                name="psw"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="signin-button" type="submit">Log In</button>
                        <a className="forget-pass" href="#home">
                            Forgot password?
                        </a>
                    </form>
                    <div className="signup-option">
                        <p className="signup-question">
                            Don't have an account? <Link to="/signup">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Signin;