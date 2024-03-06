import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../flashMessage";
import "./Book.css";

const ShowCategoryBooks = () => {
    const [books, setBooks] = useState([]);
    const { category } = useParams();
    const navigate = useNavigate();
    const { showFlashMessage } = useFlashMessage();

    useEffect(() => {
        fetchBooksByCategory(category);
    }, [category]);

    const fetchBooksByCategory = async (category) => {
        try {
            const response = await fetch(`http://localhost:1111/category/${category}`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                showFlashMessage(`Failed to fetch books for category: ${category}`, 'error');
            }
        } catch (error) {
            console.error("Network error:", error);
            showFlashMessage('An error occurred. Please try again.', 'error');
        }
    };

    return (
        <div className="book-container">
            <h1>{category} Books</h1>
            <div className="book-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card" onClick={() => navigate(`/${book.id}`)}>
                        <img src={book.image || 'default_book_image_url'} alt={book.name} className="book-image" />
                        <div className="book-info">
                            <h2>{book.name}</h2>
                            <p>Author: {book.author}</p>
                            <p>{book.description}</p>
                            <p>Category: {book.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowCategoryBooks;
