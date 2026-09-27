'use client';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Reveal animation
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

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
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  const toggleFaq = (e) => {
    const item = e.currentTarget;
    item.classList.toggle('open');
  };

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

      <section id="why">
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
          <div className="art" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/images/why_choose_us.jpg" alt="Why Choose Us" style={{ width: '100%', maxWidth: '400px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section id="process" className="reveal" style={{ padding: '4vw 0' }}>
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

      <section className="reveal" style={{ background: 'var(--cream-bg)' }}>
        <div className="section-head">
          <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>Frequently Asked Questions</h2>
          <p>Everything you need to know about our services and process.</p>
        </div>
        <div className="faq-grid">
          <div className="faq-item" onClick={toggleFaq}>
            <div className="faq-q">
              What documents are required for GST Registration?
              <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </div>
            <div className="faq-a">For GST registration, we generally require your PAN card, Aadhaar card, proof of business registration or incorporation certificate, identity and address proof of promoters/directors, bank account statement or cancelled cheque, and proof of principal place of business.</div>
          </div>
          <div className="faq-item" onClick={toggleFaq}>
            <div className="faq-q">
              Do you offer remote or virtual CFO services?
              <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </div>
            <div className="faq-a">Yes, our Virtual CFO services provide you with high-level financial strategy, systems analysis, and operational optimization without the cost of a full-time executive. This service is fully remote and scaled to your needs.</div>
          </div>
          <div className="faq-item" onClick={toggleFaq}>
            <div className="faq-q">
              How often will we communicate during an audit?
              <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </div>
            <div className="faq-a">We maintain transparent, regular communication. During active audits, you will receive weekly status updates and immediate alerts for any urgent requirements or findings. Once finalized, we hold a comprehensive review meeting.</div>
          </div>
        </div>
      </section>

      <section className="reveal" style={{padding: '4vw 6vw'}}>
        <div style={{
          background: 'linear-gradient(110deg, var(--cream) 0%, var(--cream-card) 25%, var(--navy-800) 50%, var(--navy-900) 100%)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
            <img src="/images/cta_professional.jpg" alt="Professional" style={{ width: '100%', maxWidth: '400px', height: 'auto', mixBlendMode: 'multiply', maskImage: 'linear-gradient(to right, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }} />
          </div>
          <div style={{ flex: '1.5', minWidth: '350px', padding: '4vw 6vw', color: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: '#fff', lineHeight: 1.2, margin: 0 }}>Ready to Elevate Your Financial Strategy?</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '10px', color: '#fff' }}>Let's transform your vision into reality. Get a free consultation.</p>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <Link href="/contact" className="btn" style={{ background: '#fff', color: 'var(--navy-900)', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>Free Consultation</Link>
              <Link href="/contact" className="btn" style={{ background: '#25c168', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>WhatsApp</Link>
              <Link href="/contact" className="btn" style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '12px 24px', fontWeight: 'bold' }}>Call Now</Link>
            </div>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', opacity: 0.8, marginTop: '20px', flexWrap: 'wrap', color: '#fff' }}>
              <span>📞 +91-7701 999 395</span>
              <span>✉️ kvassociatescaoffice@gmail.com</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
