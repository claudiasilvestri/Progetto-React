import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/games/genre">Genre</Link></li>
        <li><Link to="/games/game-name">Game</Link></li>
      </ul>
      <Outlet /> 
    </nav>
  );
};

export default Navbar;


