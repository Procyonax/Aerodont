import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"
import "./Footer.css"

const Footer = () => {
    return(
        <div className="footer-container">
            <div className="footer-nav">
                <ul className="footer-nav-list">
                    <li className="footer-nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="footer-nav-item">
                        <Link to="/create_trip">Create Trip</Link>
                    </li>
                    <li className="footer-nav-item">
                        <Link to="/my_trips">My Trips</Link>
                    </li>
                </ul>
            </div>
            <div className="footer-copyright">
                <p><a className="footer-copyright-link" href="https://github.com/Procyonax/How-Selfish-Is-Your-Trip">© Jamie Cooper-Higgins, Neil Hutton, Tom Gibbons, Zoe Eustace</a></p>
            </div>
        </div>
    )
}

export default Footer;