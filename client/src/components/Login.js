import React from 'react'

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center mx-1 mx-md-0 py-4">
      <form action="" method="POST" className="col-md-5 p-0 text-center">
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
        <button type="button" className="btn-color py-2 px-4 mt-3">Login</button>
      </form>
      </div>
    </div>
  )
}

export default Login