import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../styles/theme.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🍬 SweetShop
        </Link>
        
        <div style={styles.navLinks}>
          {user ? (
            <>
              <Link to="/" style={styles.link}>Dashboard</Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin" style={styles.link}>Admin Panel</Link>
              )}
              <span style={styles.userInfo}>Welcome, {user.name || user.email || 'User'}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'var(--white)',
    boxShadow: 'var(--shadow)',
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--primary-blue)',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'var(--text-dark)',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  userInfo: {
    color: 'var(--text-gray)',
    fontSize: '14px',
    padding: '0 10px',
  },
  logoutBtn: {
    background: 'var(--primary-green)',
    color: 'var(--white)',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
  },
};

export default Navbar;

