import React, { useEffect } from 'react'

const Home = (props) => {
  
  useEffect(() => {
    props.setShowNav(true);
  })
  
  return (
    <div>Home</div>
  )
}

export default Home