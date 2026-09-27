export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.footerGrid}>
        <div style={styles.footerBrand}>
          <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2rem', marginBottom: '1rem', fontStyle: 'italic' }}>CA INDIA</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Empowering your business with strategic financial insights, uncompromising integrity, and rigorous compliance.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={styles.socialIcon}>in</span>
            <span style={styles.socialIcon}>tw</span>
            <span style={styles.socialIcon}>fb</span>
          </div>
        </div>
        
        <div>
          <h3 style={styles.footerTitle}>Quick Links</h3>
          <ul style={styles.footerList}>
            <li><a href="/services" style={styles.footerLink}>Our Services</a></li>
            <li><a href="/knowledge" style={styles.footerLink}>Knowledge Base</a></li>
            <li><a href="/reviews" style={styles.footerLink}>Client Testimonials</a></li>
            <li><a href="/contact" style={styles.footerLink}>Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 style={styles.footerTitle}>Core Services</h3>
          <ul style={styles.footerList}>
            <li><a href="/services#audit" style={styles.footerLink}>Audit & Assurance</a></li>
            <li><a href="/services#tax" style={styles.footerLink}>Direct Taxation</a></li>
            <li><a href="/services#gst" style={styles.footerLink}>GST Compliance</a></li>
            <li><a href="/services#corporate" style={styles.footerLink}>Corporate Law</a></li>
          </ul>
        </div>

        <div>
          <h3 style={styles.footerTitle}>Contact</h3>
          <ul style={styles.footerList}>
            <li style={styles.contactItem}>📍 123 Financial District, New Delhi, India 110001</li>
            <li style={styles.contactItem}>📞 +91 98765 43210</li>
            <li style={styles.contactItem}>✉️ contact@caindia.example.com</li>
          </ul>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p>&copy; {new Date().getFullYear()} CA India Portfolio. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
            <a href="#" style={{ color: '#cbd5e1' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#cbd5e1' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    paddingTop: '4rem',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
  },
  footerBrand: {
    gridColumn: 'span 1',
    minWidth: '250px',
  },
  footerTitle: {
    color: 'var(--secondary)',
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  footerLink: {
    color: '#cbd5e1',
    textDecoration: 'none',
    transition: 'color 0.2s',
    fontSize: '0.95rem',
  },
  contactItem: {
    color: '#cbd5e1',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '1.5rem 0',
    color: '#94a3b8',
    fontSize: '0.9rem',
  }
};
