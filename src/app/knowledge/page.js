'use client';
import { useState } from 'react';

const articles = [
  { id: 1, title: 'Union Budget 2024 Analysis', tag: 'Taxation', date: 'Feb 2, 2024' },
  { id: 2, title: 'New GST E-Invoicing Rules', tag: 'GST', date: 'Jan 15, 2024' },
  { id: 3, title: 'Compliance Calendar Q4 FY24', tag: 'Compliance', date: 'Dec 28, 2023' },
  { id: 4, title: 'FDI Policy Updates 2024', tag: 'Corporate Law', date: 'Jan 10, 2024' },
  { id: 5, title: 'Income Tax Return Filing Guide', tag: 'Taxation', date: 'May 10, 2023' },
  { id: 6, title: 'Recent Supreme Court GST Rulings', tag: 'GST', date: 'Nov 5, 2023' },
];

const tags = ['All', 'Taxation', 'GST', 'Compliance', 'Corporate Law'];

export default function KnowledgeCenter() {
  const [activeTag, setActiveTag] = useState('All');

  const filteredArticles = activeTag === 'All' 
    ? articles 
    : articles.filter(a => a.tag === activeTag);

  return (
    <section>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Knowledge Center</h1>
      <p style={{ textAlign: 'center', color: 'var(--dim)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Stay updated with the latest circulars, analysis, and insights from our experts.
      </p>

      {/* Filter Tabs */}
      <div style={styles.filterContainer}>
        {tags.map(tag => (
          <button 
            key={tag} 
            onClick={() => setActiveTag(tag)}
            style={{
              ...styles.filterBtn,
              ...(activeTag === tag ? styles.activeFilter : {})
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {filteredArticles.map(article => (
          <div key={article.id} style={styles.card} className="insight">
            <span style={styles.tagBadge}>{article.tag}</span>
            <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{article.title}</h3>
            <p style={{ color: 'var(--dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{article.date}</p>
            <a href="#" style={{ color: 'var(--orange)', fontWeight: 600 }}>Read Article &rarr;</a>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.5rem 1.5rem',
    borderRadius: '20px',
    border: '1px solid var(--border)',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s ease',
  },
  activeFilter: {
    background: 'var(--primary)',
    color: '#fff',
    borderColor: 'var(--primary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '2rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    transition: 'transform 0.3s ease',
  },
  tagBadge: {
    background: 'rgba(212, 175, 55, 0.1)',
    color: 'var(--secondary)',
    padding: '0.25rem 0.75rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 600,
  }
};
