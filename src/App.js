import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import SingleBookPage from "./scenes/singleBookPage";
import ProfilePage from "./scenes/profilePage";
import AdminPage from './scenes/adminPage';
import { jwtDecode } from 'jwt-decode';



const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
};

const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (token && typeof token === "string") {
        try {
            const decoded = jwtDecode(token);
            const role = decoded.role;
            return role === 'admin';
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    }
    return false;
};
const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated() ? <HomePage /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/books/:bookId"
                        element={
                            isAuthenticated() ? <SingleBookPage /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            isAdmin()? <AdminPage /> : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
