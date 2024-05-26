import React, { useState, useEffect } from 'react';
import './Dashboard.css';
// import ApexChart from './components/ApexChart'
import BookStatsComponent from './components/BooksStats';
// import "bootstrap/dist/css/bootstrap.min.css";
import ReRadialBarChart from "./components/RadialGraph";
// import Grid from "@mui/material/Unstable_Grid2";
import StatBox from "./components/StatBox";
import EmailIcon from "@mui/icons-material/Email";
import Grid from "@mui/material/Grid";
import UsersTable from "./components/usersTable";
import { ExpandLess, ExpandMore, People, LibraryBooks } from '@mui/icons-material';

// import { LibraryBooks } from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

const BooksData = () => {
    // De+45we9ll.fine state variables to store statistics
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [filteredUserData, setFilteredUserData] = useState([]);


    // Fetch data from the backend or state management system
    useEffect(() => {
        // Example: Fetch book statistics
        fetchBookData()

        fetchIssuedBooks()

        setLoading(false);
    }, []);

    

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
                const OverdueBooks = data.filter(transaction => transaction.transactionStatus === "Active");
                setIssuedBooks(OverdueBooks);
            })
            .catch((error) => console.error("Error fetching transactions:", error));

    }

    return (
        <div className="dashboard-right">
            <div className="statistics-container-right">

            <div className="users-table">
                <bookTable books={books}/>
            </div>
        </div>
        </div>




    );
};  

export default BooksData;
