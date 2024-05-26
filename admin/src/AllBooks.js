import React, { useState, useEffect } from "react";
import SideBarMenu from "./SideBarMenu";
import Header from "./Header";
import "./Allbooks.css";
import booksTable from "./components/booksTable";

function Allbooks({loggedInUser}) {
    const [books, setBooks] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [filteredBooksData, setFilteredBooksData] = useState([]);


    useEffect(() => {
                   
        fetchBooks();
        fetchIssuedBooks();

        handleDropdownChange("all");
    }, []);

    useEffect(() => {
        handleDropdownChange("all");
    }, [issuedBooks, books]);


    const handleDropdownChange = (value) => {
        let val
        if (value === "issued") {
          val = issuedBooks
        }else {
          val = books;
        }
        setFilteredBooksData(val);
      };

    const fetchBooks = async () => {
        fetch("http://localhost:3001/api/books/allbooks")
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error("Error fetching books:", error));
    }

    const fetchIssuedBooks = async () => {
        fetch("http://localhost:3001/api/books/allbooks")
            .then((response) => response.json())
            .then((data) => {
                // const currentDate = new Date();
                const ActiveBooks = data.filter(book => book.bookStatus === "Issued");
                setIssuedBooks(ActiveBooks);
            })
            .catch((error) => console.error("Error fetching books:", error));
    }

    // useEffect(() => {
        // Set dummy book data if the fetched data is empty
        // if (books.length === 0) {
        //     setBooks([
        //         {
        //             id: 1,
        //             bookName: "Wings Of Fire",
        //             author: "Pranavdhar",
        //             categories: ["Auto Biography"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 2,
        //             bookName: "The Power Of Your Subconscious Mind",
        //             author: "Joseph",
        //             categories: ["Psychology"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 3,
        //             bookName: "Elon Musk",
        //             author: "Elon",
        //             categories: ["Auto Biography"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 4,
        //             bookName: "The Subtle Art Of Not Giving A Fuck",
        //             author: "Mark Manson",
        //             categories: ["COMIC"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 5,
        //             bookName: "The Subtle Art Of Not Giving A Fuck",
        //             author: "Mark Manson",
        //             categories: ["COMIC"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 6,
        //             bookName: "The Subtle Art Of Not Giving A Fuck",
        //             author: "Mark Manson",
        //             categories: ["COMIC"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 7,
        //             bookName: "The Subtle Art Of Not Giving A Fuck",
        //             author: "Mark Manson",
        //             categories: ["COMIC"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 8,
        //             bookName: "The Subtle Art Of Not Giving A Fuck",
        //             author: "Mark Manson",
        //             categories: ["COMIC"],
        //             image: "https://via.placeholder.com/150",
        //         },
        //         {
        //             id: 9,
        //             bookName: "The Subtle Art Of Not Giving A Fuck",
        //             author: "Mark Manson",
        //             categories: ["COMIC"],
        //             image: "https://via.placeholder.com/150",
        //         }
            // ]);
        // }
    // }, [books]);

    return (
        <div>
            <SideBarMenu loggedInUser={loggedInUser} />
            <Header loggedInUser={loggedInUser} />
            <div  className="dashboard-right" >
            {/* <div className="books-page">
                <div className="books">
                    {books.map((book) => (
                        <div key={book.id} className="book-card">
                            <img src={book.image} alt={book.bookName} />
                            <p className="bookcard-title">{book.bookName}</p>
                            <p className="bookcard-author">By {book.author}</p>
                            <div className="bookcard-category">
                                <p>{book.categories}</p>
                            </div>
                            <div className="bookcard-emptybox"></div>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="dropdown">
                <select
                    name="dropdown"
                    id="dropdown"
                    defaultValue={"all"}
                    onChange={(e) => handleDropdownChange(e.target.value)}
        
                >
                    <option value="all">All Books</option>
                    <option value="issued">Issued Books</option>
                </select>
            </div>
            <div className="table-container">
                {/* <booksTable books={filteredBooksData} /> */}
                {booksTable(filteredBooksData)}
            </div>
        </div>
        </div>
    );
}

export default Allbooks;
