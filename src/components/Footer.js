import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-signup">
          <h3>Sign Up for Our Newsletter</h3>
          <p>Be the first to know about our special offers, new products launches, and events.</p>
          <div className="newsletter-container">
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email Address"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>


        <div className="footer-columns">
          <div className="footer-section">
            <h3>Shop</h3>
            <div className="footer-links">
              <Link to="/shop?search=women">Women's</Link>
              <Link to="/shop?search=men">Men's</Link>
              <Link to="/shop?search=kids">Kids'</Link>
              <Link to="/shop?search=shoes">Shoes</Link>
              <Link to="/shop?search=equipment">Equipment</Link>
              <Link to="/shop?search=activity">By Activity</Link>
              <Link to="/shop?search=giftcards">Giftcards</Link>
              <Link to="/shop?search=sale">Sale</Link>
            </div>
          </div>
          <div className="footer-section">
            <h3>Help</h3>
            <div className="footer-links">
              <Link to="/help">Help Center</Link>
              <Link to="/order-status">Order Status</Link>
              <Link to="/size-chart">Size Chart</Link>
              <Link to="/returns-warranty">Returns & Warranty</Link>
              <Link to="/contact-us">Contact Us</Link>
            </div>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <div className="footer-links">
              <Link to="/about">About Us</Link>
              <Link to="/responsibility">Responsibility</Link>
              <Link to="/technology-innovation">Technology & Innovation</Link>
              <Link to="/stories">Explore Our Stories</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
