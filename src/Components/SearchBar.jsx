import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Layout/SearchBar.css";
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"  
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a game..."
      />
      <button onClick={handleSearch} className="search-btn">  
        Search
      </button>
    </div>
  );
};

export default SearchBar;
