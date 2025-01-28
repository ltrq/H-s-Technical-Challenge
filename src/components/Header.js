import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useCart } from "./CartContext"; 
import { useUser } from "./userContext"; 
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const { user, logout } = useUser(); 

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout(); 
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-link" style={{ fontWeight: "bold" }}>
            Ecommerce
          </Link>
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          <Link to="/stories" className="nav-link">
            Stories
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <form className="search-box" onSubmit={handleSearch}>
            <button type="submit">
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
        </div>

        <div className="header-icons">
          {/* Cart Icon */}
          <div className="cart-icon-container">
            <Link to="/cart" className="icon-link cart-icon">
              <FaShoppingCart />
              <span className="cart-item-count">
                {cartItems.length > 0 ? getTotalItems() : " "}
              </span>
            </Link>
          </div>

          <div className="user-icon-container">
            {user ? (
              <button
                onClick={handleLogout} 
              >
                <FaUser />
              </button>
            ) : (
              <Link to="/login" className="icon-link" style={{ textDecoration: "none" }}>
                <button className="login-btn">Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
