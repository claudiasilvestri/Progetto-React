import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../Layout/Header.css'; 
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">GameVerse</Link>
        </div>
        
        <SearchBar />
        
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




