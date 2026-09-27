'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Info, Briefcase, FileText, Mail, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'Resources', path: '/knowledge', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <div style={styles.navWrapper}>
      <nav style={{...styles.navbar, ...(isScrolled ? styles.navbarScrolled : {})}}>
        <div style={styles.container}>
          {/* Logo Section */}
          <Link href="/" style={styles.logoContainer}>
            <div style={styles.logoCircle}>
              <Image src="/images/Logo.png" alt="Logo" width={28} height={28} style={{ objectFit: 'contain' }} />
            </div>
            <span style={styles.logoText}>KVA</span>
          </Link>
          
          {/* Desktop Links */}
          <div style={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  style={{...styles.link, ...(isActive ? styles.linkActive : {})}}
                >
                  <Icon size={14} style={{ marginRight: '6px', opacity: isActive ? 1 : 0.7 }} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div style={styles.ctaContainer}>
            <Link href="/contact" style={styles.btnPrimary}>
              Get Started
            </Link>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            style={styles.mobileToggle} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={styles.mobileMenu}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.path} 
                style={{...styles.mobileLink, ...(isActive ? styles.mobileLinkActive : {})}}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} style={{ marginRight: '12px' }} />
                {item.name}
              </Link>
            );
          })}
          <Link href="/contact" style={{...styles.btnPrimary, marginTop: '1rem', width: '100%', textAlign: 'center'}} onClick={() => setIsOpen(false)}>
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  navWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  navbar: {
    backgroundColor: 'rgba(30, 41, 59, 0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    padding: '0.5rem 0.5rem 0.5rem 1rem',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    pointerEvents: 'auto',
    width: '100%',
    maxWidth: '1000px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
  },
  navbarScrolled: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
    transform: 'translateY(-5px)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'center',
    '@media (max-width: 900px)': {
      display: 'none',
    }
  },
  link: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  linkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#ffffff',
  },
  ctaContainer: {
    display: 'block',
  },
  btnPrimary: {
    backgroundColor: '#ff6b6b', // Coral/Red
    color: '#ffffff',
    padding: '0.6rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '600',
    fontSize: '0.9rem',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  mobileMenu: {
    position: 'absolute',
    top: '5rem',
    left: '1.5rem',
    right: '1.5rem',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    pointerEvents: 'auto',
  },
  mobileLink: {
    color: '#cbd5e1',
    fontSize: '1rem',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  mobileLinkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
  }
};
