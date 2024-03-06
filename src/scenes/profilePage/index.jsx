import React, { useState, useEffect } from 'react';
import {Container, CircularProgress, Button} from '@mui/material';
import { jwtDecode } from "jwt-decode";
import "./profile.css"
import PopUp from "../components/popUp";
const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const id = decodedToken.user_id;
                const response = await fetch(`http://localhost:1111/profile/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch profile data");
                }
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleOpenPopup = (book) => {
        setSelectedBook(book);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const submitRating = async (rating, feedback) => {
        if (!selectedBook) return;
        const ratingInt = parseInt(rating, 10);

        await fetch(`http://localhost:1111/profile/${selectedBook.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                rated: ratingInt,
                feedback: feedback,
            }),
        });
        handleClosePopup();
    };

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <div className="single-book-container">
                <h1>Profile</h1>
                {profile?.books && profile.books.length > 0 && (
                    <div className="book-container">
                        <h2>My Reviews</h2>
                        {profile.books.map(book => (
                            <div key={book.id} className="book-card">
                                <img src={book.image} alt={book.name} className="book-image" />
                                <div className="book-info">
                                    <h2>{book.name}</h2>
                                    <p>Rating: {book.rated}</p>
                                    <p>Feedback: {book.feedback}</p>
                                    <Button onClick={() => handleOpenPopup(book)}>Change</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <PopUp open={openPopup} handleClose={handleClosePopup} submitRating={submitRating} />
        </Container>
    );
};

export default ProfilePage;