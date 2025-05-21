import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ImageScroller from '../components/ImageScroller';
import ProductModal from '../components/ProductQuickViewModal';

import img1 from '../assets/sofa-removebg-preview.png';
import img2 from '../assets/Aalmari.png';
import img3 from '../assets/royalbed.png';
import img4 from '../assets/chairs.png';
import img5 from '../assets/bed.png';
import img6 from '../assets/dining_table.webp';
import img7 from '../assets/singlesofa.jpg';
import img8 from '../assets/kitchen.png';

const Home = ({ scrollTo, cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-text">
          <h2>Discover Premium Furniture</h2>
          <p>
            Elevate your living space with our elegant and durable furniture.
            Whether it’s a cozy sofa for your lounge, a stylish dining table, or a royal bed – we've got you covered.
          </p>
          <ul className="hero-features">
            <li>✓ Handcrafted with premium wood</li>
            <li>✓ Custom sizes & finishes available</li>
            <li>✓ Delivered right to your doorstep</li>
          </ul>
          <div className="hero-buttons">
            <Link to="/customize">
              <button className="customize-btn">Customize Furniture</button>
            </Link>
            <Link to="/order">
              <button className="customize-btn">Order Now!</button>
            </Link>
          </div>
        </div>

        <div>
          <ImageScroller
            images={[img1, img2, img3, img4, img5, img6, img7, img8]}
          />
        </div>
      </section>

      <section id="products" className="products">
        <h3>Products</h3>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={() => setSelectedProduct(product)}
              />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default Home;
