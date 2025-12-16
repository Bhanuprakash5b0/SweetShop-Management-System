import { useState } from 'react';
import '../styles/theme.css';

function CardDrawer({ cart, removeFromCart, updateCartQuantity, clearCart }) {
  const [isOpen, setIsOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Checkout functionality will be implemented soon!');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={styles.cartButton}
      >
        🛒 Cart ({itemCount})
      </button>

      {isOpen && (
        <>
          <div
            style={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
          <div style={styles.drawer}>
            <div style={styles.drawerHeader}>
              <h3 style={styles.drawerTitle}>Shopping Cart</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <div style={styles.drawerContent}>
              {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                  <p>Your cart is empty</p>
                  <p style={styles.emptyCartSubtext}>
                    Add some sweets to get started!
                  </p>
                </div>
              ) : (
                <>
                  <div style={styles.cartItems}>
                    {cart.map((item) => (
                      <div key={item.id} style={styles.cartItem}>
                        <div style={styles.itemInfo}>
                          <h4 style={styles.itemName}>{item.itemname}</h4>
                          <p style={styles.itemPrice}>₹{item.price} each</p>
                        </div>
                        <div style={styles.itemControls}>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            style={styles.quantityButton}
                          >
                            −
                          </button>
                          <span style={styles.quantity}>{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            style={styles.quantityButton}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={styles.removeButton}
                          >
                            🗑️
                          </button>
                        </div>
                        <p style={styles.itemTotal}>
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={styles.cartFooter}>
                    <div style={styles.totalSection}>
                      <div style={styles.totalRow}>
                        <span>Subtotal:</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                      <div style={styles.totalRow}>
                        <span style={styles.grandTotal}>Total:</span>
                        <span style={styles.grandTotal}>₹{total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div style={styles.actionButtons}>
                      <button
                        onClick={clearCart}
                        style={styles.clearButton}
                      >
                        Clear Cart
                      </button>
                      <button
                        onClick={handleCheckout}
                        style={styles.checkoutButton}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  cartButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'var(--primary-green)',
    color: 'var(--white)',
    padding: '16px 24px',
    borderRadius: '50px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '400px',
    maxWidth: '90vw',
    background: 'var(--white)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.3s ease',
  },
  drawerHeader: {
    padding: '20px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'var(--text-dark)',
    margin: 0,
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'var(--text-gray)',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContent: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyCart: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-gray)',
  },
  emptyCartSubtext: {
    fontSize: '14px',
    marginTop: '8px',
  },
  cartItems: {
    padding: '20px',
    flex: 1,
  },
  cartItem: {
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '12px',
  },
  itemInfo: {
    marginBottom: '12px',
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-dark)',
    marginBottom: '4px',
  },
  itemPrice: {
    fontSize: '14px',
    color: 'var(--text-gray)',
  },
  itemControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  quantityButton: {
    background: 'var(--light-blue)',
    color: 'var(--primary-blue)',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: '16px',
    fontWeight: '600',
    minWidth: '30px',
    textAlign: 'center',
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px',
    marginLeft: 'auto',
  },
  itemTotal: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--primary-green)',
    textAlign: 'right',
  },
  cartFooter: {
    padding: '20px',
    borderTop: '1px solid var(--border-color)',
    background: 'var(--bg-light)',
  },
  totalSection: {
    marginBottom: '20px',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
    color: 'var(--text-gray)',
  },
  grandTotal: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-dark)',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
  },
  clearButton: {
    flex: 1,
    background: 'var(--white)',
    color: 'var(--text-dark)',
    border: '1px solid var(--border-color)',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  checkoutButton: {
    flex: 2,
    background: 'var(--primary-green)',
    color: 'var(--white)',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default CardDrawer;
