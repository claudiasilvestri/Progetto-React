import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {isLoggedIn ? (
          <li>
            <a href="#" onClick={handleAuth}>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <Link to="#" onClick={handleAuth}>
                Login
              </Link>
            </li>
            <li>
              <Link to="#">Registrati</Link>
            </li>
          </>
        )}
      </ul>

      <div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/games/genre">Genre</a></li>
          <li><a href="/games/game-name">Game</a></li>
        </ul>
      </nav>
      <Outlet />
    </div>
    </nav>
  );
};

export default Navbar;



