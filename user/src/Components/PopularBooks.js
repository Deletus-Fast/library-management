import React from "react";
import "./PopularBooks.css";

function PopularBooks() {
  // Function to handle left scroll
  const scrollLeft = () => {
    const scrollContainer = document.querySelector(".popularbook-images");
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Function to handle right scroll
  const scrollRight = () => {
    const scrollContainer = document.querySelector(".popularbook-images");
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="popularbooks-container">
      <h2 className="popularbooks-title">Popular Books</h2>
      <div className="popularbooks">
        <button className="scroll-button left-arrow" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="popularbook-images-container">
          <div className="popularbook-images">
            {/* Add as many images as needed */}
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt="  "
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
              alt="  "
            />
            <img
              className="popular-book"
              src="https://s-na.ssl-s-amazon.com/s/I/91VokXkn8hL.jpg"
              alt="  "
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt="  "
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
              alt=""
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
            <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
             <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt="  1"
            />
             <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
             <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
             <img
              className="popular-book"
              src="https://encrypted-tbn0.gstatic.com/s?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <button className="scroll-button right-arrow" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default PopularBooks;