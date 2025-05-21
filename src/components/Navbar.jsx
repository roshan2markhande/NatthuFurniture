import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import furnitureIcon from '../assets/furniture_icon.png';
import Cart from '../pages/Cart';

const Navbar = ({ isAdminLoggedIn, onLogout, cart, setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Remove product from cart by index
  const handleRemoveProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setIsMobileMenuOpen(false); // close mobile menu if open
    setShowCart((prev) => !prev);
  };

  // Scroll to section logic
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(sectionId), 100);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={furnitureIcon} alt="Logo" className="navbar-icon" />
          <h1 className="navbar-title">Natthu Furniture Mart</h1>
        </div>

        <div className={`navbar-right ${isMobileMenuOpen ? 'open' : ''}`}>
          <button className="nav-link" onClick={() => handleNavClick('home')}>
            Home
          </button>
          <button className="nav-link" onClick={() => handleNavClick('about')}>
            About
          </button>
          <button className="nav-link" onClick={() => handleNavClick('contact')}>
            Contact
          </button>
          <button className="nav-link" onClick={() => handleNavClick('order')}>
            Order
          </button>
          <Link
            to="/customize"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Customize
          </Link>
          <Link
            to="/caterories"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Categories
          </Link>

          {isAdminLoggedIn ? (
            <>
              <Link
                to="/admin/dashboard"
                className="nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="nav-link"
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}

          {/* Cart Icon */}
          <button className="nav-link cart-icon-btn" onClick={toggleCart}>
            <FaShoppingCart size={20} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
        </div>

        {/* Hamburger Button */}
        <div
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      {/* Cart popup */}
      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          products={cart}
          onRemoveProduct={handleRemoveProduct}
        />
      )}
    </>
  );
};

export default Navbar;
