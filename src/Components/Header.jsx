import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../layout/Header.css'; 
import SearchBar from "./SearchBar";
import "../layout/signup.css";
import supabase from "../supabase/client";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }

      const { data } = await supabase.auth.getSession();
    };

    getInfo();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">GameVerse</Link>
        </div>

        <SearchBar />

        <div className="navbar-right">
          <Link to="/register" className="auth-btn">Sign Up</Link>
          <Link to="/login" className="auth-btn">Login</Link>
          <button onClick={signOut} className="auth-btn">Logout</button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}




