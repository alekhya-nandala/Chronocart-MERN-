import React from 'react'
import './Offers.css'
import exclusive_image from '../assets/exc.png'
import { useNavigate } from 'react-router-dom';
const Offers = () => {
  const navigate = useNavigate();

  // This function handles the click event
  const handleClick = () => {
    navigate('/mens');
  };
  return (
    <div className="offers">
        <div className='offers-left'>
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <button onClick={handleClick}>Check Now</button>
        </div>
        <div className='offers-right'>
            <img src={exclusive_image} alt=""/>
        </div>
    </div>
  )
}

export default Offers