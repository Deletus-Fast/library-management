import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import AllUsers from './AllUsers';
import ActiveUsers from './ActiveUsers';
import BlockedUsers from './BlockedUsers';
import AddBooks from './AddBooks';
import Login from './Login';
import AllBooks from './AllBooks';
import IssueBook from './IssueBook';
import IssuedBooks from './IssuedBooks';
import ReturnBook from './ReturnBook';
import { AuthContext } from '../src/Context/AuthContext';
// import ApexCharts from './components/ApexChart';
import ReactApexChart from 'react-apexcharts';

// const 

function App() {
  const [adminName, setAdminName] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(!!adminName);

  const handleAdminLogin = (adminName) => {
    setAdminName(adminName);
    console.log(adminName);
    setIsAdminAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {isAdminAuthenticated ? (
          <>
            <Route path="/" element={<AdminPanel loggedInUser={adminName} />} />
            {/* <Route path="/books/add" element={<AddBooks loggedInUser={adminName} />} />
            <Route path="/books/all" element={<AllBooks loggedInUser={adminName} />} />
            <Route path="/books/issue" element={<IssueBook loggedInUser={adminName} />} />
            <Route path="/books/return" element={<ReturnBook loggedInUser={adminName} />} />
            <Route path="/books/Issued" element={<IssuedBooks loggedInUser={adminName} />} /> */}
            <Route path="/books" element={<AllBooks loggedInUser={adminName} />} />
          </>
        ) : (
          <Route path="/" element={<Login onLogin={handleAdminLogin} />} />
        )}
      </Routes>
      {!isAdminAuthenticated && <Navigate to="/" />}
    </Router>
  );
}

export default App;
