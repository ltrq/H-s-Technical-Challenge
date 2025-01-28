import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from './components/CartContext';
import { UserProvider } from './components/userContext'; 
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import StoriesPage from "./pages/StoriesPage";
import ShopPage from "./components/ShopPage";
import Product1 from "./components/Product1";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Reviews from "./components/Reviews";
import E404 from "./components/E404";
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/stories", element: <StoriesPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/product/:id", element: <Product1 /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/login", element: <Login /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "*", element: <E404 /> },
]);

function App() {
  return (
    <CartProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </CartProvider>
  );
}

export default App;
