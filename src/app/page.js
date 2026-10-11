'use client';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, TrendingDown, Award, Calendar, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [faqs, setFaqs] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Fetch dynamic content
    fetch('/api/admin/faqs?limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) setFaqs(data.data);
      })
      .catch(() => {});

    fetch('/api/admin/news?limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) setNews(data.data);
      })
      .catch(() => {});

    fetch('/api/admin/blogs?limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) setBlogs(data.data);
      })
      .catch(() => {});

    // Stats counter animation
    const counters = document.querySelectorAll('.stat .n');
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const el = e.target;
        const txt = el.textContent.trim();
        const match = txt.match(/[\d.]+/);
        if (!match) return;
        
        const target = parseFloat(match[0]);
        const suffix = txt.replace(match[0], '');
        let cur = 0;
        const dur = 1100;
        const start = performance.now();
        
        function step(t) {
          const p = Math.min((t - start) / dur, 1);
          cur = target * (1 - Math.pow(1 - p, 3));
          el.textContent = (target % 1 === 0 ? Math.round(cur) : cur.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });

    counters.forEach((c) => cio.observe(c));
    
    return () => {
      cio.disconnect();
    };
  }, []);

  // Ensure reveal elements are observed and shown even when dynamically loaded
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        }
      });
    }, { threshold: 0.05 });

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('in');
        }
        io.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [faqs, news, blogs]);

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-art">
          <img src="/images/hero_office.jpg" alt="Professional Office" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="eyebrow">Chartered Accountants · Since 1976</div>
        <h1>Excellence in<br/><span className="grad">Financial Advisory</span></h1>
        <p className="lead">Empowering businesses with expert Audit, Taxation and Corporate Law services since 1976. Trust built on decades of unparalleled service.</p>
        <div className="hero-cta">
          <Link href="#services" className="btn solid">EXPLORE SERVICES</Link>
          <Link href="/contact" className="btn ghost">CONSULT WITH US</Link>
        </div>
      </section>

      <div className="ticker-wrap">
        <div className="ticker">
          <span><TrendingUp className="up" size={16} /> BSE SENSEX 73,158.24 (+1.2%)</span>
          <span><TrendingDown className="down" size={16} /> NIFTY 50 22,212.70 (-0.4%)</span>
          <span><TrendingUp className="up" size={16} /> GOLD (10g) ₹62,450</span>
          <span><Award className="medal" size={16} /> Awarded Top Advisory 2024</span>
          <span><TrendingUp className="up" size={16} /> USD/INR 82.90</span>
          <span><TrendingUp className="up" size={16} /> BSE SENSEX 73,158.24 (+1.2%)</span>
          <span><TrendingDown className="down" size={16} /> NIFTY 50 22,212.70 (-0.4%)</span>
          <span><Award className="medal" size={16} /> Awarded Top Advisory 2024</span>
        </div>
      </div>

      <section id="services" className="reveal">
        <div className="section-head">
          <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>Our Core Expertise</h2>
          <p>We offer a comprehensive suite of financial and regulatory services tailored to help your business achieve strict compliance and maximum growth.</p>
        </div>
        <div className="bento">
          <div className="item i1">
            <img src="/images/audit.jpg" alt="Audit & Assurance" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            <h3>Audit & Assurance</h3>
            <p>Comprehensive statutory, internal, and tax audits that go beyond mere compliance to offer strategic insights.</p>
            <Link href="/services#audit" className="more">Explore Audit &rarr;</Link>
          </div>
          <div className="item i2">
            <img src="/images/tax.jpg" alt="Direct Taxation" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            <h3>Direct Taxation</h3>
            <p>Navigate complex tax regulations with confidence. We offer strategic tax planning and representation to minimize liabilities.</p>
            <Link href="/services#tax" className="more">Tax Services &rarr;</Link>
          </div>
          <div className="item i3">
            <img src="/images/gst.jpg" alt="GST Compliance" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            <h3>GST Compliance</h3>
            <Link href="/services#gst" className="more">Learn More &rarr;</Link>
          </div>
          <div className="item i4">
            <img src="/images/law.jpg" alt="Corporate Law" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            <h3>Corporate Law</h3>
            <Link href="/services#corporate" className="more">Learn More &rarr;</Link>
          </div>
          <div className="item i5">
            <img src="/images/advisory.jpg" alt="Transaction Advisory" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            <h3>Transaction Advisory & M&A</h3>
            <p>End-to-end support for mergers, acquisitions, and restructuring.</p>
            <Link href="/services#advisory" className="more">Explore Advisory &rarr;</Link>
          </div>
        </div>
      </section>

      <div className="stats reveal">
        <div className="stat"><div className="n">45+</div><div className="l">Years Experience</div></div>
        <div className="stat"><div className="n">10k+</div><div className="l">Clients Served</div></div>
        <div className="stat"><div className="n">100%</div><div className="l">Compliance Rate</div></div>
        <div className="stat"><div className="n">150+</div><div className="l">Professionals</div></div>
      </div>

      <section id="why" style={{ background: "#ffffff", borderTop: "1px solid rgba(22,35,61,0.06)" }}>
        <div className="why reveal">
          <div>
            <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>Why choose Kumar Vashishtha & Associates?</h2>
            <p style={{marginTop: '18px'}}>Decades of experience, deep industry knowledge, and a commitment to absolute integrity. Our proactive approach keeps you ahead of every regulatory curve.</p>
            <ul>
              <li>Tailored financial strategies for your sector</li>
              <li>Dedicated expert teams, not a rotating desk</li>
              <li>Transparent, plain-language communication</li>
              <li>Tech-driven filing and reporting infrastructure</li>
            </ul>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/images/why_choose_us.jpg" alt="Why Choose Us" style={{ width: '100%', maxWidth: '480px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section id="process" className="reveal" style={{ background: "#ffffff", borderBottom: "1px solid rgba(22,35,61,0.06)", paddingLeft: 0, paddingRight: 0 }}>
        <div className="section-head" style={{ padding: '0 6vw', marginBottom: '2rem' }}>
          <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>How we work together</h2>
          <p>A clear, predictable engagement from first call to filed return.</p>
        </div>
        
        <div style={{ padding: '0 6vw' }}>
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            padding: '2rem 0', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            <div className="process-card" style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <span className="yr">Step 1</span>
            <h3>Discovery call</h3>
            <p style={{fontSize: '.94rem', color: 'var(--dim)', lineHeight: 1.6}}>We map your structure, filings and pain points in a 30-minute conversation.</p>
          </div>
          <div className="process-card" style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <span className="yr">Step 2</span>
            <h3>Proposal & scope</h3>
            <p style={{fontSize: '.94rem', color: 'var(--dim)', lineHeight: 1.6}}>A written engagement letter with fixed fees, deliverables and timelines.</p>
          </div>
          <div className="process-card" style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <span className="yr">Step 3</span>
            <h3>Onboarding</h3>
            <p style={{fontSize: '.94rem', color: 'var(--dim)', lineHeight: 1.6}}>Secure document handover and a dedicated team assigned to your account.</p>
          </div>
          <div className="process-card" style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <span className="yr">Step 4</span>
            <h3>Execution</h3>
            <p style={{fontSize: '.94rem', color: 'var(--dim)', lineHeight: 1.6}}>Filings, audits and advisory delivered on schedule, reviewed at each stage.</p>
          </div>
          <div className="process-card" style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <span className="yr">Step 5</span>
            <h3>Ongoing advisory</h3>
            <p style={{fontSize: '.94rem', color: 'var(--dim)', lineHeight: 1.6}}>Quarterly reviews and proactive alerts as regulation changes.</p>
          </div>
          {/* Spacer to allow scrolling past the last item */}
          <div style={{ minWidth: '2vw', flexShrink: 0 }}></div>
        </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="reveal" style={{ background: 'var(--cream)' }}>
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>Firm News & Updates</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ margin: 0 }}>Latest announcements, regulatory alerts, and insights from our experts.</p>
              <Link href="/news" className="btn ghost-dark" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>View All Updates &rarr;</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {news.slice(0, 3).map((item) => (
              <div key={item._id} style={{ background: '#fff', border: '1px solid rgba(22,35,61,0.08)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }} className="hover-scale">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dim)', fontSize: '0.85rem', marginBottom: '12px' }}>
                  <Calendar size={14} />
                  {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', marginBottom: '12px', lineHeight: 1.4 }}>{item.title}</h3>
                <div style={{ fontSize: '0.95rem', color: 'var(--dim)', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: item.content }} />
                {item.sourceUrl && (
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--orange)', fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none' }}>
                    Read Full Alert <ChevronRight size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {blogs.length > 0 && (
        <section className="reveal" style={{ background: 'var(--cream)', paddingTop: '0px' }}>
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>Technical Blogs</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <p style={{ margin: 0 }}>Deep dives into taxation, compliance, and corporate structuring.</p>
              <Link href="/blog" className="btn ghost-dark" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>View All Blogs &rarr;</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {blogs.slice(0, 3).map((item) => (
              <div key={item._id} style={{ background: '#fff', border: '1px solid rgba(22,35,61,0.08)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }} className="hover-scale">
                {item.coverImage && (
                  <img src={item.coverImage} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dim)', fontSize: '0.85rem', marginBottom: '12px' }}>
                    <Calendar size={14} />
                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', marginBottom: '12px', lineHeight: 1.4 }}>{item.title}</h3>
                  <div style={{ fontSize: '0.95rem', color: 'var(--dim)', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: item.excerpt || item.content }} />
                  <div style={{ marginTop: 'auto' }}>
                    <Link href={`/blog/${item.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--orange)', fontWeight: 'bold', fontSize: '0.9rem', textDecoration: 'none' }}>
                      Read Article <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="reveal" style={{ background: '#ffffff', borderTop: '1px solid rgba(22,35,61,0.06)', borderBottom: '1px solid rgba(22,35,61,0.06)' }}>
          <div className="faq-section-wrap">
            <div className="faq-sidebar">
              <div style={{ display: 'inline-block', padding: '5px 14px', background: 'rgba(240, 102, 63, 0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.82rem', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Support & Clarity
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', color: 'var(--navy-900)', lineHeight: 1.15, marginBottom: '16px' }}>Frequently Asked Questions</h2>
              <p style={{ color: 'var(--dim)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Clear, transparent guidance on compliance timelines, audits, tax representations, and working with our senior partners.
              </p>
              
              <div className="faq-prompt-card">
                <h4>Have a specific query?</h4>
                <p>Can&apos;t find what you&apos;re looking for? Speak directly with our chartered accountants.</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link href="/faq" className="btn ghost-dark" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
                    View All FAQs &rarr;
                  </Link>
                  <Link href="/contact" className="btn solid" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
                    Ask Our Team
                  </Link>
                </div>
              </div>
            </div>

            <div className="faq-grid">
              {faqs.slice(0, 6).map(faq => {
                const isOpen = openFaq === faq._id;
                return (
                  <div 
                    key={faq._id} 
                    className={`faq-item ${isOpen ? 'open' : ''}`} 
                    onClick={() => setOpenFaq(isOpen ? null : faq._id)}
                  >
                    <div className="faq-q">
                      <span>{faq.question}</span>
                      <svg 
                        className="chevron" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                    <div 
                      className="faq-a" 
                      dangerouslySetInnerHTML={{ __html: faq.answer }} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="reveal" style={{ padding: 'clamp(40px, 6vw, 80px) clamp(16px, 6vw, 60px)', background: 'var(--cream)' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0d1d3a 0%, #12335e 50%, #16233d 100%)', boxShadow: '0 24px 60px rgba(13,29,58,0.18)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ flex: '1', minWidth: 'min(280px, 100%)', display: 'flex', justifyContent: 'center', padding: 'clamp(20px, 4vw, 40px)' }}>
            <img src="/images/cta_professional.jpg" alt="Professional" style={{ width: '100%', maxWidth: '400px', height: 'auto', mixBlendMode: 'multiply', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 72%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 72%)' }} />
          </div>
          <div style={{ flex: '1.5', minWidth: 'min(280px, 100%)', padding: 'clamp(24px, 4vw, 60px)', color: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)', color: '#fff', lineHeight: 1.2, margin: 0 }}>Ready to Elevate Your Financial Strategy?</h2>
            <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', opacity: 0.9, marginBottom: '10px', color: '#fff' }}>Let's transform your vision into reality. Contact us today.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--navy-900)', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>Contact Us</Link>
              <Link href="/contact" className="btn" style={{ background: '#25c168', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>WhatsApp</Link>
              <Link href="/contact" className="btn" style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>Call Now</Link>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', opacity: 0.85, marginTop: '10px', flexWrap: 'wrap', color: '#fff' }}>
              <span>📞 +91-7701 999 395</span>
              <span>✉️ kvassociatescaoffice@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
