import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useCart, ACTIONS } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, dispatch } = useCart();

  const increaseQuantity = (id) => {
    dispatch({ type: ACTIONS.INCREASE_QUANTITY, payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="cart-content">
          <h1>Your Cart</h1>
          <p> Not ready to checkout? Continue Shopping</p>
          {cartItems.length === 0 ? (
            <div>Your cart is empty. <Link to="/shop">Shop now</Link></div>
          ) : (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  {/* <img src={item.image} alt={item.name} className="cart-item-image" /> */}
                  <div
                    style={{
                      height: 100,
                      width: 100,
                      background: `${item.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="cart-item-image"
                  >
                    {item.size}
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>

                  </div>
                  <div className="remove-button-container">
                    <button onClick={() => removeItem(item.id)} className="remove-button">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        <div className="cart-summary-container">
          <h3>Order Summary</h3>
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <div className="coupon-code-container">
                <input
                  type="text"
                  placeholder="Enter coupon code here"
                  className="coupon-code-input"
                />
              </div>

              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${calculateTotal()}</span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">Calculated at the next step</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span className="summary-label">Total</span>
                <span className="summary-value">${calculateTotal()}</span>
              </div>

              <div className="cart-actions">
                <Link to="/checkout" className="checkout-button">
                  Continue to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
