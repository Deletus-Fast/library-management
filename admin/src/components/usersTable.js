import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import { makeStyles, withStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650
//   }
// });

// const TableHead = withStyles((theme) => ({
//   root: {
//     backgroundColor: "orange"
//   }
// }))(MuiTableHead);

// const TableHeaderCell = withStyles((theme) => ({
//   root: {
//     color: "white"
//   }
// }))(TableCell);

// Destructure the 'users' prop to access the array of users
export default function UsersTable({ users, issuedBooks }) {
  // const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        paddingBottom: "50px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="user table">
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
              Admission ID
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Active Transactions
            </TableCell>
            <TableCell
              sx={{
                color: "white",
              }}
            >
              Role
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.admissionId}</TableCell>
              <TableCell>
                {
                  issuedBooks.filter(
                    (transaction) => transaction.borrowerId === user.admissionId
                  ).length
                }
              </TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
