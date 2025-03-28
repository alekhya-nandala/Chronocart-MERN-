import React from 'react'
import './SimilarProducts.css'
import data_product from '../assets/data'
import Item from '../Item/Item'
const SimilarProducts = () => {
  return (
    <div className='similarproducts'>
        <h1>Similar Products</h1>
        <hr />
        <div className='relatedproducts-item'>
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id}  image={item.image} new_price={`$${item.new_price.toFixed(2)}`}/>
            })}
        </div>
    </div>
  )
}

export default SimilarProducts