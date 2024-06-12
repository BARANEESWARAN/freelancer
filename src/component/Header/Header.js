import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from "../../asset/logo.jpg"
const Header = () => {
  const [activeLink, setActiveLink] = useState('Home');

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav>
       <NavLink to={"/"}>
      <div className="logo">
       
      <img className="brand" src={Logo} alt="logo"/>
   
      </div>
      </NavLink>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="fas fa-bars" style={{ color: "white" }}></i>
      </label>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleClick('Home')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleClick('About Us')}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/freelancer"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleClick('Freelancer')}
          >
            Freelancer
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/job-posts"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleClick('Job Posts')}
          >
            Job Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clients"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleClick('Clients')}
          >
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact-us"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={() => handleClick('Contact Us')}
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
