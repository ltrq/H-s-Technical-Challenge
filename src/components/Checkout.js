import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Header from "./Header";
import "./Checkout.css";

const Checkout = () => {
  const [step, setStep] = useState(0);
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 2) {
      dispatch({ type: "CLEAR_CART" });

      alert("Payment Successful");
      navigate("/");
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="step-indicator">
          <p>Step {step + 1} of 3</p>
        </div>

        <div className="checkout-steps">
          {step === 0 && <div>Address Step</div>}
          {step === 1 && <div>Shipping Method Step</div>}
          {step === 2 && <div>Payment Step</div>}
        </div>

        <div className="step-buttons">
          <button onClick={handlePrevious} className="prev-step-btn" disabled={step === 0}>
            Previous Step
          </button>
          <button onClick={handleNext} className="next-step-btn">
            {step === 2 ? "Complete Payment" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
