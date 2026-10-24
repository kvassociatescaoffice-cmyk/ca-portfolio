'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const tags = ['All', 'Taxation', 'Income Tax', 'GST', 'Audit', 'Startups', 'Company Law'];

export default function KnowledgeCenter() {
  const [activeTag, setActiveTag] = useState('All');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blogs?limit=50')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setArticles(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredArticles = activeTag === 'All' 
    ? articles 
    : articles.filter(a => a.tags?.some(t => t.toLowerCase().includes(activeTag.toLowerCase())));

  return (
    <section className="subpage-section" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Knowledge Center</h1>
      <p style={{ textAlign: 'center', color: 'var(--dim)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Stay updated with the latest circulars, analysis, and insights from our experts.
      </p>

      {/* Filter Tabs */}
      <div className="knowledge-tags-carousel" style={styles.filterContainer}>
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
      <style jsx>{`
        @media(max-width: 768px) {
          .knowledge-tags-carousel {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding-bottom: 12px !important;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .knowledge-tags-carousel::-webkit-scrollbar {
            display: none;
          }
          .knowledge-tags-carousel button {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
        }
      `}</style>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dim)' }}>Loading knowledge articles...</div>
      ) : filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dim)' }}>No articles found for this category.</div>
      ) : (
        <div style={styles.grid}>
          {filteredArticles.map(article => (
            <div key={article._id} style={styles.card} className="insight">
              <span style={styles.tagBadge}>{article.tags?.[0] || 'Advisory'}</span>
              <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--navy-900)' }}>{article.title}</h3>
              <p style={{ color: 'var(--dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <div style={{ fontSize: '0.95rem', color: 'var(--dim)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {article.excerpt}
              </div>
              <Link href={`/blog/${article.slug}`} style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'none', marginTop: 'auto' }}>
                Read Article &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}
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
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--border)',
    background: '#ffffff',
    color: 'var(--ink)',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s ease',
  },
  activeFilter: {
    background: 'var(--primary)',
    color: '#ffffff',
    borderColor: 'var(--primary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
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
