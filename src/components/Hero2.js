import React from "react";
import "./Hero2.css";

import imgLeft from "../resources/Stock_Hero2_1.jpg";
import imgCenter from "../resources/Stock_Hero2_3.jpg";
import imgRight from "../resources/Stock_Hero2_2.jpg";

const Hero2 = () => {
  return (
    <div className="hero-container2">
      <div className="img-left">
        <img src={imgLeft} alt="Hero" />
      </div>
      <div className="img-center">
        <img src={imgCenter} alt="Hero" />
      </div>
      <div className="img-right">
        <img src={imgRight} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero2;
