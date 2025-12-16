import '../styles/theme.css';

function SweetCard({ sweet, addToCart, isAdmin }) {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="card" style={styles.card}>
      <div style={styles.imageContainer}>
        <div style={styles.imagePlaceholder}>
          🍬
        </div>
        {isOutOfStock && (
          <div style={styles.outOfStockBadge}>Out of Stock</div>
        )}
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{sweet.itemname}</h3>
        <p style={styles.price}>₹{sweet.price}</p>
        <p style={styles.stock}>
          {isOutOfStock ? (
            <span style={styles.outOfStock}>Out of Stock</span>
          ) : (
            <span style={styles.inStock}>{sweet.quantity} available</span>
          )}
        </p>

        {!isAdmin && (
          <button
            onClick={() => addToCart(sweet)}
            disabled={isOutOfStock}
            style={{
              ...styles.button,
              ...(isOutOfStock ? styles.buttonDisabled : styles.buttonActive),
            }}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    background: 'linear-gradient(135deg, var(--light-blue) 0%, var(--light-green) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '64px',
  },
  imagePlaceholder: {
    fontSize: '64px',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'var(--white)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  content: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'var(--text-dark)',
    marginBottom: '8px',
  },
  price: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--primary-green)',
    marginBottom: '8px',
  },
  stock: {
    fontSize: '14px',
    marginBottom: '16px',
  },
  inStock: {
    color: 'var(--primary-green)',
    fontWeight: '500',
  },
  outOfStock: {
    color: '#ef4444',
    fontWeight: '500',
  },
  button: {
    marginTop: 'auto',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
  },
  buttonActive: {
    background: 'var(--primary-blue)',
    color: 'var(--white)',
  },
  buttonDisabled: {
    background: '#e5e7eb',
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
};

export default SweetCard;
