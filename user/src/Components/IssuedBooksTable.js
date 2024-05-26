import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function IssuedBooksTable({ issuedBooks, books }) {
  // const [books, setBooks] = useState([]);

  

  // Function to retrieve book name based on bookId
  const getBookName = (bookId) => {
    return books.find((book) => book.isbn === bookId)?.bookName || "Unknown";
  };

  return (
    <TableContainer component={Paper}
    sx={{
      borderRadius: "10px",
      overflow: "hidden",
      border: "1px solid rgba(0, 0, 0, 0.12)",
      paddingBottom: "50px",
      marginTop: "20px",
    }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="issued books table">
        <TableHead>
          <TableRow
          sx={{
            bgcolor: "rgb(6, 6, 75)",
          }}
        >
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Book Name</TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issuedBooks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2}>No issued books</TableCell>
            </TableRow>
          ) : (
            issuedBooks.map(({ bookId, DueDate }, index) => (
              <TableRow key={index}>
                {/* Display book name using getBookName function */}
                <TableCell>{getBookName(bookId)}</TableCell>
                <TableCell>{String(DueDate).substring(0, 10)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IssuedBooksTable;
