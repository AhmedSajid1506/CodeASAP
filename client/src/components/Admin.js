import React from "react";
import { NavLink } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container mt-3">
      <div className="row bg-second px-md-5 px-2 mx-1 mx-md-0 py-4 rounded-4">
        <div className="col-6 d-flex justify-content-start align-items-center">
          <p className="fw-semibold">Add Product</p>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <NavLink to="/addproduct">
            <button className="btn-color px-4 py-2">Add Product</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Admin;
