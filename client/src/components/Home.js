import React, { useEffect } from 'react';
import '../css/home.css'

const Home = (props) => {

  useEffect(() => {
    props.setShowNav(true);
  })

  return (
    <div className="container-fluid bg-header p-5">
      <header>
        <div className="col-5 text-center p-5">
          <h1 className='heading'>Code<br /><span className='f-primary'>ASAP</span></h1>
          <p className='fw-bold'>Here you can find codes in<br /><span className='fs-14 fw-normal'>HTML, CSS, JS and lots more.</span></p>
        </div>
        <form action="">
        <div className="inputBox col-12 col-md-5 mb-3">
          <input
            name="search"
            type="text"
            autoComplete='off'
            required
          />
          <span>Search</span>
          <i></i>
        </div>
      </form>
    </header>
    </div >
  )
}

export default Home