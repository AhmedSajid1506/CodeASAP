import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../img/CodeASAP.png";
import userIcon from "../img/user.png";
import { useUserContext } from "../context/userContext";

const Navbar = () => {
  const [showDiv, setShowDiv] = useState(false);
  const { user, getUser } = useUserContext();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
  })
  

  const userDiv = useRef();
  const userIconToggler = () => {
    if (showDiv === false) {
      setShowDiv(true);
      userDiv.current.classList.remove("d-none");
    } else {
      setShowDiv(false);
      userDiv.current.classList.add("d-none");
    }
  };

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("token", "email");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand m-0" href="/">
          <img src={logo} alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="d-flex justify-content-between align-items-center me-2">
              {!localStorage.getItem("token") ? (
                <div>
                  <NavLink to="./login">
                    <button type="button" className="btn-color me-3 px-4 py-2">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="./signup">
                    <button type="button" className="btn-color px-4 py-2">
                      Signup
                    </button>
                  </NavLink>
                </div>
              ) : (
                <div>
                  <img
                    src={userIcon}
                    className="userIcon"
                    alt="userIcon"
                    onClick={userIconToggler}
                  />
                  <div className="userDiv p-3 d-none" ref={userDiv}>
                    <div className="d-flex align-items-center fs-14">
                      <img
                        src={userIcon}
                        className="userIcon me-2"
                        alt="userIcon"
                      />
                      <div>
                        <p>{user.first_name + " " + user.last_name}</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="fs-14">
                      <div className="d-flex align-items-center">
                        <i className="fa-solid fa-gear me-3 icon"></i>
                        <p>Profile Settings</p>
                      </div>
                    </div>
                    <hr />
                      <button
                        type="button"
                        className="btn-color px-4 py-2 col-12"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
