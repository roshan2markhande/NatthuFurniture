// import React from 'react';

// const ProductCard = ({ product, onAddToCart }) => {
//   const { name, image, price, description } = product;

//   return (
//     <div className="product-card">
//       <img src={image} alt={name} className="product-image" />  
//       <div className="product-info">
//         <h4 className="product-name">{name}</h4>
//         {description && <p className="product-desc">{description}</p>}
//         <div className="product-footer">
//           <span className="product-price">₹{price}</span>
//           {onAddToCart && (
//             <button
//               className="add-to-cart-btn"
//               onClick={() => onAddToCart(product)}
//             >
//               Add to Cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from 'react';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const { name, imagePath, price, description } = product;

  return (
    <div className="product-card">
      <img src={imagePath} alt={name} className="product-image" />
      <div className="product-info">
        <h4 className="product-name">{name}</h4>
        {description && <p className="product-desc">{description}</p>}
        <div className="product-footer">
          <span className="product-price">₹{price}</span>

          {/* 🔍 New View Button */}
          {onViewDetails && (
            <button
              className="view-details-btn"
              onClick={() => onViewDetails(product)}
            >
              🔍 View
            </button>
          )}

          {/* ✅ Unchanged Add to Cart Button */}
          {onAddToCart && (
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
