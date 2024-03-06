import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { useParams } from "react-router-dom";

const Reviews = () => {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const { bookId } = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:1111/reviews/${bookId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setReviews(data);
                } else {
                    console.error("Failed to fetch reviews:", response.statusText);
                }
            } catch (error) {
                console.error("Network error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [bookId]);

    if (loading) return <div>Loading...</div>;

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Reviews</Typography>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.username}</Typography>
                        <Rating value={review.rated} readOnly />
                        <Typography variant="body2">{review.feedback}</Typography>
                    </Box>
                ))
            ) : (
                <Typography>No reviews yet.</Typography>
            )}
        </Box>
    );
};

export default Reviews;
