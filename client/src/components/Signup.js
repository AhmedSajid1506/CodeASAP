import React from "react";
import '../css/form.css';

const Signup = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center mx-1 mx-md-0 py-4">
      <form action="" method="POST" className="col-md-6 p-0 text-center">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="inputBox col-12 col-md-5 mb-3">
            <input type="text" required />
            <span>First Name</span>
            <i></i>
          </div>
          <div className="inputBox col-12 col-md-5 mb-3">
            <input type="text" required />
            <span>Last Name</span>
            <i></i>
          </div>
        </div>
        <div className="inputBox mb-3">
          <input type="text" required />
          <span>Email</span>
          <i></i>
        </div>
        <div className="inputBox mb-3">
          <input type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        <div className="inputBox mb-3">
          <input type="password" required />
          <span>Confirm Password</span>
          <i></i>
        </div>
        <button type="button" className="btn-color py-2 px-4 mt-2">Sign Up</button>
      </form>
      </div>
    </div>
  );
};

export default Signup;
