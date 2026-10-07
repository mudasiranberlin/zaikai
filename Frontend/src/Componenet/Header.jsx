import React from 'react'
import './header.css'
import { Link, NavLink } from 'react-router'

function Header() {
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

          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}

export default Header
