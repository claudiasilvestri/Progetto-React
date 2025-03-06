import { useState } from "react";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {isLoggedIn ? (
          <li><Link href="#">Logout</Link></li>
        ) : (
          <>
            <li><Link href="#">Login</Link></li>
            <li><Link href="#">Registrati</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

