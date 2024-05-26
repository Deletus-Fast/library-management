import React, { useState } from "react";
import SideBarMenu from "./SideBarMenu";
import Header from "./Header";
import "./IssueBook.css";

const ReturnBook = ({ loggedInUser }) => {
  const [formData, setFormData] = useState({
    isbn: "",
    borrowerId: "",
    dueDate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/transactions/return-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin: true,
          bookId: formData.isbn,
          borrowerId: formData.borrowerId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to issue book");
      }
      // Clear form fields upon successful submission
      setFormData({
        isbn: "",
        borrowerId: "",
      });
      showNotification('Book returned successfully', 'success');
    } catch (error) {
      console.error("Error:", error);
      showNotification('Failed to return book', 'error');
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

  return (
    <div>
      <SideBarMenu loggedInUser={loggedInUser} />
      <Header loggedInUser={loggedInUser || "Admin"} />
      <div className="issue-book-container">
        <h2>Return Book</h2>
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
          </div>
          <button type="submit">Return Book</button>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;
