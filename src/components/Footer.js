import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <h3 style={{color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-fraunces)'}}>KVA</h3>
          <p>Empowering your business with strategic financial insight, uncompromising integrity, and rigorous compliance.</p>
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
