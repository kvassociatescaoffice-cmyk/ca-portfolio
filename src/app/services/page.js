'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const servicesData = [
  { 
    id: 'audit', 
    title: 'Audit & Assurance', 
    desc: 'Statutory audit, internal audit, tax audit, and comprehensive risk management.',
    details: 'Our audit process goes beyond mere compliance. We provide deep insights into your internal controls, operational efficiency, and risk landscape to help safeguard your business.'
  },
  { 
    id: 'tax', 
    title: 'Direct Taxation', 
    desc: 'Corporate tax planning, compliance, assessments, and appellate representation.',
    details: 'Navigate complex tax regulations with confidence. We offer strategic tax planning and represent clients before tax authorities to minimize liabilities legally.'
  },
  { 
    id: 'gst', 
    title: 'GST & Indirect Tax', 
    desc: 'End-to-end GST advisory, filing, assessments, and regular compliance checks.',
    details: 'Ensure seamless GST compliance with our end-to-end advisory services, including monthly filings, annual audits, and dispute resolution.'
  },
  { 
    id: 'corporate', 
    title: 'Corporate Law', 
    desc: 'Company incorporation, secretarial services, and restructuring.',
    details: 'From incorporating new entities to managing complex mergers and secretarial compliance, our corporate law team ensures your business structures are robust.'
  },
  { 
    id: 'advisory', 
    title: 'Transaction Advisory & M&A', 
    desc: 'Valuation, deal structuring, due diligence, and capital advisory.',
    details: 'Comprehensive support through high-stakes transactions, mergers, equity financing, DPIIT startup recognitions, and RBI FEMA cross-border compliance.'
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(servicesData[0]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const tab = servicesData.find(s => s.id === hash);
        if (tab) setActiveTab(tab);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <section className="subpage-section" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Our Services</h1>
      
      <div className="services-layout-container" style={styles.container}>
        {/* Sidebar Tabs */}
        <div className="services-tabs-carousel" style={styles.tabsList}>
          {servicesData.map(s => (
            <button 
              key={s.id} 
              onClick={() => setActiveTab(s)}
              style={{
                ...styles.tabBtn,
                ...(activeTab.id === s.id ? styles.activeTab : {})
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Dynamic Content Panel */}
        <div style={styles.contentPanel}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--navy-800)', marginBottom: '1rem' }}>{activeTab.title}</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '1.5rem', fontWeight: 500, lineHeight: 1.6 }}>
            {activeTab.desc}
          </p>
          <div style={{ height: '1px', background: 'var(--line)', marginBottom: '1.5rem' }}></div>
          <p style={{ color: 'var(--dim)', lineHeight: '1.8', fontSize: '0.98rem' }}>
            {activeTab.details}
          </p>
          <Link href="/contact" className="btn solid" style={{ marginTop: '2rem', display: 'inline-block', textDecoration: 'none' }}>Request Consultation</Link>
        </div>
      </div>
      <style jsx>{`
        @media(max-width: 800px) {
          .services-tabs-carousel {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
            gap: 10px !important;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .services-tabs-carousel::-webkit-scrollbar {
            display: none;
          }
          .services-tabs-carousel button {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            padding: 10px 18px !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  tabsList: {
    flex: '1',
    minWidth: 'min(280px, 100%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  tabBtn: {
    padding: '1rem 1.25rem',
    textAlign: 'left',
    background: '#fff',
    border: '1px solid var(--line)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'var(--ink)',
    transition: 'all 0.2s ease',
    whiteSpace: 'normal',
    flexShrink: 0,
  },
  activeTab: {
    background: 'var(--navy-800)',
    color: '#fff',
    border: '1px solid var(--navy-800)',
    boxShadow: '0 8px 16px rgba(13,29,58,.1)',
  },
  contentPanel: {
    flex: '2',
    minWidth: 'min(280px, 100%)',
    padding: 'clamp(1.5rem, 4vw, 3rem)',
    borderRadius: 'var(--radius-lg)',
    background: '#ffffff',
    border: '1px solid var(--line)',
    boxShadow: '0 8px 24px rgba(13,29,58,0.04)'
  }
};
