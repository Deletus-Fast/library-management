import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import '../AddBooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddBooksButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    bookName: '',
    author: '',
    image: null,
    language: '',
    isbn: '',
    publisher: '',
    bookStatus: 'Available',
    categories: '',
    count: 1,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'image' ? files[0] : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData.image);
        const formData1 = new FormData();
        formData1.append('bookName', formData.bookName);
        formData1.append('image', formData.image);
  
        const response = await fetch('http://localhost:3001/api/upload', {
            method: 'POST',
            body: formData1
        });
        if (!response.ok) {
            throw new Error('Failed to save image');
        }
        const dataImage = await response.json();
        console.log(dataImage);
        try {
            formData.image = dataImage.url;
            console.log(formData);
            const response1 = await fetch('http://localhost:3001/api/books/addbook/noVerify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response1.json();
            console.log(data);
            //if (response.status === 200) {
            showNotification('Book added successfully', 'success');
            console.log(formData);
            setFormData({
                bookName: '',
                author: '',
                image: null,
                language: '',
                isbn: '',
                publisher: '',
                bookStatus: 'Available',
                categories: '',
                count: 1,
            });
            setOpen(false);
            
  
        } catch (error) {
            console.error('Error:', error);
            setOpen(false);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to add book', 'error');
        setOpen(false);
    }
  }
  
  
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

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Add Books
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        height="100%"
        fullWidth={true}
      >
        <DialogTitle sx={
            {
                fontWeight: 'bold',
            }
         }>{"Add a New Book"}</DialogTitle>
        <DialogContent>
        <div className="add-books-container">
                <div className="main-content1">
                    <form className="add-books-form">

                        <div className="form-group">
                            <label htmlFor="bookName">Book Name</label>
                            <input
                                type="text"
                                id="bookName"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="language">Language</label>
                            <input
                                type="text"
                                id="language"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isbn">ISBN</label>
                            <input
                                type="text"
                                id="isbn"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="publisher">Publisher</label>
                            <input
                                type="text"
                                id="publisher"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Categories</label>
                            <input
                                type="text"
                                id="categories"
                                name="categories"
                                value={formData.categories}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categories">Book Count</label>
                            <input
                                type="text"
                                id="count"
                                name="count"
                                value={formData.count}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <button type="submit">Add Book</button>  */}
                    </form>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
