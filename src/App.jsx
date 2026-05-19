import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import ProfilePage from './pages/ProfilePage';

const API = 'https://inventory-backend-production-79c9.up.railway.app/api/products';

function Layout({ user, onLogout, children }) {
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="d-flex">
      <Sidebar user={user} onLogout={onLogout} />
      <div style={{ marginLeft: '220px', padding: '30px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (user) axios.get(API).then(res => setProducts(res.data));
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setProducts([]);
    setEditProduct(null);
  };

  const handleAdd = (p) => setProducts([...products, p]);
  const handleDelete = (id) => setProducts(products.filter(p => p._id !== id));
  const handleUpdate = (updated) => {
    setProducts(products.map(p => p._id === updated._id ? updated : p));
    setEditProduct(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/home" /> : <LoginPage onLogin={setUser} />
        } />
        <Route path="/home" element={
          <Layout user={user} onLogout={handleLogout}>
            <HomePage products={products} />
          </Layout>
        } />
        <Route path="/inventory" element={
          <Layout user={user} onLogout={handleLogout}>
            <InventoryPage
              products={products}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
            />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout user={user} onLogout={handleLogout}>
            <ProfilePage user={user} />
          </Layout>
        } />
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}