import React from 'react'
import './header.css'
import { Link, NavLink } from 'react-router'
import axios from 'axios';
import { useEffect, useState } from 'react';

function Header() {
  
  const [cart,setCart] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/api/cart-items')
  .then((response)=>{
    console.log(response.data);
    setCart(response.data)
  })
  },[])



  let totalQuantity = 0;
  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity
  });
  console.log(totalQuantity);
  
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img
            className="logo"
            src="/images/logo-white.png"
            alt="Logo"
          />

          <img
            className="mobile-logo"
            src="/images/mobile-logo-white.png"
            alt="Logo"
          />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
        />

        <button className="search-button">
          <img
            className="search-icon"
            src="/images/icons/search-icon.png"
            alt="Search"
          />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img
            className="cart-icon"
            src="/images/icons/cart-icon.png"
            alt="Cart"
          />

          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Header
