import React from "react";
import { Link } from "react-router-dom";
import "./Hero1.css"; 

const Hero1 = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
            <h1>Better Clothing for the Planet</h1>
        </div>
        <div className="hero-text-description">
            <p>Create sceens directly in Method or add your images from Sketch or Figma. You can even sync designs from your cloud storage!</p>
        </div>
        <div className ="hero-shop-button">
            <Link to="/shop" className="shop-button">Shop All</Link>
        </div>
      </div>
      <div className="hero-image">
        <img src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?cs=srgb&dl=pexels-pixabay-325876.jpg&fm=jpg" alt="Hero" />
      </div>
      <div className="magazine-icon">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZARPeZ2vyeQJBCZrJPVJZRaDuhmCoJ9Owqw&s" alt="Magazine" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/VOGUE_LOGO.svg" alt="Magazine" />
        <img src="https://w7.pngwing.com/pngs/983/356/png-transparent-letter-perfect-transcription-vanity-fair-logo-magazine-bazaar-text-fashion-logo.png" alt="Magazine" />
        <img src="https://banner2.cleanpng.com/20181109/gjt/kisspng-cnbc-e-flirtey-coinmint-llc-logo-of-nbc-sales-letter-franchise-chatter-5be5eb34d7f584.0319880915417946128846.jpg" alt="Magazine" />
      </div>
    </section>
  );
};

export default Hero1;
