import React from "react"
import { User } from "../../application/models/user";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

interface Props {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

function Navbar({user, setUser}: Props) {
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link" to="institutions">Учебные заведении</Link>
                    <a className="nav-link disabled" aria-disabled="true">{user === null ? "" : user.username}</a>
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;