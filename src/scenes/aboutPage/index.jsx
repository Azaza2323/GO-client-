import React from 'react';
import './about.css';
import image3 from "../../images/Abylai.jpg"
import image2 from "../../images/Azamat.jpg"
import image1 from "../../images/Yernur.jpg"
const About = () => {
    return (
        <div className="about-container">
            <h1>About Our Project</h1>
            <p>
                Our project, <strong>BookHub</strong>, is a web application designed for book enthusiasts to explore,
                review, and manage their favorite books. It serves as a digital library where users can
                add books to their personal collection, share reviews, and discover new reads.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Explore books from a wide range of genres.</li>
                <li>Add books to your personal collection.</li>
                <li>Write and share your reviews on books.</li>
                <li>Get recommendations based on your taste.</li>
            </ul>
            <h2>Our Team</h2>
            <p>
                We are a group of book lovers and developers who wanted to create a space where people
                can come together to share their love for books. Our team is dedicated to providing
                the best experience for our users.
            </p>
            <h2>Developers Contacts</h2>
            <div className="developers-container">
                <div className="developer">
                    <img src={image1} alt="Yernur Sarzhan"/>
                    <a href="https://t.me/yernur_tg" target="_blank" rel="noopener noreferrer">Yernur Sarzhan</a>
                </div>
                <div className="developer">
                    <img src={image2} alt="Azamat Sabdenbek"/>
                    <a href="https://t.me/whosyeezy" target="_blank" rel="noopener noreferrer">Azamat Sabdenbek</a>
                </div>
                <div className="developer">
                    <img src={image3} alt="Abylai Dauletkan"/>
                    <a href="https://t.me/takejo" target="_blank" rel="noopenerнoreferrer">Abylai Dauletkan</a>
                </div>
            </div>
        </div>
    );
};

export default About;