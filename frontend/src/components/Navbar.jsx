import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          FreelanceHub
        </Link>

        <div className="nav-menu">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            Browse Jobs
          </Link>
          <Link 
            to="/post-job" 
            className={`nav-link ${isActive('/post-job') ? 'active' : ''}`}
          >
            Post Job
          </Link>
          <Link 
            to="/my-jobs" 
            className={`nav-link ${isActive('/my-jobs') ? 'active' : ''}`}
          >
            My Jobs
          </Link>
        </div>

        <div className="nav-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
