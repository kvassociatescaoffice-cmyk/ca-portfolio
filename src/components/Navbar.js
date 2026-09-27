'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav id="nav">
      <Link href="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 100 }}>
        <img src="/images/Logo.png" alt="CA India Logo" style={{ height: '40px', width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, fontFamily: "var(--font-fraunces), 'Fraunces', serif" }}>
          <span style={{ 
            background: 'linear-gradient(100deg, var(--gold), #ffdf91)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            fontWeight: '800', 
            fontSize: '1.25rem',
            whiteSpace: 'nowrap'
          }}>
            Kumar Vashishtha
          </span>
          <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500', letterSpacing: '0.5px', opacity: 0.9 }}>
            & Associates
          </span>
        </div>
      </Link>
      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      <div className={`navlinks ${isOpen ? 'open' : ''}`}>
        <Link className={pathname === '/' ? 'active' : ''} href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 11l8-7 8 7M6 10v10h12V10" />
          </svg>
          Home
        </Link>
        <Link className={pathname === '/about' ? 'active' : ''} href="/about">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v5h1" />
          </svg>
          About
        </Link>
        <div className="dropdown">
          <Link className={pathname.startsWith('/services') ? 'active' : ''} href="/services">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="4" y="8" width="16" height="11" rx="1" />
              <path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" />
            </svg>
            Services
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Link>
          <div className="megamenu">
            <div className="mega-grid">
              <div className="mega-col">
                <Link href="/services#audit"><h4>Audit & Assurance &rarr;</h4></Link>
                <ul>
                  <li>Statutory Audit</li>
                  <li>Internal Audit</li>
                  <li>Tax Audit</li>
                  <li>Risk Management</li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/services#tax"><h4>Direct Taxation &rarr;</h4></Link>
                <ul>
                  <li>Corporate Tax Planning</li>
                  <li>Tax Compliance</li>
                  <li>Assessments</li>
                  <li>Appellate Representation</li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/services#gst"><h4>GST & Indirect Tax &rarr;</h4></Link>
                <ul>
                  <li>GST Advisory</li>
                  <li>GST Filing</li>
                  <li>GST Assessments</li>
                  <li>Compliance Checks</li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/services#corporate"><h4>Corporate Law &rarr;</h4></Link>
                <ul>
                  <li>Company Incorporation</li>
                  <li>Secretarial Services</li>
                  <li>Restructuring</li>
                  <li>M&A Support</li>
                </ul>
              </div>
            </div>
            
            <div className="mega-banner">
              <div className="mega-banner-text">
                <strong>Need Assistance? Contact Us Today</strong>
                <span>Contact us now and transform your business compliance strategy today!</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/contact" className="btn solid" style={{ padding: '10px 20px' }}>Call Now</Link>
                <Link href="/contact" className="btn ghost" style={{ padding: '10px 20px', color: 'var(--navy-900)', borderColor: 'var(--navy-900)' }}>WhatsApp</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <Link className={pathname.startsWith('/knowledge') || pathname.startsWith('/blog') || pathname.startsWith('/news') || pathname.startsWith('/faq') ? 'active' : ''} href="#">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 3h9l3 3v15H6z" />
              <path d="M9 11h6M9 15h6" />
            </svg>
            Resources
            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Link>
          <div className="megamenu" style={{ minWidth: '250px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '8px' }}>
              <Link href="/news" style={{ display: 'block', padding: '12px', background: '#f8fafc', borderRadius: '8px', color: 'var(--navy-900)', textDecoration: 'none', fontWeight: '500', transition: 'all 0.2s' }} className="hover-bg-gray">Firm News & Updates</Link>
              <Link href="/blog" style={{ display: 'block', padding: '12px', background: '#f8fafc', borderRadius: '8px', color: 'var(--navy-900)', textDecoration: 'none', fontWeight: '500', transition: 'all 0.2s' }} className="hover-bg-gray">Technical Blogs</Link>
              <Link href="/faq" style={{ display: 'block', padding: '12px', background: '#f8fafc', borderRadius: '8px', color: 'var(--navy-900)', textDecoration: 'none', fontWeight: '500', transition: 'all 0.2s' }} className="hover-bg-gray">FAQs</Link>
            </div>
          </div>
        </div>
        <Link className={pathname === '/contact' ? 'active' : ''} href="/contact">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 6l9 7 9-7" />
          </svg>
          Contact
        </Link>
      </div>
      <Link className="navcta" href="/contact">Get Started</Link>
    </nav>
  );
}
