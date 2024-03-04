import React, { useState } from "react";

const DeleteBook = () => {
    const [bookId, setBookId] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteBook = async () => {
        if (!bookId) {
            setFlashMessage("Please enter a valid book ID.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:1111/admin/delete/${bookId}`, {
                method: "DELETE",
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
        <div>
            <input
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="Enter Book ID"
                disabled={isLoading}
            />
            <button onClick={handleDeleteBook} disabled={isLoading}>
                {isLoading ? 'Deleting...' : 'Delete Book'}
            </button>
            {flashMessage && <p>{flashMessage}</p>}
        </div>
    );
};

export default DeleteBook;
