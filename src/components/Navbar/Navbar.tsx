import React from "react";
import './scss/Navbar.scss';
import {Link, NavLink} from 'react-router-dom';

class Navbar extends React.Component<{}, {}>  {

    render() {
        return(

					<nav className="navbar">
            <div className="link-group">
              <Link className="navbar-brand" to="/" >セバスチャン</Link>
							<NavLink className="nav-item nav-link" activeClassName="active" to="/about">About</NavLink>
							<NavLink className="nav-item nav-link" activeClassName="active" to="/admin">Admin</NavLink>
							<Link className="nav-item nav-link btn-booking" to="/booking">Reserve a table</Link>
            </div>
					</nav>
        )
    }

}

export default Navbar;