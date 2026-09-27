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

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-art">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <rect width="1200" height="800" fill="#123a6b"/>
            <g opacity=".5" fill="#0d1d3a">
              <rect x="60" y="260" width="90" height="540"/>
              <rect x="170" y="180" width="70" height="620"/>
              <rect x="900" y="120" width="80" height="680"/>
              <rect x="1000" y="220" width="60" height="580"/>
              <rect x="1080" y="60" width="70" height="740"/>
            </g>
            <circle cx="600" cy="180" r="150" fill="url(#g1)" opacity=".3"/>
            <defs>
              <radialGradient id="g1">
                <stop offset="0%" stopColor="#c99a52"/>
                <stop offset="100%" stopColor="#123a6b" stopOpacity="0"/>
              </radialGradient>
            </defs>
          </svg>
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
          <div className="art">
            <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="500" fill="#123a6b"/>
              <polyline points="30,420 110,340 170,390 240,260 320,300 370,180" fill="none" stroke="#c99a52" strokeWidth="2"/>
              <g fill="#f0663f">
                <circle cx="110" cy="340" r="4"/>
                <circle cx="240" cy="260" r="4"/>
                <circle cx="370" cy="180" r="4"/>
              </g>
              <line x1="30" y1="450" x2="370" y2="450" stroke="rgba(255,255,255,.15)"/>
              <text x="30" y="80" fill="#fff" fontFamily="Georgia, serif" fontSize="28" fontStyle="italic">Growth,</text>
              <text x="30" y="118" fill="#c99a52" fontFamily="Georgia, serif" fontSize="28" fontStyle="italic">audited.</text>
            </svg>
          </div>
        </div>
      </section>

      <section id="process" className="reveal">
        <div className="section-head">
          <h2 style={{fontSize: 'clamp(1.9rem, 3.6vw, 3rem)'}}>How we work together</h2>
          <p>A clear, predictable engagement from first call to filed return.</p>
        </div>
        <div className="timeline">
          <div className="tl-step"><div className="line"></div><div className="dot"></div><span className="yr">Step 1</span><h3>Discovery call</h3><p style={{fontSize: '.94rem'}}>We map your structure, filings and pain points in a 30-minute conversation.</p></div>
          <div className="tl-step"><div className="line"></div><div className="dot"></div><span className="yr">Step 2</span><h3>Proposal & scope</h3><p style={{fontSize: '.94rem'}}>A written engagement letter with fixed fees, deliverables and timelines.</p></div>
          <div className="tl-step"><div className="line"></div><div className="dot"></div><span className="yr">Step 3</span><h3>Onboarding</h3><p style={{fontSize: '.94rem'}}>Secure document handover and a dedicated team assigned to your account.</p></div>
          <div className="tl-step"><div className="line"></div><div className="dot"></div><span className="yr">Step 4</span><h3>Execution</h3><p style={{fontSize: '.94rem'}}>Filings, audits and advisory delivered on schedule, reviewed at each stage.</p></div>
          <div className="tl-step"><span className="yr">Step 5</span><h3>Ongoing advisory</h3><p style={{fontSize: '.94rem'}}>Quarterly reviews and proactive alerts as regulation changes.</p></div>
        </div>
      </section>

      <section className="reveal" style={{paddingTop: 0}}>
        <div className="ctaband" style={{padding: '80px 6vw'}}>
          <h2>Ready to scale with confidence?</h2>
          <p>Join thousands of businesses who trust us with their financial future.</p>
          <Link href="/contact" className="btn solid">SCHEDULE A CALL</Link>
        </div>
      </section>
    </>
  );
}
