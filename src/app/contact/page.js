export default function Contact() {
  return (
    <section>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Contact Us</h1>
      <div className="contact">
        <div style={styles.info}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--navy-800)' }}>Our Office</h3>
          <p style={{ color: 'var(--ink)' }}>123 Financial District<br/>New Delhi, India 110001</p>
          <br/>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--navy-800)' }}>Contact Details</h3>
          <p style={{ color: 'var(--ink)' }}>Email: info@vjaclone.example.com</p>
          <p style={{ color: 'var(--ink)' }}>Phone: +91 98765 43210</p>
        </div>
        <div>
          <form style={styles.form}>
            <div className="field">
              <label>Name</label>
              <input type="text" required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea style={{ minHeight: '120px' }} required></textarea>
            </div>
            <button type="submit" className="btn solid" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
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
