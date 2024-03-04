import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import SingleBookPage from "./scenes/singleBookPage";
import ProfilePage from "./scenes/profilePage";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
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
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
