import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function booksTable(books) {
  return (
    <TableContainer component={Paper}
      sx={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        paddingBottom: "50px",
        marginTop: "30px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="books table">
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
              ISBN</TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Status</TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Count</TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Author</TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Publisher</TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Category</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books?.length > 0 ? (books.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              {
                book.count === 0 ? (
                  <TableCell sx={{ color: "red" }}>
                    <div className='unavailable'>Unavailable</div>
                  </TableCell>
                ) : (
                    <TableCell sx={{ color: "green" }}>
                      <div className='available'>Available</div>
                    </TableCell>
                  )
                
              }
              {/* <TableCell>{book.bookStatus}</TableCell> */}
              <TableCell>{book.count}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.publisher}</TableCell>
              <TableCell>{book.categories}</TableCell>
            </TableRow>
          ))) : (
            <TableRow>
              <TableCell>No books available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer >
  );
}
