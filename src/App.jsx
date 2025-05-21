import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import FurnitureCustomizer from './pages/CustomizePage';
import Login from './components/AdminLogin';
import Categories from './pages/Category';
import MainPage from './pages/MainPage'

const App = () => {
  const location = useLocation();
  const scrollTo = location.state?.scrollTo || null;

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Cart state with initial load from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsAdminLoggedIn(true);
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminLoggedIn(false);
    
  };
  const addToCart = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item._id === product._id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
     
    });
     alert(`${product.name} added to cart!`);
  };
  return (
    <>
      <Navbar
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
        cart={cart}
        setCart={setCart}
      />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<MainPage scrollTo={scrollTo} cart={cart} setCart={setCart} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          {/* <Route path="/caterories" element={<Categories />} /> */}
          <Route path="/caterories" element={<Categories addToCart={addToCart} />} />
          <Route path="/customize" element={<FurnitureCustomizer />} />
          <Route
            path="/admin"
            element={
              isAdminLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              isAdminLoggedIn ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
