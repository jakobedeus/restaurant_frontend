import React from "react";
import './scss/Navbar.scss';
import {Link} from 'react-router-dom';

class Navbar extends React.Component<{}, {}>  {

    render() {
        return(

					<nav className="navbar">
            <div className="link-group">
              <Link to="/" className="navbar-brand">
                LOGO
              </Link>
							<Link className="nav-item nav-link" to="/about">About</Link>
							<Link className="nav-item nav-link" to="/admin">Admin</Link>
							<Link className="nav-item nav-link btn-booking" to="/booking">Reserve a table</Link>
            </div>
					</nav>
        )
    }

}

export default Navbar;