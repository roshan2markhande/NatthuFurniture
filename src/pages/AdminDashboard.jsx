import React, { useEffect, useState } from 'react';
import AddProduct from '../components/AddProduct';
import '../Styles/admin-dashboard.css';
import {
  FaUserShield,
  FaBoxOpen,
  FaChartLine,
  FaPlus,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const AdminDashboard = ({ onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Simulate live visitors
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(Math.floor(Math.random() * 150) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Product type count for chart
  const productTypeCount = products.reduce((acc, product) => {
    const category = product.category || 'Unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(productTypeCount).map((type) => ({
    name: type,
    count: productTypeCount[type],
  }));

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>
          <FaUserShield /> Admin Dashboard
        </h2>
        {/* <button className="logout-btn" onClick={onLogout}>
          Logout
        </button> */}
      </div>

      {/* Toggle Add Product */}
      <div className="top-controls">
        <button
          className="toggle-btn"
          onClick={() => setShowAddProduct(!showAddProduct)}
        >
          <FaPlus /> {showAddProduct ? 'Hide Add Product' : 'Add New Product'}
        </button>
      </div>

      {/* Analytics + Add Product */}
      <div className="analytics-addproduct-row">
        <div className="analytics">
          <div className="card">
            <FaUserShield className="card-icon" />
            <p>
              Welcome, <strong>Admin</strong>
            </p>
          </div>
          <div className="card">
            <FaBoxOpen className="card-icon" />
            <p>
              Total Products: <strong>{products.length}</strong>
            </p>
          </div>
          <div className="card">
            <FaChartLine className="card-icon" />
            <p>
              Live Visitors: <strong>{liveVisitors}</strong>
            </p>
          </div>
        </div>
        {showAddProduct && (
          <div className="add-product-wrapper">
            <AddProduct />
          </div>
        )}
      </div>

      {/* Chart + Orders Table */}
      <div className="chart-orders-row">
        <div className="chart-box">
          <h3>Product Category Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="orders-section">
          <h3>Orders</h3>
          <div className="orders-scroll">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.product}</td>
                      <td>{order.name}</td>
                      <td>{order.mobile}</td>
                      <td>{order.address}</td>
                      <td>{order.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center' }}>
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
