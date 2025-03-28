import React,{ useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../assets/icons8-star-25.png';
import star_dull from '../assets/icons8-star-25 (1).png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {
    const{product}=props;
    const{addToCart}=useContext(ShopContext);


  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image} alt=""/>
            </div>


        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-star'>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_dull} alt=""/>
                <p>(122)</p>
            </div>
            <div className='productdisplay-right-prices'>
                <div className='productdisplay-right-price-old'>${product.old_price}</div>
                <div className='productdisplay-right-price-new'>${product.new_price}</div>
            </div>
            <div className='productdisplay-right-description'>
            Inspired by classic American machinery, the Machine Chronograph commands attention with its bold knurled topring. Unmistakably masculine with a bold 44mm case housing a brushed black dial with textured details, all protected by a mineral crystal face.
            </div>
            <br></br>
            <br></br>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            
        </div>
    </div>
  )
}

export default ProductDisplay