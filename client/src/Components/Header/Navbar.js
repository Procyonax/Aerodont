import React, {useState} from "react";
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import {FaPlaneDeparture} from "react-icons/fa"
import {FaBars, FaTimes} from "react-icons/fa"
import {IconContext} from "react-icons/lib"

const Navbar = () => {

    // Switch burger classes
    const [click, setClick] = useState(false)

    // Toggle burger menu change
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return(
        <>
            <IconContext.Provider value ={{color: '#fff'}}>
                <nav className="navbar">
                    <div className="navbar-container container">
                        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                            <FaPlaneDeparture className="navbar-icon"/> 
                            Aerodon't
                        </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                            <ul className={click ? "nav-menu active" : "nav-menu"}>
                                <li className="nav-item">
                                    <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/create_trip" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>Create Trip</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/my_trips" className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")} onClick={closeMobileMenu}>My Trips</NavLink>
                                </li>
                            </ul>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;