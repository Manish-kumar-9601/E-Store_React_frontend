 
import React, { useContext } from 'react';
import './OrderPlaced.css';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const OrderPlaced = ( ) => {
  const {state,dispatch}=useContext(CartContext);

  const {cartItems,totalPrice}=state;
    const { state: userState } = useContext(UserContext)
    const navigate=useNavigate();
    setTimeout(()=>{
navigate('/shop')
dispatch({
  type:'CLEAR_FROM_CART'
})
    },2000)
  return (
    <div className="order-placed-container">
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for your purchase. Your order number is {userState._id}.</p>
      <p>You will receive an email confirmation shortly.</p>
      <div className="order-details">
        <h2>Order Details</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - {item.qty} x ${item.price}</li>
          ))}
        </ul>
        <p>Total: Rs.{totalPrice}</p>
      </div>
    </div>
  );
};

 
