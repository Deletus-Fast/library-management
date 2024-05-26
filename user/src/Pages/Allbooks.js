import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Allbooks.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { AuthContext } from '../Context/AuthContext';

import { useContext } from 'react';

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext);
  //const { dispatch } = useContext(AuthContext);
 // dispatch({ type: 'LOGIN_SUCCESS', payload: user });

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/books/allbooks");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const booksData = await response.json();

      // Filter books based on search query
      const filteredBooks = searchQuery
        ? booksData.filter(book => book.bookName.toLowerCase().includes(searchQuery.toLowerCase()))
        : booksData;

      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = () => {
    fetchBooks();
  };

  
  return (
    <>
      <Header user={user}/>
      <div className="motasem">
      <div className="search-container2">
        <input
          className='search-input1'
          type='text'
          placeholder='Search a Book'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button2" onClick={handleSearch}>Search</button>
      </div>
      <div className="books-page">
        <div className="books">
          {books.map((book) => (
            <Link to={{ pathname: "/book", state: { bookName: book.bookName } }} key={book._id}>
              <div className="book-card">
                <img className="imagine" src={book.image} alt={book.bookName} />
                {/* <p className="bookcard-title">{book.bookName}</p> */}
                <p className="bookcard-author">By {book.author}</p>
                {book.categories === "fiction" || book.categories === "nonfiction" || book.categories === "tech" || book.categories === "science" ? (  <div className={`bookcard-category-${book.categories}`}>
                  <p>{book.categories}</p>
                </div>
                ) : (
                  <div className='bookcard-category'>
                    <p>{book.categories}</p>
                  </div>
                )}
                <div className="bookcard-emptybox"></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="footer">
        <Footer />
        </div>
      </div>
      </div>
    </>
  );
}

export default Allbooks;
