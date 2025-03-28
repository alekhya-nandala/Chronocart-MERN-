import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrum.css';
import right_arrow from '../assets/chevron.png';

const categoryToPath = (category) => {
  // Convert category string to lowercase for consistent comparison
  const lowerCategory = category.toLowerCase();

  switch (lowerCategory) {
    case 'mens':
      return '/mens';
    case 'men':  // if your product.category might be "men" instead of "mens"
      return '/mens';
    case 'women':
      return '/women';
    case 'kids':
      return '/kids';
    default:
      return '/'; // fallback if the category is something else
  }
};

const Breadcrums = ({ product }) => {
  return (
    <div className="breadcrum">
      {/* Link to Home */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        HOME
      </Link>
      <span className="arrow">›</span>

      {/* Link to Shop */}
      
        SHOP
      
      <span className="arrow">›</span>

      {/* Link to the product's category */}
      <Link
        to={categoryToPath(product.category)}
        style={{ textDecoration: 'none' }}
      >
        {product.category}
      </Link>
      <span className="arrow">›</span>

      {/* The product name (not linked) */}
      {product.name}
    </div>
  );
};

export default Breadcrums;
