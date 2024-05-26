import { useEffect, useState } from "react";
import "./stuff.css"

function Stuff() {
    const [issuedBooks, setIssuedBooks] = useState(null);
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [val, setVal] = useState(0);

    useEffect(async () => {
        setUser("rubab");

        const IB = await fetchIssuedBooks();
        setIssuedBooks(IB)
        await fetchBooks();
        if(issuedBooks?.length > 0)
        {
            setVal(1);
        }
    }, []);
    
    const fetchIssuedBooks = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/transactions/all-transactions");
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await response.json();
            const currentDate = new Date();
            const issuedBooks = data.filter(transaction => transaction.transactionStatus === "Active" && transaction.borrowerId === user);
            return issuedBooks;
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/books/allbooks");
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const getBookName = (bookId) => {
        return books.find(book => book.isbn === bookId)?.bookName || "Unknown";
    };

    console.log(issuedBooks?.length)

    return (
        <div className="issued-books">
            {issuedBooks?.length>0 && issuedBooks.map((book, index) => (
                <div className="book-card" key={index}>
                    <p className="book-name">{getBookName(book.bookId)}</p>
                    <p className="due-date">Due Date: {String(book.DueDate).substring(0,10)}</p>
                </div>
            ))}
        </div>
    );
}

export default Stuff;
