import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  const linkStyle = ({ isActive }) =>
    `d-block px-3 py-2 rounded text-decoration-none mb-1 ${isActive ? 'bg-success text-white' : 'text-white-50'}`;

  return (
    <div className="d-flex flex-column bg-dark text-white"
      style={{ width: '220px', minHeight: '100vh', padding: '20px 10px', position: 'fixed', top: 0, left: 0 }}>
      <h5 className="text-white text-center mb-4">📦 InvMS</h5>

      <nav className="flex-grow-1">
        <NavLink to="/home" className={linkStyle}>🏠 Home</NavLink>
        <NavLink to="/inventory" className={linkStyle}>📋 Inventory</NavLink>
        <NavLink to="/profile" className={linkStyle}>👤 Profile</NavLink>
      </nav>

      <div className="mt-auto">
        <div className="text-white-50 small px-3 mb-2">
          Logged in as<br />
          <span className="text-white">{user?.name}</span>
        </div>
        <button className="btn btn-outline-danger w-100 btn-sm" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}