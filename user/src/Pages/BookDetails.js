import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BookDetails.css";
import { Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import CircularProgress from '@material-ui/core/CircularProgress'; // Import CircularProgress from Material-UI

import Footer from "../Components/Footer";
const BookDetails = () => {
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  const [summarizing, setSummarizing] = useState(false); // State to track summarization process

  useEffect(() => {
    fetchBookDetails();
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [book]);

  const fetchBookDetails = async () => {
    const bookname = location.state?.bookName || "kk";
    try {
      const response = await fetch(`http://localhost:3001/api/books/getbookByName/${bookname}`);
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      const bookData = await response.json();
      setBook(bookData);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleSummarize = async () => {
    setInput(book.bookName);
    setSummarizing(true); // Set summarizing state to true
    try {
      const response = await fetch(`http://localhost:5000/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: book.bookName }),
      });
      if (!response.ok) {
        throw new Error("Failed to summarize book");
      }
      const summary = await response.json();
      setOutput(summary);
      setShowPopup(true);
    } catch (error) {
      console.error("Error summarizing book:", error);
    } finally {
      setSummarizing(false); // Set summarizing state to false after completion
    }
  };


  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/allcomments/${book.isbn}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const commentsData = await response.json();
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(`http://localhost:3001/api/comments/addcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment, userID: user.admissionId, bookID: book.isbn }),
      });
      if (!response.ok) {
        showNotification("Failed to add comment", "error");
        throw new Error("Failed to add comment");
      }
      const newComment = await response.json();
      showNotification("Comment added successfully", "success");
      setComments([...comments, newComment]);
      setComment(""); // Clear the comment input field
    } catch (error) {
      console.error("Error adding comment:", error);
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

  return (
    <>
      <Navbar user={user} />
    <div className="motasem1">
      <div className="book-details-container">
        {book ? (
          <div className="book-details">
            <div className="book-info-container">
              <img src={book.image} alt={book.bookName} />
              <div className="book-info-right">
                <h2 className="book-title">{book.bookName}</h2>
                <p className="book-author">Author: {book.author}</p>
                <p className="book-info">Language: {book.language}</p>
                <p className="book-info">ISBN: {book.isbn}</p>
                <p className="book-info">Publisher: {book.publisher}</p>
                <p className={`book-status ${book.bookStatus === "Issued" ? "issued" : book.bookStatus === "Available" ? "available" : ""}`}>
                  Book is {book.bookStatus}
                </p>
                {user ? (
                  <button className="summarize-button" onClick={handleSummarize}>{summarizing ? <CircularProgress size={20} /> : "Summarize"}</button>
                ) : (
                  <p>Sign in to summarize the book</p>
                )}
              </div>
            </div>
            {/* Comments Section */}
            <div className="comments-section">
              {/* Add Comment Form */}
              {user ? (
                <form onSubmit={addComment} className="input-form1">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    required
                  ></input>
                  <button type="submit">Add Comment</button>
                </form>
              ) : (
                <p>Sign in to add a comment</p>
              )}
              <h3 className="comments_h3">Comments</h3>

              {comments.length === 0 ? (
                <p>No comments yet</p>
              ) : (
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>{comment.userID}: {comment.comment}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* Popup component */}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={() => setShowPopup(false)}>X</button>
              <h3>Summary:</h3>
              <p>{output}</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default BookDetails;
