import React from 'react'
import './Hero.css'
import hero_image from '../assets/Convert to PNG project (1) (1).png'
import arrow_img from '../assets/output-onlinepngtools.png'

import { useNavigate } from 'react-router-dom'; // <-- import here

export const Hero = () => {
    const navigate = useNavigate();

  // This function handles the click event
  const handleClick = () => {
    navigate('/women');
  };
  return (
    <div className='hero'>
        <div className='hero-left'>
            <div>
                
                <p>Latest</p>
                
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <button className='hero-latest-button' onClick={handleClick}>
                <div>NEW ARRIVALS</div>
                <img src={arrow_img} alt=""/>
            </button>
        </div>
        <div className='hero-right'>
            <img src={hero_image} alt=""/>
        </div>


    </div>
  )
}
export default Hero;