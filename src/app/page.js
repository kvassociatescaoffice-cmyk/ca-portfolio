import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section style={styles.heroSection}>
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroContent} className="animate-slide-up">
            <h1 style={styles.heroTitle}>
              Excellence in <br/>
              <span className="gradient-text">Financial Advisory</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Empowering businesses with expert Audit, Taxation, and Corporate Law services since 1976. Trust built on decades of unparalleled service.
            </p>
            <div style={styles.heroButtons}>
              <Link href="/services" className="btn btn-primary hover-lift">Explore Services</Link>
              <Link href="/contact" className="btn btn-outline hover-lift" style={styles.btnHeroOutline}>Consult with us</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Financial / Achievement Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              <div className="ticker-item"><span style={{ color: 'var(--secondary)' }}>▲</span> BSE SENSEX 73,158.24 (+1.2%)</div>
              <div className="ticker-item"><span style={{ color: '#ef4444' }}>▼</span> NIFTY 50 22,212.70 (-0.4%)</div>
              <div className="ticker-item"><span style={{ color: 'var(--secondary)' }}>▲</span> GOLD (10g) ₹62,450</div>
              <div className="ticker-item"><span style={{ color: 'var(--accent)' }}>★</span> Awarded Top Advisory 2024</div>
              <div className="ticker-item"><span style={{ color: 'var(--secondary)' }}>▲</span> USD/INR 82.90</div>
            </div>
          ))}
        </div>
      </div>
      
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Our Core Expertise</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            We offer a comprehensive suite of financial and regulatory services tailored to help your business achieve strict compliance and maximum growth.
          </p>
        </div>
        
        <div className="bento-grid">
          {/* Audit - Tall Card */}
          <div className="bento-card bento-tall hover-glow">
            <div style={styles.cardPattern}></div>
            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'auto' }}>📊</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--primary)' }}>Audit & Assurance</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Comprehensive statutory, internal, and tax audits that go beyond mere compliance to offer strategic insights.</p>
              <Link href="/services#audit" style={{ color: 'var(--secondary)', fontWeight: '600' }}>Explore Audit &rarr;</Link>
            </div>
          </div>
          
          {/* Taxation - Wide Card */}
          <div className="bento-card bento-wide hover-glow" style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Direct Taxation</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', maxWidth: '80%' }}>Navigate complex tax regulations with confidence. We offer strategic tax planning and representation to minimize liabilities.</p>
              <Link href="/services#tax" style={{ color: 'var(--secondary)', fontWeight: '600' }}>Tax Services &rarr;</Link>
            </div>
          </div>
          
          {/* Standard Cards */}
          <div className="bento-card hover-glow">
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📑</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>GST Compliance</h3>
              <Link href="/services#gst" style={{ color: 'var(--primary)', fontWeight: '600' }}>Learn More &rarr;</Link>
            </div>
          </div>

          <div className="bento-card hover-glow">
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏢</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Corporate Law</h3>
              <Link href="/services#corporate" style={{ color: 'var(--primary)', fontWeight: '600' }}>Learn More &rarr;</Link>
            </div>
          </div>

          {/* Transaction Advisory - Wide Card */}
          <div className="bento-card bento-wide hover-glow" style={{ backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Transaction Advisory & M&A</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>End-to-end support for mergers, acquisitions, and restructuring.</p>
              <Link href="/services" style={{ color: 'var(--primary)', fontWeight: '600' }}>Explore Advisory &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Statistics Panel */}
      <section style={styles.statsSection}>
        <div className="container" style={styles.statsGrid}>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>45+</h3>
            <p style={styles.statLabel}>Years Experience</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>10k+</h3>
            <p style={styles.statLabel}>Clients Served</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>100%</h3>
            <p style={styles.statLabel}>Compliance Rate</p>
          </div>
          <div style={styles.statItem}>
            <h3 style={styles.statNumber}>150+</h3>
            <p style={styles.statLabel}>Professionals</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Dark Theme Upgrade */}
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: '#fff', marginTop: 'var(--space-xl)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Why Choose VJA Clone?</h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '1rem', lineHeight: '1.8' }}>
                We bring decades of experience, deep industry knowledge, and a commitment to absolute integrity. Our proactive approach ensures you're always ahead of regulatory curves.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
                {['Tailored Financial Strategies', 'Dedicated Expert Teams', 'Transparent Communication', 'Tech-Driven Solutions'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', fontSize: '1.1rem', fontWeight: 500 }}>
                    <span style={{ color: 'var(--secondary)', fontSize: '1.4rem' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }} className="hover-lift">
              <h3 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '1rem' }}>Ready to Scale?</h3>
              <p style={{ marginBottom: '2rem', color: '#cbd5e1', fontSize: '1.1rem' }}>Join thousands of satisfied clients who trust us with their financial future.</p>
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Schedule a Call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Insights & Firm News (Blog) */}
      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-md)' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem' }}>Insights & What's News</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Latest updates, tax rulings, and firm announcements.</p>
          </div>
          <Link href="/knowledge" style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View All News &rarr;</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { tag: 'Tax Update', title: 'New Guidelines for Income Tax E-Filing 2024', date: 'March 15, 2024' },
            { tag: 'Firm News', title: 'VJA Clone Named Top Advisory Firm of the Year', date: 'March 10, 2024' },
            { tag: 'GST Alert', title: 'Critical Changes to GST Input Tax Credit', date: 'March 5, 2024' }
          ].map((post, i) => (
            <div key={i} style={{ backgroundColor: '#fff', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }} className="hover-lift animate-slide-up">
              <div style={{ height: '200px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem', color: '#94a3b8' }}>📰</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span style={{ backgroundColor: 'rgba(83, 160, 66, 0.1)', color: 'var(--accent)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{post.tag}</span>
                <h3 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{post.date}</p>
                <Link href="/knowledge" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>Read Article &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership / Partners Section */}
      <section className="section container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Our Leadership</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>The visionaries behind our firm's success and client satisfaction.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          {[
            { name: 'Sanjay Jain', role: 'Managing Partner', exp: '30+ Years Exp', icon: '👨‍💼' },
            { name: 'Ankita Sharma', role: 'Head of Taxation', exp: '15+ Years Exp', icon: '👩‍💼' },
            { name: 'Rajiv Mehta', role: 'Audit Director', exp: '20+ Years Exp', icon: '👨‍💼' }
          ].map((leader, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} className="hover-lift">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{leader.icon}</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>{leader.name}</h3>
              <p style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>{leader.role}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{leader.exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Teaser */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>What Our Clients Say</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Trusted by startups, SMEs, and large enterprises across India.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Rahul Sharma', company: 'TechFlow Solutions', text: 'VJA Clone has been instrumental in restructuring our corporate taxation. Their advisory is top-notch and always timely.', rating: 5 },
              { name: 'Priya Desai', company: 'Desai & Co.', text: 'We have outsourced our entire GST compliance to them. 100% peace of mind. Highly recommended.', rating: 5 }
            ].map((review, i) => (
              <div key={i} style={{ padding: '2rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)', borderLeft: '4px solid var(--secondary)' }} className="hover-lift">
                <div style={{ color: '#fbbf24', fontSize: '1.25rem', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '1.5rem' }}>"{review.text}"</p>
                <p style={{ fontWeight: 700, color: 'var(--primary)' }}>{review.name}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{review.company}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/reviews" className="btn btn-outline hover-lift">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section style={{ backgroundColor: '#f8fafc', padding: '4rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Subscribe to our Circulars</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Get the latest tax updates and regulatory news delivered straight to your inbox.</p>
          <form style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="Your Email Address" style={{ padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', outline: 'none', flex: '1', minWidth: '250px' }} required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

const styles = {
  heroSection: {
    /* Using the generated hero image */
    background: 'linear-gradient(to right, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.7) 100%), url("/images/ca_hero_office.jpg") center/cover no-repeat',
    color: '#fff',
    padding: 'var(--space-xl) 0',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  heroContainer: {
    position: 'relative',
    zIndex: 2,
  },
  heroContent: {
    maxWidth: '650px',
  },
  heroTitle: {
    fontSize: '4.5rem',
    color: '#fff',
    marginBottom: 'var(--space-sm)',
    letterSpacing: '-1px',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#e2e8f0',
    marginBottom: 'var(--space-md)',
    lineHeight: '1.8',
    opacity: 0.9,
  },
  heroButtons: {
    display: 'flex',
    gap: 'var(--space-sm)',
    flexWrap: 'wrap',
  },
  btnHeroOutline: {
    color: '#fff', 
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 'var(--space-md)',
  },
  serviceCard: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  /* Using the generated abstract image as a subtle background pattern */
  cardPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'url("/images/ca_service_abstract.jpg") center/cover',
    opacity: 0.03,
    zIndex: 1,
  },
  statsSection: {
    backgroundColor: 'var(--primary)',
    padding: '4rem 0',
    color: '#fff',
    marginTop: 'var(--space-xl)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '3.5rem',
    color: 'var(--secondary)',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#cbd5e1',
  }
};
