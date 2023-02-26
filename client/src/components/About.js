import React, { useEffect } from 'react'

const About = (props) => {

  useEffect(() => {
    props.setShowNav(true);
  })

  return (
    <div>About</div>
  )
}

export default About