import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom"; 
import { useCart, ACTIONS } from "./CartContext"; 
import "./Product1.css";

const API_URL = process.env.REACT_APP_BASEROW_API_URL;
const API_TOKEN = process.env.REACT_APP_BASEROW_API_TOKEN;

const Product1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [sizeColorMap, setSizeColorMap] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Token ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const filteredProducts = data.results.filter((product) => {
            if (product.itemName) {
              const normalizedProductName = product.itemName.toLowerCase().replace(/\s+/g, "-");
              const normalizedId = id.toLowerCase();
              return normalizedProductName === normalizedId;
            }
            return false;
          });

          if (filteredProducts.length > 0) {
            setProducts(filteredProducts);

            const sizeColorMap = {};
            filteredProducts.forEach((product) => {
              const { ItemSize: size, Color: color } = product;

              if (!sizeColorMap[size]) {
                sizeColorMap[size] = new Set();
              }
              sizeColorMap[size].add(color);

              if (!sizeColorMap[color]) {
                sizeColorMap[color] = new Set();
              }
              sizeColorMap[color].add(size);
            });

            setSizeColorMap(sizeColorMap);
          } else {
            setError("Product not found");
          }
        } else {
          setError("No products available");
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const allSizes = [...new Set(products.map((product) => product.ItemSize))];
  const allColors = [...new Set(products.map((product) => product.Color))];

  const filteredColors = selectedSize ? Array.from(sizeColorMap[selectedSize] || []) : allColors;
  const filteredSizes = selectedColor ? Array.from(sizeColorMap[selectedColor] || []) : allSizes;

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  const handleColorClick = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color before adding to the cart!");
      return;
    }

    if (products.length > 0) {
      const product = products[0];

      dispatch({
        type: ACTIONS.ADD_ITEM,
        payload: {
          id: product.id,
          name: product.itemName,
          price: product.Price,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
          image: product.image, 
        },
      });

      alert(`${product.itemName} has been added to the cart!`);
    }
  };


  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color before adding to the cart!");
      return;
    }
    handleAddToCart(); 
    navigate("/cart"); 
  };

  return (
    <div>
      <Header />
      <div className="item-details">
        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          <div className="item-container">
            <div
              className="item-image"
              style={{
                width: "450px",
                height: "450px",
                backgroundColor: selectedColor || "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                fontSize: "24px",
                color: selectedColor ? "#fff" : "#000",
              }}
            >
              {selectedSize ? selectedSize.charAt(0).toUpperCase() : "ThumbNail"}
            </div>
            <div className = "item-info">
              <h2>{products[0].itemName}</h2>
              <p>
                <strong>${products[0].Price}</strong>
              </p>
              <p>{products[0].Description}</p>

              <div>
                <div className="filter-buttons">
                  {allSizes.map((size, index) => (
                    <button
                      key={index}
                      disabled={selectedColor && !filteredSizes.includes(size)}
                      onClick={() => handleSizeClick(size)}
                      className={size === selectedSize ? "selected" : ""}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="filter-buttons">
                  {allColors.map((color, index) => (
                    <button
                      key={index}
                      disabled={selectedSize && !filteredColors.includes(color)}
                      onClick={() => handleColorClick(color)}
                      className={color === selectedColor ? "selected" : ""}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={handleAddToCart} className="add-to-cart">
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="buy-now">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product1;
