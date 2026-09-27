'use client';
import { useEffect, useState } from 'react';

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  // Simple scroll effect to only show after scrolling down slightly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={styles.container} className="animate-fade-in">
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{...styles.btn, ...styles.whatsapp}}>
        <span style={{ fontSize: '1.5rem' }}>💬</span>
      </a>
      <a href="tel:+919876543210" style={{...styles.btn, ...styles.call}}>
        <span style={{ fontSize: '1.5rem' }}>📞</span>
      </a>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 999,
  },
  btn: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-md)',
    color: '#fff',
    transition: 'transform 0.3s ease',
    textDecoration: 'none',
  },
  whatsapp: {
    backgroundColor: '#25D366', // Official WhatsApp Green
  },
  call: {
    backgroundColor: 'var(--secondary)', // Using brand gold for call
  }
};
