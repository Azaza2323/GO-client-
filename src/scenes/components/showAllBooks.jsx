import React, { useState, useEffect } from "react";
import "./Book.css";
import { useNavigate } from "react-router-dom";

const Book = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = async () => {
        try {
            const response = await fetch("http://localhost:1111/", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setBooks(data); // Set the fetched books into state
            } else {
                console.error("Failed to fetch all books");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="book-container">
            <h1>Books</h1>
            <div className="book-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card" onClick={() => navigate(`/${book.id}`)}>
                        <img src={book.image} alt={book.name} className="book-image" />
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

export default Book;