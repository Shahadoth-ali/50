/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";



const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart,setCart]=useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


 useEffect(()=>{
   const storedCart=getShoppingCart();
   const savedCart=[];
   //get id of addedProduct
   for(const id in storedCart){
    //get product using id
    const addedProduct=products.find(product=>product.id===id);
    if(addedProduct){
      //add quantity
      const quantity=storedCart[id];
      addedProduct.quantity=quantity;
      //adding savedCart
      savedCart.push(addedProduct);
    }
    // console.log("addedProduct",addedProduct);
   }
   //set cart
   setCart(savedCart);
 },[products])

  const handleProduct=(product)=>{
    // console.log(product);
    // const newCart=[...cart,product];
    let newCart=[];
    const exists=cart.find(pd=>pd.id===product.id);
    if(!exists){
      product.quantity=1;
      newCart=[...cart,product]
    }
    else{
      exists.quantity=exists.quantity+1;
      const remaining=cart.filter(pd=>pd.id !==product.id);
      newCart=[...remaining,exists];
    }
    setCart(newCart);
    addToDb(product.id);
}



  return (
    <div className="shop-container">
      <div className="products-container">
       {
        products.map(product=><Product 
          key={product.id}
           product={product}
           handleProduct={handleProduct}
        ></Product>)
       }
      </div>
      <div className="cart-container">
       <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
