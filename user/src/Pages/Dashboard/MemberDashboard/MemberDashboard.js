import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
// import axios from "axios";
// import moment from "moment";
import IssuedBooksTable from "../../../Components/IssuedBooksTable"; // Import IssuedBooksTable component

import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

function MemberDashboard({ user }) {
  // const [user, setUser] = useState(user.admissionId);
  // const [memberDetails, setMemberDetails] = useState(null);
  // const {user1 } = useContext(AuthContext);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const history = useHistory();
  // if (!user) {
  //   window.location.href = "/signin";
  // }

  // const user = "User"

  // if (user.admissionId === undefined) {
  //   user.admissionId = "User";
  // }

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // const getMemberDetails = async () => {
    //   try {
    //     const response = await axios.get(
    //       API_URL + "api/users/getuser/" + user._id
    //     );
    //     setMemberDetails(response.data);
    //     console.log(response.data);
    //   } catch (err) {
    //     console.log("Error in fetching the member details");
    //   }

    // };

    // getMemberDetails();
    if (user !== undefined) {
      fetchIssuedBooks();
      fetchBooks();
      console.log(user);
      console.log(issuedBooks);
      console.log(books);
    }
  }, [books, issuedBooks]);

  // const buttonPress = () => {
  //   setUser(user1);
  // };

  const fetchIssuedBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/transactions/all-transactions"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      const currentDate = new Date();
      const issuedBooks = data.filter(
        (transaction) =>
          transaction.transactionStatus === "Active" &&
          transaction.borrowerId === user?.admissionId
      );
      setIssuedBooks(issuedBooks);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/books/allbooks");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const update = () => {
    //   if(user1.admissionId !== undefined){
    //   // setUser(user1.admissionId);
    // }
  };

  // const start = () => {
  //   setUser(user1)
  // }
  const logout = () => {
    localStorage.removeItem("user");
    history.push("/");
    window.location.reload();
  };
  return (
    <div className="dashboard">
      {/* {user === "user" ? (
        // <button onClick={buttonPress}>Load Profile</button>,
        // update()
      ) : (
        <> */}
      <p className="user-welcome">Welcome {user?.admissionId}!</p>
      {/* Uncomment the following section if needed */}
      {/* <div className="member-profile-content" id="profile@member">
      <div className="user-info">
        <p className="user-name">{memberDetails?.userFullName}</p>
        <p className="user-id">
          {user?.userType === "Student"
            ? user?.admissionId
            : memberDetails?.employeeId}
        </p>
        <p className="user-email">{memberDetails?.email}</p>
        <p className="user-phone">{memberDetails?.mobileNumber}</p>
      </div>
    </div> */}
    <div className="member-dashboard-content">
      <IssuedBooksTable issuedBooks={issuedBooks} books={books} />{" "}
    </div>
      {/* Render IssuedBooksTable */}
      {/* </> */}
      {/* )} */}
    </div>
  );
}

export default MemberDashboard;
