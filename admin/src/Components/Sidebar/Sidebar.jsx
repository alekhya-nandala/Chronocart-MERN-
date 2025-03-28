import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product from "../../assets/icons8-add-product-50.png"
import product_list from "../../assets/icons8-products-pile-50.png"
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} stylr={{textDecoration:"none"}}>
           <div className='sidebar-item'>
            <img src={add_product} alt=""/>
            <p>Add Product</p>

           </div>
        
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
           <div className='sidebar-item'>
            <img src={product_list} alt=""/>
            <p>Product List</p>
           </div>
        
        </Link>
    </div>
  )
}

export default Sidebar