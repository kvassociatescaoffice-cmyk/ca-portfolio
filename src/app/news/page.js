'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/news?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.success) setNews(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: '6vw', background: '#f8fafc', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--navy-900)', fontFamily: "var(--font-fraunces), serif" }}>Firm Updates & News</h1>
        <p style={{ color: 'var(--dim)', fontSize: '1.2rem', marginTop: '1rem' }}>Latest announcements, regulatory alerts, and insights.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading news...</div>
      ) : news.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>No firm updates found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
          {news.map((item) => (
            <div key={item._id} style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dim)', fontSize: '0.9rem', marginBottom: '16px' }}>
                <Calendar size={16} />
                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '16px', lineHeight: 1.4 }}>{item.title}</h2>
              <div style={{ fontSize: '1rem', color: 'var(--navy-800)', lineHeight: 1.7, marginBottom: '24px', flex: 1 }} dangerouslySetInnerHTML={{ __html: item.content }} />
              {item.sourceUrl && (
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--orange)', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>
                  Read Full Source <ChevronRight size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
