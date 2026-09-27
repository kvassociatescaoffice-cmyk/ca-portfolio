import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/images/Logo.png" alt="CA India Logo" style={{ height: '40px', width: 'auto' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1, fontFamily: "var(--font-fraunces), 'Fraunces', serif" }}>
              <span style={{ 
                background: 'linear-gradient(100deg, var(--gold), #ffdf91)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontWeight: '800', 
                fontSize: '1.4rem'
              }}>
                Kumar Vashishtha
              </span>
              <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.5px', opacity: 0.9 }}>
                & Associates
              </span>
            </div>
          </div>
          <p style={{ marginTop: '16px' }}>Empowering your business with strategic financial insight, uncompromising integrity, and rigorous compliance.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <Link href="/services">Services</Link>
            <Link href="/knowledge">Resources</Link>
            <Link href="/reviews">Testimonials</Link>
            <Link href="/contact">Contact</Link>
          </ul>
        </div>
        <div>
          <h4>Core Services</h4>
          <ul>
            <Link href="/services#audit">Audit & Assurance</Link>
            <Link href="/services#tax">Direct Taxation</Link>
            <Link href="/services#gst">GST Compliance</Link>
            <Link href="/services#corporate">Corporate Law</Link>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>123 Financial District, New Delhi, India 110001</li>
            <li>+91 7701 999 395</li>
            <li>kvassociatescaoffice@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} Kumar Vashishtha & Associates. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
