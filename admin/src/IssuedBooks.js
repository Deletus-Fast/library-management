import React, { useState, useEffect } from "react";
import SideBarMenu from "./SideBarMenu";
import Header from "./Header";
import "./IssuedBooks.css";

function IssuedBooks({loggedInUser}) {
    if(!loggedInUser) {
        loggedInUser = 'Admin';
    }
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books data from the backend API
        fetch("http://localhost:3001/api/books/allbooks")
            .then((response) => response.json())
            .then((data) => setBooks(data.filter(book => book.bookStatus === "Issued")))
            .catch((error) => console.error("Error fetching books:", error));
    }, []);

    return (
        <div>
            <SideBarMenu loggedInUser={loggedInUser} />
            <Header loggedInUser={loggedInUser} />
            <div className="books-page">
                <div className="books">
                    {books.length === 0 ? (
                        <p>No books have been issued.</p>
                    ) : (
                        books.map((book) => (
                            <div key={book.id} className="book-card">
                                <img src={book.image} alt={book.bookName} />
                                <p className="bookcard-title">{book.bookName}</p>
                                <p className="bookcard-author">By {book.author}</p>
                                <div className="bookcard-category">
                                    <p>{book.categories}</p>
                                </div>
                                 <div className="bookcard-emptybox"></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default IssuedBooks;
