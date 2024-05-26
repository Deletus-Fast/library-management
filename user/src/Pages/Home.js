import React, { useEffect, useState } from 'react';
import About from '../Components/About';
import Footer from '../Components/Footer';
import ImageSlider from '../Components/ImageSlider';
import PopularBooks from '../Components/PopularBooks';
import RecentAddedBooks from '../Components/RecentAddedBooks';
import Stats from '../Components/Stats';
import WelcomeBox from '../Components/WelcomeBox';
import Header from '../Components/Header';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import './Home.css';

function Home() {
    const { user } = useContext(AuthContext);
    const [notification, setNotification] = useState(false);

    const closePopup = () => {
        setNotification(false);
        if(notification === false){
            console.log("Popup closed");
        }
    }

    const [issuedBooks, setIssuedBooks] = useState(null);
    const [books, setBooks] = useState([]);
    let once = true


    useEffect(() => {
        if (user && once) {
            setNotification(true);
            console.log("Popup opened");
            fetchIssuedBooks();
            fetchBooks();
            once = false;
        }
    }, [user]);

    const fetchIssuedBooks = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/transactions/all-transactions");
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await response.json();
            const currentDate = new Date();
            const issuedBooks = data.filter(transaction => transaction.transactionStatus === "Active" && transaction.borrowerId === user.admissionId);
            setIssuedBooks(issuedBooks);
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

    return (
        <>
            <div id='home'>
                <Header user={user}/>
                <ImageSlider/>
                <WelcomeBox/>
                <About/>
                <Stats/>
                <RecentAddedBooks/>
                {/* <PopularBooks/> */}
                <Footer/> 
            </div>
            {/* <div className={notification ? "popup active" : "popup"}>
                <div className="popup-content">
                    <h1>Welcome {user.admissionId}</h1>
                    {issuedBooks !== null && issuedBooks.map((book, index) => (
                        <div className="book-card" key={index}>
                            <p className="book-name">{getBookName(book.bookId)}</p>
                            <p className="due-date">Due Date: {String(book.DueDate).substring(0,10)}</p>
                        </div>
                    ))}
                    <button className='popup-button' onClick={closePopup}>Close</button>
                </div>
            </div> */}
        </>
    )
}

export default Home;
