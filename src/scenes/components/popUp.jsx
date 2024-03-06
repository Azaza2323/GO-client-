import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PopUp = ({ open, handleClose, submitRating }) => {
    const [rating, setRating] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        // Pass rating and feedback to submitRating function
        submitRating(rating, feedback);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="rating-modal-title"
            aria-describedby="rating-modal-description"
        >
            <Box sx={style}>
                <Typography id="rating-modal-title" variant="h6" component="h2">
                    Rate and Review the Book
                </Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    id="rating"
                    label="Rating (1-5)"
                    name="rating"
                    autoFocus
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="feedback"
                    label="Feedback"
                    type="text"
                    id="feedback"
                    multiline
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default PopUp;
