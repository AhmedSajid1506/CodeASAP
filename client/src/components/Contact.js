import React, { useEffect } from 'react'

const Contact = (props) => {

  useEffect(() => {
    props.setShowNav(true);
  })
  
  return (
    <div>Contact</div>
  )
}

export default Contact