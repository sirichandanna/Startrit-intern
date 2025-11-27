import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2>User Profile</h2>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <label>Name</label>
            <p>{user?.name}</p>
          </div>

          <div className="info-item">
            <label>Email</label>
            <p>{user?.email}</p>
          </div>

          <div className="info-item">
            <label>User ID</label>
            <p>{user?._id || user?.id}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
