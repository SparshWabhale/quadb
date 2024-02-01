import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <>
      <nav>
        <Link to="/">
          <img src="/logo.png" alt="logo" className="logo-nav" />
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button type="button">Search</button>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="https://sparshwabhale.github.io/" target="_blank">About me</Link>
          </li>
          <li>
            <Link to="/signup">
              <button className="signup">Sign In</button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
