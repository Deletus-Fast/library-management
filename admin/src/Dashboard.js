import React, { useState, useEffect } from "react";
import "./Dashboard.css";
// import ApexChart from './components/ApexChart'
import BookStatsComponent from "./components/BooksStats";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReRadialBarChart from "./components/RadialGraph";
// import Grid from "@mui/material/Unstable_Grid2";
import StatBox from "./components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import Grid from "@mui/material/Grid";
import UsersTable from "./components/usersTable";
import {
  ExpandLess,
  ExpandMore,
  People,
  LibraryBooks,
} from "@mui/icons-material";

// import { LibraryBooks } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddBooksButton from "./components/AddBooksButton"
import IssueBooksButton from "./components/IssueBooksButton"
import ReturnBookButton from "./components/ReturnBookButton"
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
></link>;

const Dashboard = () => {
  // De+45we9ll.fine state variables to store statistics
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [bookIssuers, setBookIssuers] = useState([]);

  // Fetch data from the backend or state management system
  useEffect(() => {
    // Example: Fetch user statistics
    fetchUserData();

    // Example: Fetch book statistics
    fetchBookData();

    fetchIssuedBooks();

    handleDropdownChange("all");

    getOverdueBooks();
    
    getbookIssuers();

    setLoading(false);
  }, []);

  useEffect(() => {
    getbookIssuers();
  }
  , [bookIssuers]);

  useEffect(() => {
    handleDropdownChange("all");
  }, [userData, issuedBooks]);

  const handleDropdownChange = (value) => {
    let val;
    if (value === "active") {
      val = userData.filter(
        (user) =>
          issuedBooks.filter(
            (transaction) => transaction.borrowerId === user.admissionId
          ).length > 0
      );
    } else if (value === "inactive") {
      val = userData.filter(
        (user) =>
          issuedBooks.filter(
            (transaction) => transaction.borrowerId === user.admissionId
          ).length === 0
      );
    } else {
      val = userData;
    }
    setFilteredUserData(val);
  };

  // const guide = ApexChart()

  // Example function to fetch user statistics
  const fetchUserData = async () => {
    fetch("http://localhost:3001/api/users/allusers")
      .then((response) => response.json())
      .then((data) => setUserData(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  };

  // Example function to fetch book statistics
  const fetchBookData = async () => {
    fetch("http://localhost:3001/api/books/allbooks")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));

    // setIssuedBooks(books.filter(book => book.bookStatus === "Issued"));
  };

  const fetchIssuedBooks = async () => {
    fetch("http://localhost:3001/api/transactions/all-transactions")
      .then((response) => response.json())
      .then((data) => {
        // const currentDate = new Date();
        const OverdueBooks = data.filter(
          (transaction) => transaction.transactionStatus === "Active"
        );
        setIssuedBooks(OverdueBooks);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  const getOverdueBooks = async () => {
    fetch("http://localhost:3001/api/transactions/all-transactions")
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date();
        console.log(currentDate);
        const OverdueBooks = data.filter(
          (transaction) =>
            Date(transaction.DueDate) < currentDate &&
            transaction.transactionStatus === "Active"
        );
        setOverdueBooks(OverdueBooks);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  };

  const getbookIssuers = () =>
  {
    const issuers = userData.filter(user => issuedBooks.filter(transaction => transaction.borrowerId === user.admissionId).length > 0);
    setBookIssuers(issuers);
    console.log(issuers);
  }

  return (
    <div className="dashboard-right">
      {/* <div className="statistics-container-right"> */}
      {/* <div className="user-stats"> */}
      {/* <h2 className="dashboard-title">User Stats</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="statistic">
                                <h3>Total Users</h3>
                                <p>{userData.length}</p>
                                {/* //use a chart here */}
      {/* </div> */}
      {/* <div className="statistic">
                                <h3>Active Users</h3>
                                <p>{userData.activeUsers}</p>
                            </div> */}
      {/* </> */}
      {/* )} */}
      {/* </div> */}
      {/* <div className="book-stats">
                    <h2 className="dashboard-title">Book Stats</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="statistic">
                                <h3>Total Books</h3>
                                <p>{books.length}</p>
                            </div>
                            <div className="statistic">
                                <h3>Issued Books</h3>
                                <p>{issuedBooks.length}</p>
                            </div>
                            <div className="statistic">
                                <h3>Overdue Books</h3>
                                <p>{overdueBooks.length}</p>
                            </div>
                        </>
                    )}
                </div> */}
      {/* </div> */}
      {/* <div className="book-stats">
                <h2 className="dashboard-title">Book Stats</h2>
                <BookStatsComponent />
            </div>
            <div className="container mt-5">
                <h2 className="mb-4">
                    React Recharts Radial Bar Chart Component Example
                </h2>
                <ReRadialBarChart/> */}
      {/* </div> */}
      <Grid container columns={12} spacing={2}>
        <Grid xs={6} md={8} item>
          <Box
            width="100%"
            backgroundColor={"rgb(6, 6, 75)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={"1px solid black"} // Add border
            // margin="8px" // Add margin
            borderRadius={"10px"}
            // marginTop={"20px"}
            boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
          >
            <StatBox
              title={bookIssuers.length}
              subtitle="Book Issuers"
              // progress="0.6"
              progress={bookIssuers.length / userData.length}
              increase={
                ((bookIssuers.length / userData.length) * 100).toString().slice(0,5) + "%"
              }
              // increase={"60%"}
              icon={<People sx={{ color: "#fff", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={6} md={4} item>
          <Box
            width="100%"
            backgroundColor={"rgb(6, 6, 75)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={"2px solid black"} // Add border
            // margin="8px" // Add margin
            borderRadius={"10px"}
            // marginTop={"20px"}
            boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
          >
            <StatBox
              title={userData.length}
              subtitle="Total Users"
              progress="/"
              //   increase= {((issuedBooks.length / books.length) * 100).toString() + "%" }
              increase={""}
              icon={<People sx={{ color: "#fff", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={6} md={4} item>
          <Box
            width="100%"
            backgroundColor={"rgb(6, 6, 75)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={"1px solid black"} // Add border
            // margin="8px" // Add margin
            borderRadius={"10px"}
            // marginTop={"20px"}
            boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
          >
            <StatBox
              title={books.length}
              subtitle="Total Books"
              progress="/"
              //   increase= {((issuedBooks.length / books.length) * 100).toString() + "%" }
              increase={""}
              icon={<LibraryBooks sx={{ color: "#fff", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
        <Grid xs={6} md={8} item>
          <Box
            width="100%"
            backgroundColor={"rgb(6, 6, 75)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border={"1px solid black"} // Add border
            // margin="8px" // Add margin
            borderRadius={"10px"}
            // marginTop={"20px"}
            boxShadow={"10px 0 10px 0 rgba(0,0,0,0.2)"}
          >
            <StatBox
              title={issuedBooks.length}
              subtitle="Issued Books"
              progress={issuedBooks.length / books.length}
              increase={
                ((issuedBooks.length / books.length) * 100).toString().slice(0,5) + "%"
              }
              // increase={"60%"}
              icon={<LibraryBooks sx={{ color: "#fff", fontSize: "26px" }} />}
            />
          </Box>
        </Grid>
      </Grid>
      {/* <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                <Box
                    width="100%"
                    backgroundColor={"#3f51b5"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border={"1px black"}
                >
                    <StatBox
                        title={issuedBooks.length}
                        subtitle="Issued Books"
                        progress="0.6"
                        //   increase= {((issuedBooks.length / books.length) * 100).toString() + "%" }
                        increase={"60%"}
                        icon={
                            <LibraryBooks
                                sx={{ color: "#fff", fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Grid> */}

            <div className="ActionButtons">
              <AddBooksButton /> &nbsp;
              <IssueBooksButton />&nbsp;
              <ReturnBookButton />
            </div>
      <div className="dropdown">
        <select
          name="dropdown"
          id="dropdown"
          defaultValue={"all"}
          onChange={(e) => handleDropdownChange(e.target.value)}
        >
          {/* <option hide value="-" disabled hidden>Filter Users</option> */}
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
      </div>
      <div className="users-table">
        <UsersTable users={filteredUserData} issuedBooks={issuedBooks} />
      </div>
    </div>
  );
};

export default Dashboard;
