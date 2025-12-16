import { useState, useEffect } from 'react';
import api from '../api/axios';
import '../styles/theme.css';

function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [formData, setFormData] = useState({
    itemname: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchSweets();
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingSweet) {
        // Update existing sweet
        await api.put(`/items/${editingSweet.id}`, formData);
        setSuccess('Sweet updated successfully!');
      } else {
        // Create new sweet
        await api.post('/items', formData);
        setSuccess('Sweet added successfully!');
      }
      
      setShowForm(false);
      setEditingSweet(null);
      setFormData({ itemname: '', price: '', quantity: '' });
      fetchSweets();
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to save sweet. Please try again.'
      );
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      itemname: sweet.itemname,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await api.delete(`/sweets/${id}`);
      setSuccess('Sweet deleted successfully!');
      fetchSweets();
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to delete sweet. Please try again.'
      );
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSweet(null);
    setFormData({ itemname: '', price: '', quantity: '' });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Panel</h1>
        <p style={styles.subtitle}>Manage your sweet inventory</p>
      </div>

      {error && <div className="error-message" style={styles.message}>{error}</div>}
      {success && <div className="success-message" style={styles.message}>{success}</div>}

      <div style={styles.actions}>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + Add New Sweet
        </button>
      </div>

      {showForm && (
        <div className="card" style={styles.formCard}>
          <h3 style={styles.formTitle}>
            {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
          </h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="itemname"
                value={formData.itemname}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter sweet name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                style={styles.input}
                placeholder="Enter price"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                style={styles.input}
                placeholder="Enter quantity"
              />
            </div>

            <div style={styles.formActions}>
              <button type="submit" style={styles.submitButton}>
                {editingSweet ? 'Update' : 'Add'} Sweet
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.length === 0 ? (
              <tr>
                <td colSpan="4" style={styles.emptyCell}>
                  No sweets found. Add your first sweet!
                </td>
              </tr>
            ) : (
              sweets.map((sweet) => (
                <tr key={sweet.id} style={styles.tr}>
                  <td style={styles.td}>{sweet.itemname}</td>
                  <td style={styles.td}>₹{sweet.price}</td>
                  <td style={styles.td}>{sweet.quantity}</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(sweet)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sweet.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
  message: {
    maxWidth: '800px',
    margin: '0 auto 20px',
  },
  actions: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  addButton: {
    background: 'var(--primary-green)',
    color: 'var(--white)',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  formCard: {
    marginBottom: '30px',
    maxWidth: '500px',
    margin: '0 auto 30px',
  },
  formTitle: {
    marginBottom: '20px',
    color: 'var(--text-dark)',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: 'var(--text-dark)',
    fontWeight: '500',
    fontSize: '14px',
  },
  input: {
    padding: '12px',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
  },
  submitButton: {
    flex: 1,
    background: 'var(--primary-blue)',
    color: 'var(--white)',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    background: 'var(--white)',
    color: 'var(--text-dark)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tableContainer: {
    background: 'var(--white)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    background: 'var(--light-blue)',
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600',
    color: 'var(--text-dark)',
    borderBottom: '2px solid var(--border-color)',
  },
  tr: {
    borderBottom: '1px solid var(--border-color)',
  },
  td: {
    padding: '16px',
    color: 'var(--text-dark)',
  },
  emptyCell: {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-gray)',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    background: 'var(--primary-blue)',
    color: 'var(--white)',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  deleteButton: {
    background: '#ef4444',
    color: 'var(--white)',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
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

export default AdminPanel;
