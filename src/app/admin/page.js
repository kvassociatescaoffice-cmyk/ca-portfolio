'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Check if already logged in (simple mock using localStorage)
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded credentials for demonstration
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Hint: admin / admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard} className="glass animate-slide-up">
          <h1 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Login</button>
          </form>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>&larr; Back to Public Site</a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div style={styles.dashboardContainer} className="animate-fade-in">
      <header style={styles.dashboardHeader}>
        <h2>CA India Admin Panel</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Welcome, Admin</span>
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Logout</button>
        </div>
      </header>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>New Inquiries</h3>
          <p style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>12</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>From contact forms this week</p>
        </div>
        <div style={styles.card}>
          <h3>Active Clients</h3>
          <p style={{ fontSize: '2.5rem', color: 'var(--secondary)', fontWeight: 'bold' }}>348</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>In the client portal</p>
        </div>
        <div style={styles.card}>
          <h3>Pending Documents</h3>
          <p style={{ fontSize: '2.5rem', color: '#ef4444', fontWeight: 'bold' }}>5</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Require admin signature</p>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Recent Contact Submissions</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Subject</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Rahul Sharma</td>
              <td style={styles.td}>rahul@example.com</td>
              <td style={styles.td}>Tax Consultation</td>
              <td style={styles.td}>Today, 10:30 AM</td>
            </tr>
            <tr>
              <td style={styles.td}>Priya Desai</td>
              <td style={styles.td}>priya@desai.co</td>
              <td style={styles.td}>GST Registration</td>
              <td style={styles.td}>Yesterday</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--background)',
    padding: '1rem',
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    padding: '3rem 2rem',
    borderRadius: 'var(--radius-lg)',
  },
  input: {
    padding: '0.8rem 1rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    fontSize: '1rem',
    outline: 'none',
  },
  dashboardContainer: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: 'var(--shadow-sm)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    backgroundColor: 'var(--primary)',
    color: '#fff',
    fontWeight: '600',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text-primary)',
  }
};
