import React, { useState } from 'react';
import SideBarMenu from './SideBarMenu';
import Header from './Header';
import './AddBooks.css';

const AddBooks = ({ loggedInUser }) => {
    if (!loggedInUser) {
        loggedInUser = 'Admin';
    }

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

            } catch (error) {
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Failed to add book', 'error');
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
        <div>
            <SideBarMenu loggedInUser={loggedInUser} />
            <Header loggedInUser={loggedInUser} />
            <div className="add-books-container">
                <div className="main-content1">
                    <form className="add-books-form" onSubmit={(e) => handleSubmit(e)}>

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
                                type="number"
                                id="count"
                                name="count"
                                value={formData.count}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Add Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBooks;