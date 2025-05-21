// // src/components/AddProduct.jsx
// import React, { useState } from 'react';
// import '../Styles/add-product.css';

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [catg, setCatg] = useState('');
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');

//   const token = localStorage.getItem('adminToken');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token) return alert('Not authorized');

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('price', price);
//     formData.append('description', description);
//     formData.append('catg', catg);
//     if (image) formData.append('image', image);

//     try {
//       const res = await fetch('http://localhost:5000/api/products', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('Product added successfully!');
//         setName('');
//         setPrice('');
//         setDescription('');
//         setCatg('');
//         setImage(null);
//       } else {
//         setMessage(data.message || 'Failed to add product');
//       }
//     } catch (err) {
//       setMessage('Error adding product');
//     }
//   };

//   return (
//     <div className="add-product-wrapper">
//       <h2 className="add-product-title">Add New Product</h2>
//       {message && <p className="add-product-message">{message}</p>}
//       <form onSubmit={handleSubmit} className="add-product-form">
//         <label>
//           Product Name
//           <input
//             type="text"
//             placeholder="Enter product name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="input-field"
//           />
//         </label>

//         <label>
//           Price (₹)
//           <input
//             type="number"
//             placeholder="Enter price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             min="1"
//             className="input-field"
//           />
//         </label>

//         <label>
//           Description
//           <textarea
//             placeholder="Enter product description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             rows="4"
//             className="textarea-field"
//           />
//         </label>

//         <label>
//           Category
//           <select
//             value={catg}
//             onChange={(e) => setCatg(e.target.value)}
//             required
//             className="select-field"
//           >
//             <option value="" disabled>
//               Select category
//             </option>
//             <option value="Sofa">Sofa</option>
//             <option value="Chair">Chair</option>
//             <option value="Table">Table</option>
//             <option value="Bed">Bed</option>
//           </select>
//         </label>

//         <label className="file-input-label">
//           Product Image
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             required
//             className="file-input"
//           />
//         </label>

//         <button type="submit" className="submit-btn">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
// src/components/AddProduct.jsx
import React, { useState } from 'react';
import '../Styles/add-product.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [catg, setCatg] = useState('');
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);  // <-- new state for GLB model
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Not authorized');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('catg', catg);
    if (image) formData.append('image', image);
    if (model) formData.append('model', model);  // <-- append model file

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Product added successfully!');
        setName('');
        setPrice('');
        setDescription('');
        setCatg('');
        setImage(null);
        setModel(null);  // <-- reset model
      } else {
        setMessage(data.message || 'Failed to add product');
      }
    } catch (err) {
      setMessage('Error adding product');
    }
  };

  return (
    <div className="add-product-wrapper">
      <h2 className="add-product-title">Add New Product</h2>
      {message && <p className="add-product-message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <label>
          Product Name
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </label>

        <label>
          Price (₹)
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
            className="input-field"
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="textarea-field"
          />
        </label>

        <label>
          Category
          <select
            value={catg}
            onChange={(e) => setCatg(e.target.value)}
            required
            className="select-field"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Sofa">Sofa</option>
            <option value="Chair">Chair</option>
            <option value="Table">Table</option>
            <option value="Bed">Bed</option>
          </select>
        </label>

        <label className="file-input-label">
          Product Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="file-input"
          />
        </label>

        <label className="file-input-label">
          3D Model (.glb)
          <input
            type="file"
            accept=".glb"
            onChange={(e) => setModel(e.target.files[0])}
            className="file-input"
          />
        </label>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
