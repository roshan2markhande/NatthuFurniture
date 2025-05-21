import React from 'react';

const UIControls = ({ categories, selectedCategory, onCategoryChange, selectedColor, onColorChange }) => (
  <div style={{ padding: '1rem', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
    <h3>Customize Furniture</h3>

    <label>Choose Category:</label>
    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    <label>Choose Color:</label>
    <input type="color" value={selectedColor} onChange={(e) => onColorChange(e.target.value)} />
  </div>
);

export default UIControls;
