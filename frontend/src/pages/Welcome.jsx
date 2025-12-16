import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../styles/theme.css';

function Welcome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const welcomeMessage = "Welcome to SweetShop! We're delighted to have you here. Get the best sweets here at World of Sweets.";

  // Redirect to dashboard if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  return (
    <div style={styles.container}>
      <div className="card" style={styles.welcomeCard}>
        <h1 style={styles.title}>🍬 Sweet Shop</h1>
        <p style={styles.welcomeMessage}>{welcomeMessage}</p>
      </div>

      <div style={styles.cardsContainer}>
        <div className="card" style={styles.card}>
          <div style={styles.cardIcon}>🔐</div>
          <h2 style={styles.cardTitle}>Login</h2>
          <p style={styles.cardDescription}>
            Already have an account? Sign in to continue shopping.
          </p>
          <Link to="/login" style={styles.cardLink}>
            <button style={styles.cardButton}>Login</button>
          </Link>
        </div>

        <div className="card" style={styles.card}>
          <div style={styles.cardIcon}>✨</div>
          <h2 style={styles.cardTitle}>Register</h2>
          <p style={styles.cardDescription}>
            New to SweetShop? Create an account to get started.
          </p>
          <Link to="/register" style={styles.cardLink}>
            <button style={styles.cardButtonAlt}>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--light-green) 100%)',
    padding: '40px 20px',
    gap: '40px',
  },
  welcomeCard: {
    background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-green) 100%)',
    padding: '50px 40px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
    maxWidth: '900px',
    width: '100%',
    color: 'var(--white)',
    border: 'none',
  },
  title: {
    fontSize: '56px',
    fontWeight: '700',
    color: 'var(--white)',
    marginBottom: '24px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  welcomeMessage: {
    fontSize: '22px',
    color: 'var(--white)',
    lineHeight: '1.8',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    fontWeight: '400',
    margin: 0,
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '900px',
    width: '100%',
  },
  card: {
    background: 'var(--white)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: 'var(--text-dark)',
    marginBottom: '16px',
  },
  cardDescription: {
    fontSize: '16px',
    color: 'var(--text-gray)',
    marginBottom: '32px',
    lineHeight: '1.6',
    flex: 1,
  },
  cardLink: {
    textDecoration: 'none',
    width: '100%',
  },
  cardButton: {
    background: 'var(--primary-blue)',
    color: 'var(--white)',
    padding: '16px 32px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  cardButtonAlt: {
    background: 'var(--primary-green)',
    color: 'var(--white)',
    padding: '16px 32px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
  },
};

export default Welcome;
