import React, { useState } from 'react';
import '../Styles/ProductQuickViewModal.css';

const ProductQuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const images = product.imagesPath || [product.imagePath]; // fallback if single image

  const nextImage = () => setImgIndex((i) => (i + 1) % images.length);
  const prevImage = () => setImgIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>×</span>

        <div className="modal-body">
          {/* Left side: Image and buttons below it */}
          <div className="modal-image-section">
            <img src={images[imgIndex]} alt="product" className="modal-image" />
            <div className="modal-image-nav">
              <button onClick={prevImage} className="nav-btn">&lt; Prev</button>
              <button onClick={nextImage} className="nav-btn">Next &gt;</button>
            </div>
          </div>

          {/* Right side: Product details */}
          <div className="modal-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>

            <div className="modal-actions">
              <button onClick={() => onAddToCart(product)} className="cart-btn">Add to Cart</button>
              <a
                href={`https://wa.me/91XXXXXXXXXX?text=I'm interested in: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="order-btn"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
