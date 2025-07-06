import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { createPortal } from 'react-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState('');
  const [productType, setProductType] = useState('tools');
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState('');
  const [analytics, setAnalytics] = useState({ users: 0, tools: 0, seeds: 0, farmer: 0 });
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ id: '', name: '', email: '', role: '', gender: '' });
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editProductForm, setEditProductForm] = useState({});
  const [editProductError, setEditProductError] = useState('');
  const [editProductLoading, setEditProductLoading] = useState(false);

  useEffect(() => {
    if (activeSection === 'users') {
      fetchUsers();
    }
    if (activeSection === 'products') {
      fetchProducts(productType);
    }
    if (activeSection === 'analytics') {
      fetchAnalytics();
    }
    // eslint-disable-next-line
  }, [activeSection, productType]);

  useEffect(() => {
    if (editingUser) {
      setEditForm({
        id: editingUser.id,
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        gender: editingUser.gender || ''
      });
      setEditError('');
    }
  }, [editingUser]);

  useEffect(() => {
    if (editingProduct) {
      setEditProductForm({ ...editingProduct });
      setEditProductError('');
    }
  }, [editingProduct]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    setUserError('');
    try {
      const res = await axios.get('/authUser/getUser');
      const usersArray = Array.isArray(res.data) ? res.data : (Array.isArray(res.data.users) ? res.data.users : []);
      setUsers(usersArray);
    } catch (err) {
      setUserError('Failed to fetch users');
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchProducts = async (type) => {
    setLoadingProducts(true);
    setProductError('');
    let url = '';
    if (type === 'tools') url = '/market/tools';
    else if (type === 'seeds') url = '/market/seeds-saplings';
    else if (type === 'farmer') url = '/market/farmer-products';
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      setProductError('Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    setAnalyticsError('');
    try {
      const [usersRes, toolsRes, seedsRes, farmerRes] = await Promise.all([
        axios.get('/authUser/getUser'),
        axios.get('/market/tools'),
        axios.get('/market/seeds-saplings'),
        axios.get('/market/farmer-products'),
      ]);
      setAnalytics({
        users: usersRes.data.length,
        tools: toolsRes.data.length,
        seeds: seedsRes.data.length,
        farmer: farmerRes.data.length,
      });
    } catch (err) {
      setAnalyticsError('Failed to fetch analytics');
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(userSearch.toLowerCase())
      )
    : [];

  const filteredProducts = products.filter(
    (product) =>
      (product.name || '').toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      await axios.patch('/authUser/updateUser', editForm);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setEditError('Failed to update user');
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setEditProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProductSave = async (e) => {
    e.preventDefault();
    setEditProductLoading(true);
    setEditProductError('');
    try {
      let url = '';
      if (productType === 'tools') url = `/market/tools/${editProductForm.id}`;
      else if (productType === 'seeds') url = `/market/seeds-saplings/${editProductForm.id}`;
      else if (productType === 'farmer') url = `/market/farmer-products/${editProductForm.id}`;
      
      // Prepare the data based on product type
      let updateData = { ...editProductForm };
      
      // Remove id from the update data as it's in the URL
      delete updateData.id;
      
      // Convert price to number if it's a string
      if (updateData.price) {
        updateData.price = parseFloat(updateData.price);
      }
      
      // Convert stock_quantity/quantity to number if it's a string
      if (updateData.stock_quantity) {
        updateData.stock_quantity = parseInt(updateData.stock_quantity);
      }
      if (updateData.quantity) {
        updateData.quantity = parseInt(updateData.quantity);
      }
      
      await axios.patch(url, updateData);
      setEditingProduct(null);
      fetchProducts(productType);
    } catch (err) {
      console.error('Edit product error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update product';
      setEditProductError(errorMessage);
    } finally {
      setEditProductLoading(false);
    }
  };

  const editModal = editingUser && createPortal(
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h3>Edit User</h3>
        <form onSubmit={handleEditSave} className="admin-edit-form">
          <label>Name
            <input type="text" name="name" value={editForm.name} onChange={handleEditChange} required />
          </label>
          <label>Email
            <input type="email" name="email" value={editForm.email} onChange={handleEditChange} required />
          </label>
          <label>Role
            <select name="role" value={editForm.role} onChange={handleEditChange} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label>Gender
            <select name="gender" value={editForm.gender} onChange={handleEditChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          {editError && <div className="error-message">{editError}</div>}
          <div className="admin-modal-actions">
            <button type="button" onClick={() => setEditingUser(null)} className="admin-action-btn">Cancel</button>
            <button type="submit" className="admin-action-btn edit" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  const editProductModal = editingProduct && createPortal(
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <h3>Edit Product</h3>
        <form onSubmit={handleEditProductSave} className="admin-edit-form">
          <label>Name
            <input type="text" name="name" value={editProductForm.name || ''} onChange={handleEditProductChange} required />
          </label>
          <label>{productType === 'seeds' ? 'Type' : 'Category'}
            <input type="text" name="category" value={editProductForm.category || editProductForm.type || ''} onChange={handleEditProductChange} required />
          </label>
          <label>Description
            <input type="text" name="description" value={editProductForm.description || ''} onChange={handleEditProductChange} required />
          </label>
          <label>Price
            <input type="number" name="price" value={editProductForm.price || ''} onChange={handleEditProductChange} required />
          </label>
          <label>Stock Quantity
            <input type="number" name="stock_quantity" value={editProductForm.stock_quantity || editProductForm.quantity || ''} onChange={handleEditProductChange} required />
          </label>
          {productType === 'seeds' && (
            <label>Planting Season
              <input type="text" name="planting_season" value={editProductForm.planting_season || ''} onChange={handleEditProductChange} />
            </label>
          )}
          {productType === 'farmer' && (
            <label>Unit
              <input type="text" name="unit" value={editProductForm.unit || ''} onChange={handleEditProductChange} />
            </label>
          )}
          {editProductError && <div className="error-message">{editProductError}</div>}
          <div className="admin-modal-actions">
            <button type="button" onClick={() => setEditingProduct(null)} className="admin-action-btn">Cancel</button>
            <button type="submit" className="admin-action-btn edit" disabled={editProductLoading}>{editProductLoading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li className={activeSection === 'users' ? 'active' : ''} onClick={() => setActiveSection('users')}>Users</li>
            <li className={activeSection === 'products' ? 'active' : ''} onClick={() => setActiveSection('products')}>Products</li>
            <li className={activeSection === 'analytics' ? 'active' : ''} onClick={() => setActiveSection('analytics')}>Analytics</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        {editModal}
        {editProductModal}
        {activeSection === 'users' && (
          <div>
            <h3>User Management</h3>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              className="admin-search-input"
            />
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : userError ? (
              <p className="error-message">{userError}</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Gender</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.gender}</td>
                      <td>
                        <button className="admin-action-btn edit" onClick={() => setEditingUser(user)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {activeSection === 'products' && (
          <div>
            <h3>Product Management</h3>
            <div className="admin-product-controls">
              <select value={productType} onChange={e => setProductType(e.target.value)} className="admin-product-type-select">
                <option value="tools">Tools</option>
                <option value="seeds">Seeds & Saplings</option>
                <option value="farmer">Farmer Products</option>
              </select>
              <input
                type="text"
                placeholder="Search by product name..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                className="admin-search-input"
              />
            </div>
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : productError ? (
              <p className="error-message">{productError}</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>{productType === 'seeds' ? 'Type' : 'Category'}</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock Quantity</th>
                    {productType === 'farmer' && <th>Farmer</th>}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category || product.type || '-'}</td>
                      <td>{product.description}</td>
                      <td>₹{product.price}{product.unit ? `/${product.unit}` : ''}</td>
                      <td>{product.stock_quantity || product.quantity || '-'}</td>
                      {productType === 'farmer' && <td>{product.farmer_name || product.seller || '-'}</td>}
                      <td>
                        <button className="admin-action-btn edit" onClick={() => setEditingProduct(product)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {activeSection === 'analytics' && (
          <div>
            <h3>Analytics</h3>
            {loadingAnalytics ? (
              <p>Loading analytics...</p>
            ) : analyticsError ? (
              <p className="error-message">{analyticsError}</p>
            ) : (
              <div className="analytics-cards">
                <div className="analytics-card">
                  <h4>Total Users</h4>
                  <p>{analytics.users}</p>
                </div>
                <div className="analytics-card">
                  <h4>Total Tools</h4>
                  <p>{analytics.tools}</p>
                </div>
                <div className="analytics-card">
                  <h4>Total Seeds & Saplings</h4>
                  <p>{analytics.seeds}</p>
                </div>
                <div className="analytics-card">
                  <h4>Total Farmer Products</h4>
                  <p>{analytics.farmer}</p>
                </div>
              </div>
            )}
            <div className="analytics-charts-placeholder">
              <h4>Charts & Trends (Coming Soon)</h4>
              <p>Visualize user and product growth here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard; 