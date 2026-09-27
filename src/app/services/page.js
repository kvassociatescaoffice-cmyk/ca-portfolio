'use client';
import { useState } from 'react';

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
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(servicesData[0]);

  return (
    <section>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Our Services</h1>
      
      <div style={styles.container}>
        {/* Sidebar Tabs */}
        <div style={styles.tabsList}>
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
          <h2 style={{ fontSize: '2rem', color: 'var(--navy-800)' }}>{activeTab.title}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.5rem', fontWeight: 500 }}>
            {activeTab.desc}
          </p>
          <div style={{ height: '1px', background: 'var(--line)', marginBottom: '1.5rem' }}></div>
          <p style={{ color: 'var(--dim)', lineHeight: '1.8' }}>
            {activeTab.details}
          </p>
          <button className="btn solid" style={{ marginTop: '2rem' }}>Request Consultation</button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  tabsList: {
    flex: '1',
    minWidth: '250px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  tabBtn: {
    padding: '1rem 1.5rem',
    textAlign: 'left',
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--text-primary)',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    background: 'var(--primary)',
    color: '#fff',
    border: '1px solid var(--primary)',
    boxShadow: 'var(--shadow-md)',
    transform: 'translateX(5px)',
  },
  contentPanel: {
    flex: '2',
    minWidth: '300px',
    padding: '3rem',
    borderRadius: 'var(--radius-lg)',
  }
};
