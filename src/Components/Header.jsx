import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../Layout/Header.css'; 

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">GameVerse</Link>
        </div>

        <div className="navbar-center">
          <input type="text" className="search-bar" placeholder="Search..." />
          <button className="search-btn">Search</button>
        </div>

        <div className="navbar-right">
          <Link to="/login" className="auth-btn">Login</Link>
          <Link to="/register" className="auth-btn">Register</Link>
        </div>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Navbar;



