import React, {useContext} from 'react';
import {ShopContext} from '../context/ShopContext';
import {useParams} from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrums.jsx';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import SimilarProducts from '../components/SimilarProducts/SimilarProducts';
const Product = () => {
  const{all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const product= all_product.find((e)=> e.id === Number(productId));

  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <SimilarProducts/>
    </div>
  )
}

export default Product