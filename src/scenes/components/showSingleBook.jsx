import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "./Book.css";
import {useParams} from "react-router-dom";

const ShowSingleBook = () => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { bookId } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:1111/${bookId}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Book details:", data);
                    setBook(data[0]);
                } else {
                    console.error("Failed to fetch book details:", response.statusText);
                }
            } catch (error) {
                console.error("Network error:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Failed to fetch book details</div>;
    }

    return (
        <Box className="single-book-container">
            <div className="single-book-detail">
                <div className="single-book-info">
                    <img src={book.image} alt={book.name} className="book-image" />
                    <p>Name: {book.name}</p>
                    <p>Author: {book.author}</p>
                    <p>Description: {book.description}</p>
                    <p>Category: {book.category}</p>
                </div>
            </div>
        </Box>
    );
};

export default ShowSingleBook;