import React, { useState, useEffect } from "react";
import "../css/form.css";
import { useAlertContext } from "../context/alertContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = (props) => {
  const { showAlert } = useAlertContext();
  let navigate = useNavigate();

  useEffect(() => {
    props.setShowNav(false);
    if(localStorage.getItem('token')){
      navigate("/");
    }
  });

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const { email, password } = credentials;

  const loginUser = async () => {
    if (!email.match(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/)) {
      showAlert("Enter a valid email", "error");
    } else if (!password.length) {
      showAlert("Please Enter Your Password", "error");
    } else {
      const response = await fetch("http://localhost:6001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.success === false) {
        showAlert("The account you are trying to log into does not exist.", "error");
      } else if (json.success === "falsee") {
        showAlert("The email or password is incorrect.", "error");
      } else {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        localStorage.setItem('email', credentials.email);
        showAlert("Welcome back! Login successful.", "success");
        navigate('/');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mx-1 mx-md-0 py-4">
        <form className="col-md-5 p-0 text-center">
          <div className="inputBox mb-3 mt-5">
            <input
              value={credentials.email}
              onChange={onChange}
              name="email"
              type="text"
              required
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputBox mb-3">
            <input
              value={credentials.password}
              onChange={onChange}
              name="password"
              type="password"
              required
            />
            <span>Password</span>
            <i></i>
          </div>
          <button type="button" onClick={() => {
              loginUser(email, password);
            }} className="btn-color py-2 px-4 mt-3">Login</button>
          <p className="mt-4 switcher">Don't have an account? <NavLink to="/signup">Signup</NavLink></p>
        </form>
      </div>
    </div>
  )
}

export default Login