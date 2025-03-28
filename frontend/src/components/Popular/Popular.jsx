import React from 'react'
import './Popular.css'
import data_product from '../assets/data'
import Item from '../Item/Item'

const Popular = () => {
  return (
    <div className='popular'>
        <h1>POPULAR & IN SALE</h1>
        <hr />
        <div className='popular-item'>
            {data_product.map((item,i)=>{
                return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={`$${item.new_price.toFixed(2)}`}
                old_price={`$${item.old_price.toFixed(2)}`}/>       })}
        </div>

    </div>
  )
}

export default Popular;