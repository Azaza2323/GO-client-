import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import "./Book.css";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PopUp from "./popUp";

const ShowSingleBook = () => {
    const [popUp, setPopUp] = useState(false);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { bookId } = useParams();
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).user_id; // Ensure jwtDecode is correctly imported and used

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:1111/${bookId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBook(data);
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

    const submitRating = async (rated, feedback) => {
        const ratingInt = parseInt(rated, 10);
        if (!ratingInt || ratingInt < 1 || ratingInt > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1111/add/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ bookId: book.id, rated: ratingInt, feedback }),
            });

            if (response.ok) {
                console.log("Book added to user successfully");
                setPopUp(false); // Close popup on successful submission
            } else {
                console.error("Failed to add book to user:", response.statusText);
                alert("Failed to add book to user."); // Provide user feedback
            }
        } catch (error) {
            console.error("Network error:", error.message);
            alert("Network error: " + error.message); // Provide user feedback
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Failed to fetch book details</div>;

    return (
        <Box className="single-book-container">
            <div className="single-book-detail">
                <img src={book.image} alt={book.name} />
                <div className="single-book-info">
                    <p><strong>Name:</strong> {book.name}</p>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Description:</strong> {book.description}</p>
                    <p><strong>Category:</strong> {book.category}</p>
                </div>
                <PopUp open={popUp} handleClose={() => setPopUp(false)} submitRating={submitRating} />
                <Button variant="contained" color="primary" onClick={() => setPopUp(true)}>
                    Add Book to My Collection
                </Button>
            </div>
        </Box>
    );
};

export default ShowSingleBook;
