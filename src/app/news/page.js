'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, Search, Filter } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const fetchNews = () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 9 });
    if (search) params.append('search', search);
    if (year) params.append('year', year);
    if (month) params.append('month', month);

    fetch(`/api/admin/news?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNews(data.data);
          setTotalPages(data.pagination?.pages || 1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, [page, year, month]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchNews();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 10}, (_, i) => currentYear - i);
  const months = [
    { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' },
    { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' },
    { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' },
    { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' }
  ];

  return (
    <div style={{ background: 'var(--navy-900)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Announcements
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-fraunces), serif', color: '#fff', marginBottom: '1rem' }}>
            Firm Updates & News
          </h1>
          <p style={{ color: 'var(--lav)', textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Latest announcements, regulatory alerts, and insights.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
            <input 
              type="text" 
              placeholder="Search updates..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 48px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="" style={{ color: '#000' }}>All Years</option>
              {years.map(y => <option key={y} value={y} style={{ color: '#000' }}>{y}</option>)}
            </select>
            
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)}
              disabled={!year}
              style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', cursor: year ? 'pointer' : 'not-allowed', opacity: year ? 1 : 0.5 }}
            >
              <option value="" style={{ color: '#000' }}>All Months</option>
              {months.map(m => <option key={m.value} value={m.value} style={{ color: '#000' }}>{m.label}</option>)}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--lav)' }}>Loading updates...</div>
        ) : news.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--lav)' }}>No firm updates found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              {news.map((item) => (
                <div key={item._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, background 0.3s' }} className="hover-scale">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '16px', fontWeight: '500' }}>
                    <Calendar size={16} />
                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '16px', lineHeight: 1.4, fontFamily: "var(--font-fraunces), serif" }}>{item.title}</h2>
                  <div style={{ fontSize: '1rem', color: 'var(--lav)', lineHeight: 1.7, marginBottom: '24px', flex: 1, opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: item.content }} />
                  {item.sourceUrl && (
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--orange)', fontWeight: 'bold', fontSize: '1rem', textDecoration: 'none' }}>
                      Read Full Source <ChevronRight size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)} 
                  style={{ padding: '10px 24px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1, transition: 'background 0.2s' }}
                  onMouseOver={(e) => { if(page !== 1) e.target.style.background = 'rgba(255,255,255,0.1)' }}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  Previous
                </button>
                <span style={{ color: 'var(--lav)', fontSize: '1rem' }}>Page {page} of {totalPages}</span>
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(p => p + 1)} 
                  style={{ padding: '10px 24px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1, transition: 'background 0.2s' }}
                  onMouseOver={(e) => { if(page !== totalPages) e.target.style.background = 'rgba(255,255,255,0.1)' }}
                  onMouseOut={(e) => e.target.style.background = 'transparent'}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
