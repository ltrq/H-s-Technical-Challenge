import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero1 from "../components/Hero1";
import Hero2 from "../components/Hero2";
import "../components/main.css";

const HomePage = () => {
  return (
    <div className="main-wrapper">
      <Header />
      <main>
        <Hero1 />
        <Hero2 />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
