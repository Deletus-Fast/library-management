// import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
    // const [showFooter, setShowFooter] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         // Calculate the scroll position
    //         const scrollPosition = window.scrollY;
    //         // Calculate the height of the page content
    //         const windowHeight = window.innerHeight;
    //         const fullHeight = document.body.clientHeight;

    //         // Determine if the scroll position is near the bottom of the page
    //         const isNearBottom = scrollPosition > fullHeight - windowHeight - 100;

    //         // Update the state to show/hide the footer
    //         setShowFooter(isNearBottom);
    //     };

    //     // Attach scroll event listener
    //     window.addEventListener('scroll', handleScroll);

    //     // Remove the event listener on cleanup
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        // <div className={footer ${showFooter ? 'show' : ''}}>
        <div className="footer show">
            <div className='footer-content'>
                {/* Add your footer content here */}
                <p>Contact Us: example@example.com</p>
                <p>Phone: 123-456-7890</p>
            </div>
        </div>
    );
}

export default Footer;