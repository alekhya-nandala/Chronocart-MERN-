import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo.png'
import inst from '../assets/instagram.png'
import pin from '../assets/pinterest.png'
import wa from '../assets/whatsapp (1).png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footerlogo'>
            <img src={footer_logo} alt="" height={80}/>
            <p>ChronoCart</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='footer-soc'>
            <div className='footer-icon-cont'>
                <img src={inst} alt=""height={20}/>
            </div>
            <div className='footer-icon-cont'>
                <img src={pin} alt=""height={20}/>
            </div>
            <div className='footer-icon-cont'>
                <img src={wa} alt=""height={20}/>
            </div>
        </div>
        <div className='footer-copy'>
            <hr />
            <p>Copyright @ 2022 - All Rights Reserved</p>

        </div>
        
    </div>
  )
}

export default Footer;