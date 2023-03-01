import React, { useEffect, useState } from "react";
import "../css/form.css";
import { useAlertContext } from "../context/alertContext";
import { useNavigate, NavLink } from "react-router-dom";

const Signup = (props) => {
  const { showAlert } = useAlertContext();
  let navigate = useNavigate();

  useEffect(() => {
    props.setShowNav(false);
    if(localStorage.getItem('token')){
      navigate("/");
    }
  });
  

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profImg: ""
  });
  console.log(credentials.profImg, 12);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const { firstName, lastName, email, password, confirmPassword, profImg } = credentials;

  const formData = new FormData();
  formData.append('first_name', firstName);
  formData.append('last_name', lastName);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('profImg', profImg);

  const signupUser = async () => {
    if (firstName.length < 3) {
      showAlert("First Name must be atleast 3 characters long", "error");
    } else if (lastName.length < 3) {
      showAlert("Last Name must be atleast 3 characters long", "error");
    } else if (!email.match(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/)) {
      showAlert("Email is Invalid", "error");
    } else if (password.length < 6) {
      showAlert("Password must be atleast 6 characters long", "error");
    } else if (password !== confirmPassword) {
      showAlert("Passwords do not match", "error");
    } else if (!profImg) {
      showAlert("Please select your profile photo to proceed.", "error");
    } else {
      const response = await fetch("http://localhost:6001/api/v1/auth/signup", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      console.log(json);
      if (json.success === false) {
        showAlert("Email already in use. Please use a different email address", "error");
      } else {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        showAlert("Congratulations! You have successfully signed up.", "success");
        navigate('/');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mx-1 mx-md-0 py-4">
        <form className="col-md-6 p-0 text-center" encType="multipart/form-data">
          <div className="d-flex flex-wrap justify-content-between mt-5">
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
          <div className="inputBox mb-3">
            <input onChange={(e)=> setCredentials({ ...credentials, profImg: e.target.files[0] })} name="profImg" type="file" required />
            {/* <span>Upload Profile Image</span> */}
            <i></i>
          </div>
          <button type="button" onClick={() => {
              signupUser();
            }} className="btn-color py-2 px-4 mt-3">Sign Up</button>
          <p className="mt-4 switcher">Already have an account? <NavLink to="/login">Login</NavLink></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
