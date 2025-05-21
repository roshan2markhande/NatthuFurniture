import React, { useState } from 'react';
import '../Styles/card.css';
import { FaTimes } from 'react-icons/fa';
import OrderPopup from '../components/OrderPopup'; // import your OrderPopup here

const Cart = ({ onClose, products = [], onRemoveProduct }) => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const handlePlaceOrderClick = () => {
    if (products.length > 0) {
      setShowOrderPopup(true);
    }
  };

  const handleCloseOrderPopup = () => {
    setShowOrderPopup(false);
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-box" onClick={e => e.stopPropagation()}>
          <div className="cart-header-new">
  <h2>Your Cart ({products.length})</h2>
  <button onClick={onClose} className="cart-close-btn"><FaTimes /></button>
</div>
          <div className="cart-body">
            {products.length === 0 ? (
              <p>No items in cart yet.</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="cart-item">
                  <span>{product.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveProduct(index)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          {products.length > 0 && (
            <button className="place-order-btn" onClick={handlePlaceOrderClick}>
              Place Order
            </button>
          )}
        </div>
      </div>

      {/* Render OrderPopup when triggered */}
      {showOrderPopup && (
        <OrderPopup
          onClose={handleCloseOrderPopup}
          products={products}
        />
      )}
    </>
  );
};

export default Cart;
