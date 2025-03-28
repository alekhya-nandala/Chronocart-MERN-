import React, { useState } from 'react';
import './AddProducts.css';
import urlim from '../../assets/url.png';

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  // Handle changes for all input fields
  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Add product submission handler (if needed)
  const Add_Product = async () => {
    console.log(productDetails);
    
    let responseData;
    // Make a copy of your product details
    let product = { ...productDetails };
  
    // Send the image URL to your backend route (instead of FormData)
    await fetch('http://localhost:4000/upload-url', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', // Important for JSON body
      },
      // Pass the image URL in JSON
      body: JSON.stringify({ imageUrl: product.image }),
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
  
    // If the backend indicates success, use the returned image URL
    if (responseData?.success) {
      // For example, if the server returns a modified or validated URL
      product.image = responseData.imageUrl;
      console.log(product);
  
      // Now send the entire product to your add product endpoint
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success
            ? alert('Product Added Successfully')
            : alert('Product Not Added');
        })
        .catch((err) => {
          console.error('Error adding product:', err);
        });
    } else {
      console.error('Error uploading image URL:', responseData);
      alert('Image upload failed. Please check your URL or server logs.');
    }
  };
  

  return (
    <div className="addproducts">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          placeholder="Type Here"
          value={productDetails.name}
          onChange={changeHandler}
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={changeHandler}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={changeHandler}
          />
        </div>
      </div>

      <br />

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Mens</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <br />

      <div className="imageurlinput">
        <div className="addproduct-itemfield">
          <p>Image URL</p>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productDetails.image}
            onChange={changeHandler}
          />
          <div>
            {productDetails.image ? (
              <img
                src={productDetails.image}
                className="addproduct-url"
                alt="Product Preview"
              />
            ) : (
              <img
                src={urlim}
                className="addproduct-url"
                alt="Placeholder"
              />
            )}
          </div>
        </div>
      </div>

      <br />
      <br />

      <div>
        <button onClick={()=>{Add_Product()}}className="addproduct-btn" >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
