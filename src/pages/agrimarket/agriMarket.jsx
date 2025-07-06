import React, { useState, useEffect, useCallback } from 'react';
import './agriMarket.css';
import axios from 'axios';
import { createPortal } from 'react-dom';

const AgriMarket = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [tools, setTools] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user role from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userRole = userData.role;

  // State for add modals
  const [showAddTool, setShowAddTool] = useState(false);
  const [showAddSeed, setShowAddSeed] = useState(false);
  const [showAddCrop, setShowAddCrop] = useState(false);

  const [addToolForm, setAddToolForm] = useState({ name: '', category: '', description: '', price: '', stock_quantity: '', image_url: '' });
  const [addToolError, setAddToolError] = useState('');
  const [addToolLoading, setAddToolLoading] = useState(false);

  const [addSeedForm, setAddSeedForm] = useState({ name: '', category: '', type: '', description: '', price: '', planting_season: '', image_url: '' });
  const [addSeedError, setAddSeedError] = useState('');
  const [addSeedLoading, setAddSeedLoading] = useState(false);

  const [addCropForm, setAddCropForm] = useState({ name: '', category: '', description: '', price: '', quantity: '', unit: '', image_url: '' });
  const [addCropError, setAddCropError] = useState('');
  const [addCropLoading, setAddCropLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (activeTab === 'tools') {
        const response = await axios.get('/market/tools');
        setTools(response.data);
      } else if (activeTab === 'seeds') {
        const response = await axios.get('/market/seeds-saplings');
        setSeeds(response.data);
      } else if (activeTab === 'marketplace') {
        const response = await axios.get('/market/farmer-products');
        setFarmerProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddToolChange = (e) => {
    const { name, value } = e.target;
    setAddToolForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToolSubmit = async (e) => {
    e.preventDefault();
    setAddToolLoading(true);
    setAddToolError('');
    try {
      await axios.post('/market/tools', addToolForm);
      setShowAddTool(false);
      setAddToolForm({ name: '', category: '', description: '', price: '', stock_quantity: '', image_url: '' });
      fetchData();
    } catch (err) {
      setAddToolError('Failed to add tool');
    } finally {
      setAddToolLoading(false);
    }
  };

  const handleAddSeedChange = (e) => {
    const { name, value } = e.target;
    setAddSeedForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSeedSubmit = async (e) => {
    e.preventDefault();
    setAddSeedLoading(true);
    setAddSeedError('');
    try {
      await axios.post('/market/seeds-saplings', addSeedForm);
      setShowAddSeed(false);
      setAddSeedForm({ name: '', category: '', type: '', description: '', price: '', planting_season: '', image_url: '' });
      fetchData();
    } catch (err) {
      setAddSeedError('Failed to add seed');
    } finally {
      setAddSeedLoading(false);
    }
  };

  const handleAddCropChange = (e) => {
    const { name, value } = e.target;
    setAddCropForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCropSubmit = async (e) => {
    e.preventDefault();
    setAddCropLoading(true);
    setAddCropError('');
    try {
      await axios.post('/market/farmer-products', addCropForm);
      setShowAddCrop(false);
      setAddCropForm({ name: '', category: '', description: '', price: '', quantity: '', unit: '', image_url: '' });
      fetchData();
    } catch (err) {
      setAddCropError('Failed to add crop');
    } finally {
      setAddCropLoading(false);
    }
  };

  const addToolModal = showAddTool && createPortal(
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h3>Add Tool</h3>
        <form onSubmit={handleAddToolSubmit} className="admin-edit-form">
          <label>Name
            <input type="text" name="name" value={addToolForm.name} onChange={handleAddToolChange} required />
          </label>
          <label>Category
            <input type="text" name="category" value={addToolForm.category} onChange={handleAddToolChange} required />
          </label>
          <label>Description
            <input type="text" name="description" value={addToolForm.description} onChange={handleAddToolChange} required />
          </label>
          <label>Price
            <input type="number" name="price" value={addToolForm.price} onChange={handleAddToolChange} required />
          </label>
          <label>Stock Quantity
            <input type="number" name="stock_quantity" value={addToolForm.stock_quantity} onChange={handleAddToolChange} required />
          </label>
          <label>Image URL
            <input type="text" name="image_url" value={addToolForm.image_url} onChange={handleAddToolChange} />
          </label>
          {addToolError && <div className="error-message">{addToolError}</div>}
          <div className="admin-modal-actions">
            <button type="button" onClick={() => setShowAddTool(false)} className="admin-action-btn">Cancel</button>
            <button type="submit" className="admin-action-btn edit" disabled={addToolLoading}>{addToolLoading ? 'Adding...' : 'Add Tool'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  const addSeedModal = showAddSeed && createPortal(
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h3>Add Seed</h3>
        <form onSubmit={handleAddSeedSubmit} className="admin-edit-form">
          <label>Name
            <input type="text" name="name" value={addSeedForm.name} onChange={handleAddSeedChange} required />
          </label>
          <label>Category
            <input type="text" name="category" value={addSeedForm.category} onChange={handleAddSeedChange} required />
          </label>
          <label>Type
            <input type="text" name="type" value={addSeedForm.type} onChange={handleAddSeedChange} required />
          </label>
          <label>Description
            <input type="text" name="description" value={addSeedForm.description} onChange={handleAddSeedChange} required />
          </label>
          <label>Price
            <input type="number" name="price" value={addSeedForm.price} onChange={handleAddSeedChange} required />
          </label>
          <label>Planting Season
            <input type="text" name="planting_season" value={addSeedForm.planting_season} onChange={handleAddSeedChange} />
          </label>
          <label>Image URL
            <input type="text" name="image_url" value={addSeedForm.image_url} onChange={handleAddSeedChange} />
          </label>
          {addSeedError && <div className="error-message">{addSeedError}</div>}
          <div className="admin-modal-actions">
            <button type="button" onClick={() => setShowAddSeed(false)} className="admin-action-btn">Cancel</button>
            <button type="submit" className="admin-action-btn edit" disabled={addSeedLoading}>{addSeedLoading ? 'Adding...' : 'Add Seed'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  const addCropModal = showAddCrop && createPortal(
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h3>Add Crop</h3>
        <form onSubmit={handleAddCropSubmit} className="admin-edit-form">
          <label>Name
            <input type="text" name="name" value={addCropForm.name} onChange={handleAddCropChange} required />
          </label>
          <label>Category
            <input type="text" name="category" value={addCropForm.category} onChange={handleAddCropChange} required />
          </label>
          <label>Description
            <input type="text" name="description" value={addCropForm.description} onChange={handleAddCropChange} required />
          </label>
          <label>Price
            <input type="number" name="price" value={addCropForm.price} onChange={handleAddCropChange} required />
          </label>
          <label>Quantity
            <input type="number" name="quantity" value={addCropForm.quantity} onChange={handleAddCropChange} required />
          </label>
          <label>Unit
            <input type="text" name="unit" value={addCropForm.unit} onChange={handleAddCropChange} required />
          </label>
          <label>Image URL
            <input type="text" name="image_url" value={addCropForm.image_url} onChange={handleAddCropChange} />
          </label>
          {addCropError && <div className="error-message">{addCropError}</div>}
          <div className="admin-modal-actions">
            <button type="button" onClick={() => setShowAddCrop(false)} className="admin-action-btn">Cancel</button>
            <button type="submit" className="admin-action-btn edit" disabled={addCropLoading}>{addCropLoading ? 'Adding...' : 'Add Crop'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  return (
    <div className="agrimarket-container">
      <h1>Welcome to AgriMarket</h1>
      
      <div className="market-tabs">
        <button 
          className={`tab-button ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Agricultural Tools
        </button>
        <button 
          className={`tab-button ${activeTab === 'seeds' ? 'active' : ''}`}
          onClick={() => setActiveTab('seeds')}
        >
          Seeds & Saplings
        </button>
        <button 
          className={`tab-button ${activeTab === 'marketplace' ? 'active' : ''}`}
          onClick={() => setActiveTab('marketplace')}
        >
          Farmers' Marketplace
        </button>
      </div>

      <div className="market-content">
        {addToolModal}
        {addSeedModal}
        {addCropModal}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {activeTab === 'tools' && (
              <div className="tools-section">
                <h2>Agricultural Tools</h2>
                {/* Show Add Tool button for admin and user roles */}
                {(userRole === 'admin' || userRole === 'user') && (
                  <button className="add-product-btn" onClick={() => setShowAddTool(true)}>Add Tool</button>
                )}
                <div className="category-tabs">
                  <button>Traditional Tools</button>
                  <button>Modern Tools</button>
                </div>
                <div className="product-grid">
                  {tools.map((tool) => (
                    <div key={tool.id} className="product-card">
                      {tool.image_url && <img src={tool.image_url} alt={tool.name} />}
                      <h3>{tool.name}</h3>
                      <p className="category">{tool.category}</p>
                      <p className="description">{tool.description}</p>
                      <p className="price">₹{tool.price}</p>
                      <button className="buy-button">Add to Cart</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'seeds' && (
              <div className="seeds-section">
                <h2>Seeds & Saplings</h2>
                {/* Show Add Seed button for admin and user roles */}
                {(userRole === 'admin' || userRole === 'user') && (
                  <button className="add-product-btn" onClick={() => setShowAddSeed(true)}>Add Seed</button>
                )}
                <div className="product-grid">
                  {seeds.map((seed) => (
                    <div key={seed.id} className="product-card">
                      {seed.image_url && <img src={seed.image_url} alt={seed.name} />}
                      <h3>{seed.name}</h3>
                      <p className="category">{seed.category}</p>
                      <p className="season">Best planting season: {seed.planting_season}</p>
                      <p className="description">{seed.description}</p>
                      <p className="price">₹{seed.price}</p>
                      <button className="buy-button">Add to Cart</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div className="marketplace-section">
                <h2>Farmers' Marketplace</h2>
                {/* Show Add Crop button for admin and farmer roles */}
                {(userRole === 'admin' || userRole === 'farmer') && (
                  <button className="add-product-btn" onClick={() => setShowAddCrop(true)}>Add Crop</button>
                )}
                <div className="product-grid">
                  {farmerProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      {product.image_url && <img src={product.image_url} alt={product.name} />}
                      <h3>{product.name}</h3>
                      <p className="farmer">By: {product.farmer_name}</p>
                      <p className="category">{product.category}</p>
                      <p className="description">{product.description}</p>
                      <p className="quantity">{product.quantity} {product.unit} available</p>
                      <p className="price">₹{product.price}/{product.unit}</p>
                      <button className="buy-button">Contact Farmer</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AgriMarket;