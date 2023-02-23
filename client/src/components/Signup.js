import React, { useState } from "react";
import "../css/form.css";
import { useAlertContext } from "../context/alertContext";

const Signup = () => {
  const { showAlert } = useAlertContext();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const { firstName, lastName, email, password, confirmPassword } = credentials;

  const signupUser = async () => {
    if (firstName.length < 3) {
      showAlert("First Name must be atleast 3 characters long", "error");
    } else if (lastName.length < 3) {
      showAlert("Last Name must be atleast 3 characters long", "error");
    } else if (!email.match(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/)) {
      showAlert("Last Name must be atleast 3 characters long", "error");
    } else if (password.length < 6) {
      showAlert("Password must be atleast 6 characters long", "error");
    } else if (password !== confirmPassword) {
      showAlert("Passwords do not match", "error");
    } else {
      const response = await fetch("http://localhost:6001/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.success === false) {
        showAlert("Email already in use. Please use a different email address", "error");
      } else {
        showAlert("Congratulations! You have successfully signed up.", "success");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mx-1 mx-md-0 py-4">
        <form className="col-md-6 p-0 text-center">
          <div className="d-flex flex-wrap justify-content-between">
            <div className="inputBox col-12 col-md-5 mb-3">
              <input
                value={credentials.firstName}
                onChange={onChange}
                name="firstName"
                type="text"
                required
              />
              <span>First Name</span>
              <i></i>
            </div>
            <div className="inputBox col-12 col-md-5 mb-3">
              <input
                value={credentials.lastName}
                onChange={onChange}
                name="lastName"
                type="text"
                required
              />
              <span>Last Name</span>
              <i></i>
            </div>
          </div>
          <div className="inputBox mb-3">
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
          <div className="inputBox mb-3">
            <input value={credentials.confirmPassword} onChange={onChange} name="confirmPassword" type="password" required />
            <span>Confirm Password</span>
            <i></i>
          </div>
          <button type="button" onClick={() => {
              signupUser(firstName, lastName, email, password);
            }} className="btn-color py-2 px-4 mt-3">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
