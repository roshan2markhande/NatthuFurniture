import React, { useState } from 'react';
import '../Styles/orderPopup.css';
import { FaTimes } from 'react-icons/fa';

const OrderPopup = ({ products = [], onClose }) => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    otp: '',
    address: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 1), 0);
  const totalPrice = products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  const handleOrder = () => {
    alert('Order Placed!');
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box order-popup">
        <div className="popup-header">
  <h3>Complete Your Order</h3>
  <button onClick={onClose} className="close-bt111"><FaTimes /></button>
</div>
        

        <div className="popup-content">
          {/* Left: Order Summary */}
          <div className="order-summary">
            <h4>Order Summary</h4>
            {products.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="order-product-list">
                {products.map((product, idx) => (
                  <li key={idx} className="order-product-item">
                    <div className="product-name">{product.name}</div>
                    <div className="product-qty">Qty: {product.quantity || 1}</div>
                    <div className="product-price">₹{product.price.toFixed(2)}</div>
                    <div className="product-subtotal">
                      ₹{(product.price * (product.quantity || 1)).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="order-bill-summary">
              <div><strong>Total Quantity:</strong> {totalQuantity}</div>
              <div><strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}</div>
            </div>
          </div>

          {/* Right: Order Form */}
          <div className="order-form">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
            />
            <button className="verify-btn">Send OTP</button>
            <input
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
            />
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Any specific requirement?"
              value={form.description}
              onChange={handleChange}
            />
            <button className="order-now-btn" onClick={handleOrder}>Order Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
