'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = (menu, e) => {
    // Only toggle on mobile screens
    if (window.innerWidth <= 900) {
      if (e) e.preventDefault();
      setMobileSubmenu(prev => prev === menu ? null : menu);
    }
  };

  return (
    <>
      {isOpen && <div className="nav-backdrop" onClick={() => setIsOpen(false)} />}
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
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" type="button">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
        <div className={`navlinks ${isOpen ? 'open' : ''}`}>
          <Link className={pathname === '/' ? 'active' : ''} href="/" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 11l8-7 8 7M6 10v10h12V10" />
            </svg>
            Home
          </Link>
          <Link className={pathname === '/about' ? 'active' : ''} href="/about" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8h.01M11 12h1v5h1" />
            </svg>
            About
          </Link>
          <div className={`dropdown ${mobileSubmenu === 'services' ? 'mobile-open' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Link className={pathname.startsWith('/services') ? 'active' : ''} href="/services" onClick={(e) => toggleSubmenu('services', e)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="4" y="8" width="16" height="11" rx="1" />
                  <path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" />
                </svg>
                Services
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileSubmenu === 'services' ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
            </div>
            <div className={`megamenu ${mobileSubmenu === 'services' ? 'show-mobile' : ''}`}>
            <div className="mega-grid">
              <div className="mega-col">
                <Link href="/services#audit" onClick={() => setIsOpen(false)}><h4>Audit & Assurance &rarr;</h4></Link>
                <ul>
                  <li><Link href="/services#audit" onClick={() => setIsOpen(false)}>Statutory Audit</Link></li>
                  <li><Link href="/services#audit" onClick={() => setIsOpen(false)}>Internal Audit</Link></li>
                  <li><Link href="/services#audit" onClick={() => setIsOpen(false)}>Tax Audit</Link></li>
                  <li><Link href="/services#audit" onClick={() => setIsOpen(false)}>Risk Management</Link></li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/services#tax" onClick={() => setIsOpen(false)}><h4>Direct Taxation &rarr;</h4></Link>
                <ul>
                  <li><Link href="/services#tax" onClick={() => setIsOpen(false)}>Corporate Tax Planning</Link></li>
                  <li><Link href="/services#tax" onClick={() => setIsOpen(false)}>Tax Compliance</Link></li>
                  <li><Link href="/services#tax" onClick={() => setIsOpen(false)}>Assessments</Link></li>
                  <li><Link href="/services#tax" onClick={() => setIsOpen(false)}>Appellate Representation</Link></li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/services#gst" onClick={() => setIsOpen(false)}><h4>GST & Indirect Tax &rarr;</h4></Link>
                <ul>
                  <li><Link href="/services#gst" onClick={() => setIsOpen(false)}>GST Advisory</Link></li>
                  <li><Link href="/services#gst" onClick={() => setIsOpen(false)}>GST Filing</Link></li>
                  <li><Link href="/services#gst" onClick={() => setIsOpen(false)}>GST Assessments</Link></li>
                  <li><Link href="/services#gst" onClick={() => setIsOpen(false)}>Compliance Checks</Link></li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/services#corporate" onClick={() => setIsOpen(false)}><h4>Corporate Law &rarr;</h4></Link>
                <ul>
                  <li><Link href="/services#corporate" onClick={() => setIsOpen(false)}>Company Incorporation</Link></li>
                  <li><Link href="/services#corporate" onClick={() => setIsOpen(false)}>Secretarial Services</Link></li>
                  <li><Link href="/services#corporate" onClick={() => setIsOpen(false)}>Restructuring</Link></li>
                  <li><Link href="/services#corporate" onClick={() => setIsOpen(false)}>M&A Support</Link></li>
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
        <div className={`dropdown ${mobileSubmenu === 'resources' ? 'mobile-open' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Link className={pathname.startsWith('/knowledge') || pathname.startsWith('/blog') || pathname.startsWith('/news') || pathname.startsWith('/faq') ? 'active' : ''} href="/knowledge" onClick={(e) => toggleSubmenu('resources', e)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 3h9l3 3v15H6z" />
                <path d="M9 11h6M9 15h6" />
              </svg>
              Resources
              <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: mobileSubmenu === 'resources' ? 'rotate(180deg)' : undefined, transition: 'transform 0.3s' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
          </div>
          <div className={`megamenu ${mobileSubmenu === 'resources' ? 'show-mobile' : ''}`}>
            <div className="mega-grid">
              <div className="mega-col">
                <Link href="/news" onClick={() => setIsOpen(false)}><h4>Firm News & Updates &rarr;</h4></Link>
                <ul>
                  <li><Link href="/news" onClick={() => setIsOpen(false)}>Regulatory Alerts</Link></li>
                  <li><Link href="/news" onClick={() => setIsOpen(false)}>Firm Announcements</Link></li>
                  <li><Link href="/news" onClick={() => setIsOpen(false)}>Market Insights</Link></li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/blog" onClick={() => setIsOpen(false)}><h4>Technical Blogs &rarr;</h4></Link>
                <ul>
                  <li><Link href="/blog" onClick={() => setIsOpen(false)}>Taxation Strategies</Link></li>
                  <li><Link href="/blog" onClick={() => setIsOpen(false)}>Corporate Structuring</Link></li>
                  <li><Link href="/blog" onClick={() => setIsOpen(false)}>Compliance Guides</Link></li>
                </ul>
              </div>
              <div className="mega-col">
                <Link href="/faq" onClick={() => setIsOpen(false)}><h4>FAQs &rarr;</h4></Link>
                <ul>
                  <li><Link href="/faq" onClick={() => setIsOpen(false)}>Audit Procedures</Link></li>
                  <li><Link href="/faq" onClick={() => setIsOpen(false)}>GST Queries</Link></li>
                  <li><Link href="/faq" onClick={() => setIsOpen(false)}>General Information</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mega-banner">
              <div className="mega-banner-text">
                <strong>Stay Updated with Our Insights</strong>
                <span>Explore our comprehensive library of resources, articles, and compliance alerts.</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link href="/blog" onClick={() => setIsOpen(false)} className="btn solid" style={{ padding: '10px 20px' }}>Read Blogs</Link>
              </div>
            </div>
          </div>
        </div>
        <Link className={pathname === '/contact' ? 'active' : ''} href="/contact" onClick={() => setIsOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="14" rx="1" />
            <path d="M3 6l9 7 9-7" />
          </svg>
          Contact
        </Link>
        <Link className="mobile-drawer-cta btn solid" href="/contact" onClick={() => setIsOpen(false)} style={{ marginTop: '20px', textAlign: 'center', width: '100%', padding: '14px' }}>
          Get Started
        </Link>
      </div>
      <Link className="navcta" href="/contact">Get Started</Link>
    </nav>
    </>
  );
}
