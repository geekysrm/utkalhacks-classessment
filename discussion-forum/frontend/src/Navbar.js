import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div class="ui secondary pointing menu">
                <Link to="/" className="item">
                    Chatter
                </Link>
                <Link to="/thread/new" className="item">
                    Ask
                </Link>
            <div class="right menu">
                <Link to="/" className="ui item">
                    User_Name
                </Link>
                <Link to="" className="ui item">
                    Logout
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Navbar;