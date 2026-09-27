'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="glass" style={styles.navbar}>
      <div className="container" style={styles.container}>
        <Link href="/" style={styles.logoContainer}>
          <div style={styles.logoTop}>
            <span style={styles.logoCA}>CA</span>
            <span style={{ color: 'var(--secondary)', marginLeft: '2px', fontSize: '1.2rem' }}>✔</span>
            <span style={{ color: 'var(--accent)', marginLeft: '-6px', fontSize: '1.2rem' }}>✔</span>
          </div>
          <div style={styles.logoBottom}>INDIA</div>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          style={styles.mobileToggle} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <div style={{...styles.menuLinks, ...(isOpen ? styles.menuLinksOpen : {})}}>
          <Link href="/about" style={styles.link} onClick={() => setIsOpen(false)}>About Us</Link>
          
          {/* Dropdown for Services */}
          <div 
            style={styles.dropdownContainer}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link href="/services" style={styles.link} onClick={() => setIsOpen(false)}>
              Services ▾
            </Link>
            {dropdownOpen && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownGrid}>
                  <div style={styles.dropdownSection}>
                    <h4 style={styles.dropdownTitle}>Our Services</h4>
                    <Link href="/services#audit" style={styles.dropdownItem} onClick={() => {setIsOpen(false); setDropdownOpen(false);}}>Audit & Assurance</Link>
                    <Link href="/services#tax" style={styles.dropdownItem} onClick={() => {setIsOpen(false); setDropdownOpen(false);}}>Direct Taxation</Link>
                    <Link href="/services#gst" style={styles.dropdownItem} onClick={() => {setIsOpen(false); setDropdownOpen(false);}}>GST Compliance</Link>
                    <Link href="/services#corporate" style={styles.dropdownItem} onClick={() => {setIsOpen(false); setDropdownOpen(false);}}>Corporate Law</Link>
                  </div>
                  <div style={{ ...styles.dropdownSection, backgroundColor: '#f8fafc', borderRadius: 'var(--radius-sm)' }}>
                    <h4 style={styles.dropdownTitle}>Quick Connect</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Need immediate assistance or consultation?</p>
                    <a href="tel:+919876543210" style={{...styles.dropdownBtn, backgroundColor: 'var(--secondary)', color: '#fff'}} onClick={() => setDropdownOpen(false)}>
                      📞 Call Us Now
                    </a>
                    <Link href="/contact" style={{...styles.dropdownBtn, border: '1px solid var(--primary)', color: 'var(--primary)', marginTop: '0.5rem'}} onClick={() => {setIsOpen(false); setDropdownOpen(false);}}>
                      📝 Fill out form
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/knowledge" style={styles.link} onClick={() => setIsOpen(false)}>Knowledge Base</Link>
          <Link href="/reviews" style={styles.link} onClick={() => setIsOpen(false)}>Reviews</Link>
          <Link href="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '1rem 0',
    borderBottom: '1px solid var(--border)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoTop: {
    display: 'flex',
    alignItems: 'flex-start',
    lineHeight: '1',
  },
  logoCA: {
    fontSize: '2rem',
    fontFamily: 'var(--font-playfair), serif',
    fontWeight: '700',
    color: 'var(--primary)',
    fontStyle: 'italic',
    letterSpacing: '-2px',
  },
  logoBottom: {
    color: 'var(--primary)',
    fontWeight: '600',
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: '0.8rem',
    letterSpacing: '2px',
    marginTop: '-4px',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: 'var(--primary)',
    cursor: 'pointer',
  },
  menuLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  menuLinksOpen: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: '1rem',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  link: {
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    minWidth: '500px',
    boxShadow: 'var(--shadow-lg)',
    borderRadius: 'var(--radius-md)',
    padding: '1.5rem',
    zIndex: 101,
  },
  dropdownGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  dropdownSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
  },
  dropdownTitle: {
    fontSize: '1.1rem',
    color: 'var(--primary)',
    marginBottom: '1rem',
    borderBottom: '2px solid var(--secondary)',
    paddingBottom: '0.5rem',
  },
  dropdownItem: {
    padding: '0.5rem 0',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  },
  dropdownBtn: {
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-sm)',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  }
};
