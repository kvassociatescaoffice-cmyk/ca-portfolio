export default function Contact() {
  return (
    <div className="container section animate-fade-in">
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Contact Us</h1>
      <div style={styles.grid}>
        <div style={styles.info} className="glass">
          <h3>Our Office</h3>
          <p>123 Financial District<br/>New Delhi, India 110001</p>
          <br/>
          <h3>Contact Details</h3>
          <p>Email: info@vjaclone.example.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
        <div style={styles.formContainer} className="glass">
          <form style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input type="text" style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input type="email" style={styles.input} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea style={{...styles.input, minHeight: '120px'}} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
  },
  info: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-md)',
  },
  formContainer: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-md)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit'
  }
};
