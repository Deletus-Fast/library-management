import React from 'react';
import './ImageSlider.css';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import{ useState } from 'react';
import pic1 from './pic1.jpg';
import pic2 from './pic2.jpg';
import pic3 from './pic3.jpg';


function ImageSlider() {
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();

    const handleSearch = () => {
        // Navigate to Allbooks page with the search query as a parameter
        history.push(`/books?search=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className='slider'>
            {/* <div className="search-container1">
                <input
                    className='search-input'
                    type='text'
                    placeholder='Search a Book'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button1" onClick={handleSearch}>Search</button>
            </div> */}
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={pic1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Read</h3>
                        <p>Read any book from our wide range of books</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src={pic2}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Categories</h3>
                        <p>So Many to choose from! Tech, Fiction, Non-Fiction, or maybe Science?</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={pic3}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Choose</h3>
                        <p>We've got a book for you. The choices are endless!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default ImageSlider;
