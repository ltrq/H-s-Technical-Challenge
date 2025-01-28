import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './E404.css'; 

const E404 = () => {
  return (
    <div className="e404-page">
      <Header />
      <div className="e404-content">
        <div>Oops! Page Not Found</div>
        <Link to="/">Home</Link>
      </div>
      <Footer />
    </div>
  );
};

export default E404;
