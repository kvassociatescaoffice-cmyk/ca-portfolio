'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Search } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const fetchBlogs = () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 9 });
    if (search) params.append('search', search);
    if (year) params.append('year', year);
    if (month) params.append('month', month);

    fetch(`/api/admin/blogs?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBlogs(data.data);
          setTotalPages(data.pagination?.pages || 1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, year, month]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchBlogs();
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
    <div style={{ background: 'var(--cream)', backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 237, 213, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(254, 215, 170, 0.4) 0px, transparent 50%)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', color: 'var(--navy-900)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(240, 102, 63, 0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Publications
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '1rem' }}>
            Insights & Resources
          </h1>
          <p style={{ color: 'var(--dim)', textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Expert analysis, financial updates, and corporate strategies from the desk of Kumar Vashishtha & Associates.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)' }} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 48px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="">All Years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)}
              disabled={!year}
              style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none', cursor: year ? 'pointer' : 'not-allowed', opacity: year ? 1 : 0.5 }}
            >
              <option value="">All Months</option>
              {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--dim)' }}>Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: '#fff', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--dim)' }}>No articles published yet matching your criteria. Check back soon!</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              {blogs.map(blog => (
                <Link href={`/blog/${blog.slug}`} key={blog._id} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', height: '100%', display: 'flex', flexDirection: 'column' }} className="hover-scale">
                    {blog.coverImage && (
                      <img 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                      />
                    )}
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--orange)', fontSize: '0.85rem', marginBottom: '12px', fontWeight: '500' }}>
                        <Calendar size={14} />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '12px', lineHeight: 1.4, fontFamily: "var(--font-fraunces), serif" }}>{blog.title}</h2>
                      <p style={{ color: 'var(--dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {blog.excerpt}
                      </p>
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {blog.tags?.map(tag => (
                          <span key={tag} style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px' }}>
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)} 
                  style={{ padding: '10px 24px', borderRadius: '30px', border: '1px solid #cbd5e1', background: '#fff', color: 'var(--navy-900)', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1, transition: 'background 0.2s', fontWeight: '500' }}
                  onMouseOver={(e) => { if(page !== 1) e.target.style.background = '#f8fafc' }}
                  onMouseOut={(e) => e.target.style.background = '#fff'}
                >
                  Previous
                </button>
                <span style={{ color: 'var(--dim)', fontSize: '1rem', fontWeight: '500' }}>Page {page} of {totalPages}</span>
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(p => p + 1)} 
                  style={{ padding: '10px 24px', borderRadius: '30px', border: '1px solid #cbd5e1', background: '#fff', color: 'var(--navy-900)', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1, transition: 'background 0.2s', fontWeight: '500' }}
                  onMouseOver={(e) => { if(page !== totalPages) e.target.style.background = '#f8fafc' }}
                  onMouseOut={(e) => e.target.style.background = '#fff'}
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
