import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = ({ role }) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const isAuthenticated = !!localStorage.getItem("token");

    const categories = [
        'Fiction', 'Science Fiction', 'Fantasy', 'Historical Fiction',
        'Classic Literature', 'Epic Poetry', 'Modernist Literature',
        'Modern Literature', 'Satire', 'Drama'
    ];

    const handleNavbar = () => setToggleMenu(!toggleMenu);
    const toggleCategories = () => setIsCategoriesVisible(!isCategoriesVisible);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    };

    return (
        <nav className='navbar' id="navbar">
            <div className='container navbar-content flex'>
                <div className='brand-and-toggler flex flex-sb'>
                    <Link to="/" className='navbar-brand flex'>
                        <span className='text-uppercase fw-7 fs-24 ls-1'>BookHub</span>
                    </Link>
                    <button type="button" className='navbar-toggler-btn' onClick={handleNavbar}>
                        <HiOutlineMenuAlt3 size={35} style={{ color: `${toggleMenu ? "#fff" : "#010101"}` }} />
                    </button>
                </div>

                <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
                    <ul className="navbar-nav">
                        <li className='nav-item'>
                            <Link to="/" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
                        </li>
                        <li className='nav-item' onClick={toggleCategories}>
                            <Link to="#" className='nav-link'>Categories</Link>
                            {isCategoriesVisible && (
                                <ul className="categories-dropdown">
                                    {categories.map((category) => (
                                        <li key={category} onClick={() => setSelectedCategory(category)}>
                                            <Link to={`/category/${category}`} className='dropdown-item'>
                                                {category}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        {role === "admin" && (
                            <li className='nav-item'>
                                <Link to="/admin"
                                      className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Manage</Link>
                            </li>
                        )}
                        <li className='nav-item'>
                            <Link to="/about"
                                  className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>About</Link>
                        </li>
                        {!isAuthenticated && (
                            <li className='nav-item'>
                                <Link to="/login"
                                      className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Login</Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <>
                                <li className='nav-item'>
                                    <Link to="/profile/:id"
                                          className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Profile</Link>
                                </li>
                                <li className='nav-item'>
                                    <a href="/logout" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'
                                       onClick={(e) => {
                                           e.preventDefault();
                                           logout();
                                       }}>Logout</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;