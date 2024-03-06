import React, { useState } from "react";
import "./BookForms.css";
import {useFlashMessage} from "../../flashMessage";
const DeleteBook = () => {
    const [bookId, setBookId] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { message, type, isVisible, showFlashMessage } = useFlashMessage();
    const handleDeleteBook = async () => {
        if (!bookId) {
            setFlashMessage("Please enter a valid book ID.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:1111/admin/delete/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            setIsLoading(false);
            if (response.ok) {
                setFlashMessage("Book successfully deleted.");
                setBookId(''); // Reset book ID input
            } else {
                setFlashMessage("Failed to delete the book. Please try again.");
            }
        } catch (error) {
            setIsLoading(false);
            setFlashMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="add-book-container">
            <h1>Delete Book</h1>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    placeholder="Enter Book ID"
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <button onClick={handleDeleteBook} className="form-group" disabled={isLoading}>
                    {isLoading ? 'Deleting...' : 'Delete Book'}
                </button>
            </div>
            {flashMessage && <p className="flash-message">{flashMessage}</p>}
        </div>
    );
};

export default DeleteBook;