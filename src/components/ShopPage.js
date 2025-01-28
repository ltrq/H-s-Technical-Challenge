import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./ShopPage.css";
const API_URL = process.env.REACT_APP_BASEROW_API_URL;
const API_TOKEN = process.env.REACT_APP_BASEROW_API_TOKEN;

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  const CategoryIDFilter = ["shoes", "equipment", "jackets", "fleece", "sweatshirts", "hoodies", "sweaters", "shirts", "tshirts", "pants", "jeans"];
  const CategoryIDFilterTop = ["jackets", "fleece", "sweatshirts", "hoodies", "sweaters", "shirts", "tshirts", "pants", "top", "tops", "Jackets", "Fleece", "Sweatshirts", "Hoodies", "Sweaters", "Shirts", "T-Shirts"];
  const CategoryIDFilterBottom = ["pants", "jeans", "bottom", "bottoms", "Pants", "Jeans"];
  const CategoryIDFilterShoes = ["shoes"];
  const CategoryIDFilterEquipment = ["equipment"];
  const SubCategoryIDFilter = ["women", "men", "kids"];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            'Authorization': `Token ${API_TOKEN}`, 
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.results); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product, index, self) => {
    let matchesSearchQuery = false;

    if (searchQuery) {
      if (SubCategoryIDFilter.includes(searchQuery)) {
        let subFilterno;
        if (searchQuery === "men") { subFilterno = 1; }
        else if (searchQuery === "women") { subFilterno = 2; }
        else if (searchQuery === "kids") { subFilterno = 3; }

        matchesSearchQuery = product.SubCategoryID.includes(subFilterno);
      } else if (CategoryIDFilter.includes(searchQuery) || CategoryIDFilterTop.includes(searchQuery) || CategoryIDFilterBottom.includes(searchQuery)) {
        let catFilterno;
        if (CategoryIDFilterTop.includes(searchQuery)) {
          catFilterno = 1;
        } else if (CategoryIDFilterBottom.includes(searchQuery)) {
          catFilterno = 2;
        } else if (CategoryIDFilterShoes.includes(searchQuery)) {
          catFilterno = 4;
        } else if (CategoryIDFilterEquipment.includes(searchQuery)) {
          catFilterno = 3;
        }
        matchesSearchQuery = product.CategoryID.includes(catFilterno);
      } else {
        matchesSearchQuery =
          product.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.Description.toLowerCase().includes(searchQuery.toLowerCase());
      }
    } else {
      matchesSearchQuery = true; 
    }

    let matchesCategory = false;

    if (selectedCategories.length === 0 || selectedCategories.some((category) => {
      if (CategoryIDFilterTop.includes(category)) {
        return product.itemName.toLowerCase().includes("top"); 
      } else if (CategoryIDFilterBottom.includes(category)) {
        return product.itemName.toLowerCase().includes("bottom"); 
      } else if (CategoryIDFilterShoes.includes(category)) {
        return product.itemName.toLowerCase().includes("shoes");
      } else if (CategoryIDFilterEquipment.includes(category)) {
        return product.CategoryID.includes(3); 
      } else {
        return product.itemName.toLowerCase().includes(category.toLowerCase());
      }
    })) {
      matchesCategory = true;
    }

    const matchesColor = selectedColors.length === 0 || selectedColors.some(color =>
      product.Color?.toLowerCase().includes(color.toLowerCase()) 
    );

    // const isUnique = self.findIndex((p) => p.itemName === product.itemName) === index;

    return matchesSearchQuery && matchesCategory && matchesColor;
  });


  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value)
    );
  };

  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    setSelectedColors((prevColors) =>
      checked ? [...prevColors, value] : prevColors.filter((color) => color !== value)
    );
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex" , minHeight: "55vh"}} className="shop-page">
        <div style={{ width: "30%" }} className="filter-bar">
          <h3>Filters</h3>
          <div>
            <h4>Categories</h4>
            <div className="category-checkboxes">
              {["Jackets", "Fleece", "Sweatshirts", "Hoodies", "Sweaters", "Shirts", "T-Shirts", "Pants", "Jeans", "Shoes", "Equipment"].map((category) => {
                const categoryWithoutS = category.toLowerCase().replace(/s$/, ''); 
                return (
                  <label key={category}>
                    <input
                      type="checkbox"
                      value={categoryWithoutS} 
                      onChange={handleCategoryChange}
                    />
                    {category}
                  </label>
                );
              })}
            </div>
          </div>
          <h4>Colors</h4>
          <div className="color-checkboxes">
            {["black", "red", "blue", "gray", "white", "green"].map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  value={color}
                  onChange={handleColorChange}
                />
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div style={{ width: "70%" }} className="product-container">
          <div className="product-sort">
            <p>Total Products Found: {filteredProducts.length}</p>
          </div>
          <div className="product-list">
            {loading ? (
              <p>Loading products...</p>  
            ) : filteredProducts.length > 0 ? (
              <div className="product-grid">
                {[...new Map(filteredProducts.map((product) => [product.itemName, product])).values()].map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.itemName.toLowerCase().replace(/\s+/g, "-")}`} 
                    className="product-item-link"
                  >
                    <div className="product-item">
                      <p className="product-description">{product.Description}</p>
                      
                    </div>
                    <div className="product-footer">
                        <h4>{product.itemName}</h4>
                        <p>${product.Price}</p>
                      </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No products found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
