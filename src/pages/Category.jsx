import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductQuickViewModal';
import '../Styles/category.css';

const Category = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (filters) => {
    let filtered = [...products];

    if (filters.price?.length === 2) {
      filtered = filtered.filter(
        (p) => p.price >= filters.price[0] && p.price <= filters.price[1]
      );
    }
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((p) => filters.type.includes(p.catg));
    }
    if (filters.bestseller) {
      filtered = filtered.filter((p) => p.bestseller);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="category-page">
      <h2>Explore Our Furniture</h2>

      <div className="category-container">
        <Filters onFilter={handleFilter} products={products} />

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onViewDetails={() => setSelectedProduct(product)}
              />
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => addToCart(selectedProduct)}
        />
      )}
    </div>
  );
};

export default Category;
