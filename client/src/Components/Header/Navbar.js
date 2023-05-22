import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      {/* IconContext changes icons from default black to white, as background is black */}
      <IconContext.Provider value={{ color: "#EFD231" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            {/* Logo routes to home and closes mobile menu when clicked */}
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <FaPlaneDeparture className="navbar-icon" />
              Aerodon't
            </Link>
            {/* Switches burger between bars when inactive and cross when active */}
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            {/* Route links with highlight effect when active */}
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/create_trip"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Create Trip
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/my_trips"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  My Trips
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
