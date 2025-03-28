import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/image.png'
import admin_profile from '../../assets/profile.png'
import down from "../../assets/icons8-dropdown-24.png"

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" />
        <img src={admin_profile} className="nav-profile"alt="" />
        <img src={down} alt="" className="nav-down"/>

    </div>
  )
}

export default Navbar