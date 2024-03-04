import React, { useState, useEffect } from 'react';
import Navbar from "../navbar";
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import {jwtDecode} from "jwt-decode";


const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {

            try {
                const token = localStorage.getItem('token');
                    const decodedToken = jwtDecode(token);
                    console.log(decodedToken)
                    const id=decodedToken.user_id
                const response = await fetch(`http://localhost:1111/profile/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!profile) {
        return <Typography variant="h6" color="error">Failed to fetch profile data</Typography>;
    }

    return (
        <Container>
            <Navbar />
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Typography variant="body1"><strong>Name:</strong> {profile.user.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {profile.user.email}</Typography>
            {profile.books && profile.books.length > 0 && (
                <>
                    <Typography variant="h5" gutterBottom>My Books</Typography>
                    {profile.books.map(book => (
                        <Typography key={book.id} variant="body1">
                            {book.name} by {book.author}
                        </Typography>
                    ))}
                </>
            )}
        </Container>
    );
};

export default ProfilePage;
