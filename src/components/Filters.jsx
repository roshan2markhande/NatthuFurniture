import React, { useState } from 'react';
import '../Styles/filters.css';

const Filters = ({ onFilter, products }) => {
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const uniqueTypes = [...new Set((products || []).map((p) => p.catg))];

  const handleApply = () => {
    onFilter({
      price: priceRange,
      type: selectedTypes,
      bestseller,
    });
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="filters">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Price Range:</label>
        <input
          type="range"
          min="1000"
          max="50000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([1000, parseInt(e.target.value)])
          }
        />
        <span>₹1000 - ₹{priceRange[1]}</span>
      </div>

      <div className="filter-group">
        <label>Categories:</label>
        {(uniqueTypes || []).map((type) => (
          <div key={type}>
            <input
              type="checkbox"
              value={type}
              onChange={() => handleTypeChange(type)}
            />
            <label>{type}</label>
          </div>
        ))}
      </div>

      <div className="filter-group">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label>Bestsellers Only</label>
      </div>

      <button onClick={handleApply}>Apply Filters</button>
    </div>
  );
};

export default Filters;
