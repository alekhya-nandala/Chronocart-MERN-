import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';
import drop_icon from '../components/assets/down-arrow.png'

const ShopCategory = (props) => {
  const {all_product}=useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img className="shopcategory_banner"src={props.banner} alt="" />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-10 </span>out of 30 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={drop_icon} alt="" height={20}/>

        </div>
      </div>
      <div className='shopcategory-products'>
        {all_product.map((item,i)=>{
          if (props.category===item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={`$${item.new_price.toFixed(2)}`}old_price={`$${item.old_price.toFixed(2)}`} />

          }
          else{
            return null;
          }
        })}

      </div>
      <div className='shopcategory-loadmore'>
        Explore More

      </div>
    </div>

  )
}

export default ShopCategory