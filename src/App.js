import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import SingleBookPage from "./scenes/singleBookPage";
import jwtDecode from "jwt-decode";
import AdminPage from "./scenes/adminPage";
import Navbar from "./scenes/navbar";
import ProfilePage from "./scenes/profilePage";
import About from "./scenes/AboutPage";
import ShowCategoryBooks from "./scenes/components/showCategoryBook";
import { FlashMessageProvider } from "./flashMessage";

const useAuth = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const isAuthenticated = !!localStorage.getItem("token");
    const isAdmin = role === 'admin';

    return { isAuthenticated, isAdmin, role };
};

const AppContent = () => {
    const location = useLocation();
    const { isAuthenticated, isAdmin, role } = useAuth();

    return (
        <>
            {location.pathname !== "/login" && <Navbar role={role} />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
                <Route path="/:bookId" element={isAuthenticated ? <SingleBookPage /> : <Navigate to="/login" replace />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} />
                <Route path="/category/:category" element={<ShowCategoryPage />} />
            </Routes>
        </>
    );
};


const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <FlashMessageProvider>
                    <AppContent />
                </FlashMessageProvider>
            </BrowserRouter>
        </div>
    );
};


export default App;
