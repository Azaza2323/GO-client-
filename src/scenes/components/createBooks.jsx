import React, { useState } from "react";
import "./BookForms.css";
import {useFlashMessage} from "../../flashMessage";
const AddBook = () => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        description: "",
        category: "",
        image: ""
    });
    const { message, type, isVisible, showFlashMessage } = useFlashMessage();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData({
                ...formData,
                image: reader.result
            });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:1111/admin/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log("Book added successfully");
                setFormData({
                    name: "",
                    author: "",
                    description: "",
                    category: "",
                    image: ""
                });
            } else {
                console.error("Failed to add book");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="add-book-container">
            {isVisible && <div className={`flash-message ${type}`}>{message}</div>}
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit} className="add-book-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} required/>
                </div>
                <button type="submit" className="submit-button">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;