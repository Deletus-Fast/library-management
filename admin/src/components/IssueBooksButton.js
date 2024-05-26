import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function IssueBooksButton() {

    const [formData, setFormData] = useState({
        isbn: "",
        borrowerId: "",
        dueDate: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/transactions/add-transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    isAdmin: true,
                    bookId: formData.isbn, // Assuming isbn corresponds to bookId
                    borrowerId: formData.borrowerId,
                    toDate: formData.dueDate,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to issue book");
            }
            // Clear form fields upon successful submission
            setFormData({
                isbn: "",
                borrowerId: "",
                dueDate: "",
            });
            showNotification('Book issued successfully', 'success');
            setOpen(false);
        } catch (error) {
            console.error("Error:", error);
            showNotification('Failed to issue book', 'error');
            setOpen(false);

            // Handle error if needed
        }
    };

    const showNotification = (message, type) => {

        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
        } else if (Notification.permission === 'granted') {
            new Notification(message);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(message);
                }
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Issue A Book
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle sx={
                    {
                        fontWeight: 'bold',
                    }
                }>{"Issue A Book"}</DialogTitle>
                <DialogContent>
                    <div className="issue-book-container">
                        {/* <h2>Issue Book</h2> */}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="isbn">ISBN:</label>
                                <input
                                    type="text"
                                    id="isbn"
                                    name="isbn"
                                    value={formData.isbn}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="borrowerId">Borrower ID:</label>
                                <input
                                    type="text"
                                    id="borrowerId"
                                    name="borrowerId"
                                    value={formData.borrowerId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="dueDate">Due Date:</label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <button type="submit">Issue Book</button> */}
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Issue</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
