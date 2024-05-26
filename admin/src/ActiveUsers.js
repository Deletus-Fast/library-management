import React, { useState, useEffect } from 'react';
import SideBarMenu from './SideBarMenu';
import Header from './Header';
import './AllUsers.css';

const ActiveUsers = ({ loggedInUser }) => {
    if (!loggedInUser) {
        loggedInUser = 'Admin';
    }
    // Mock user data
    const [users, setUsers] = useState([
        // { id: 1, name: 'John Doe', active: true, issuedBooks: 3 },
        // { id: 2, name: 'Jane Smith', active: false, issuedBooks: 0 },
        // { id: 3, name: 'Alice Johnson', active: true, issuedBooks: 1 },
        // Add more user data as needed
    ]);
    const [issuedBooks, setIssuedBooks] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchIssuedBooks()
    }, []);

    const fetchUserData = async () => {
        fetch("http://localhost:3001/api/users/allusers")
            .then((response) => response.json())
            .then((data) => setUsers(data.users))
            .catch((error) => console.error("Error fetching users:", error));
    };

    const fetchIssuedBooks = async () => {
        fetch("http://localhost:3001/api/transactions/all-transactions")
            .then((response) => response.json())
            .then((data) => {
                // const currentDate = new Date();
                const OverdueBooks = data.filter(transaction => transaction.transactionStatus === "Active");
                setIssuedBooks(OverdueBooks);
            })
            .catch((error) => console.error("Error fetching transactions:", error));

    }
    // const handleAction = (userId) => {
    //     setUsers(users.map(user =>
    //         user.id === userId ? { ...user, active: !user.active } : user
    //     ));
    // };

    // Function to generate user report
    const handleReport = (userId) => {
        // Implement report generation logic here
        console.log(`Generate report for User ${userId}`);
    };

    return (
        <div className="all-users-container">
            <SideBarMenu />
            <Header loggedInUser={loggedInUser} />
            <div className="main-content_Users">
                <h2 className="page-title">All Users</h2>
                <div className="user-list">
                    {users.map((user) => (issuedBooks.filter(transaction => transaction.borrowerId === user.admissionId))?.length > 0 && (
                        <div className="user-card" key={user.id}>
                            <div className="user-info">
                                <div className="user-name">{user.admissionId}</div>
                                <div className="user-issued-books">Issued Books: {(issuedBooks.filter(transaction => transaction.borrowerId === user.admissionId)).length}</div>
                            </div>
                            <div className="user-actions">
                                {/* <button
                  className={`action-button ${user.active ? 'block-button' : 'activate-button'}`}
                  onClick={() => handleAction(user.id)}
                >
                  {user.active ? 'Block' : 'Activate'}
                </button> */}
                                <button className="action-button report-button" onClick={() => handleReport(user.id)}>
                                    Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActiveUsers;
