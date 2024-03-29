import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../state/actions/authActions';

export default function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            UniSA Clinic
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/feedbacks">
                  Feedbacks
                </Link>
              </li>         
            </ul>
            <div>
            <Link className="nav-link active" aria-current="page" to="/login">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
