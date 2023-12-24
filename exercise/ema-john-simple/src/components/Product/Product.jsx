/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import "./Product.css";

const Product = (props) => {

    const {img,name,seller,ratings,quantity,price}=props.product;
   const handleProduct=props.handleProduct;

  


  return (
    <div className='product'>
      <img src={img} alt="" />
       <div className='product-info'>
       <h6 className='product-name'>{name}</h6>
      <p>Price: ${price}</p>
      <p>Manufacturer: {seller}</p>
      <p>Rating: {ratings} Stars</p>
       </div>
      <button onClick={()=>handleProduct(props.product)} className='btn-cart'>Add to Cart</button>
    </div>
  )
}

export default Product
