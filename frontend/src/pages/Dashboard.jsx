import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import SweetCard from '../components/SweetCard';
import CardDrawer from '../components/CardDrawer';
import api from '../api/axios';
import '../styles/theme.css';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'ADMIN';

  const [sweets, setSweets] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSweets();
    fetchCart();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await api.get('/items');
      setSweets(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to load sweets. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  const addToCart = async (sweet) => {
    try {
      await api.post('/cart', { itemid: sweet.id });
      fetchCart();
    } catch (err) {
      setError('Failed to add to cart. Please try again.');
    }
  };

  const updateCartQuantity = async (id, quantity) => {
    try {
      await api.put('/cart', { itemid: id, quantity });
      fetchCart();
    } catch (err) {
      setError('Failed to update cart. Please try again.');
    }
  };

  const clearCart = () => {
    // For simplicity, clear local, but ideally call backend to clear all
    setCart([]);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <p>Loading sweets...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🍬 Our Sweet Collection</h1>
        <p style={styles.subtitle}>Discover our delicious range of traditional sweets</p>
      </div>

      {error && <div className="error-message" style={styles.error}>{error}</div>}

      <div style={styles.content}>
        <div style={styles.grid}>
          {sweets.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No sweets available at the moment.</p>
            </div>
          ) : (
            sweets.map(sweet => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                addToCart={addToCart}
                isAdmin={isAdmin}
              />
            ))
          )}
        </div>

        <CardDrawer
          cart={cart}
          removeFromCart={(id) => updateCartQuantity(id, 0)}
          updateCartQuantity={updateCartQuantity}
          clearCart={clearCart}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    minHeight: 'calc(100vh - 70px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: 'var(--text-dark)',
    fontSize: '32px',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-gray)',
    fontSize: '16px',
  },
  error: {
    maxWidth: '800px',
    margin: '0 auto 20px',
  },
  content: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    flex: 1,
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-gray)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 70px)',
    color: 'var(--text-gray)',
  },
};

export default Dashboard;
