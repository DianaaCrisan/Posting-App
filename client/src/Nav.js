import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, isEditor, logout } from './helpers';

const Nav = () => (
    <nav>
        <ul className="nav nav-tabs">
            <li className="nav-item pr-3 pt-3 pb-3">
                <Link
                    to="/"
                    onClick={() => window.location.href = "/"}
                    className="navButton">
                    Home
                </Link>
            </li>

            {isEditor() && (
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link 
                        to="/create" 
                        onClick={() => window.location = "/create"}
                        className="navButton">
                        Create
                    </Link>
                </li>
            )}

            {!getUser() && (
                <li className="nav-item ml-auto pr-3 pt-3 pb-3">
                    <Link 
                        to="/login" 
                        onClick={() => window.location = "/login"}
                        className="navButton">
                        Login
                    </Link>
                </li>
            )}

            {getUser() && (
                <li
                    onClick={() => logout(() => window.location = "/")}
                    className="nav-item ml-auto pr-3 pt-3 pb-3">
                    <p className="navButton">Logout</p>
                </li>
            )}
        </ul>
    </nav>
)

export default Nav