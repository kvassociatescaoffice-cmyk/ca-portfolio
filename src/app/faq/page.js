'use client';
import { useEffect, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchFaqs = () => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 10 });
    if (search) params.append('search', search);

    fetch(`/api/admin/faqs?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFaqs(data.data);
          setTotalPages(data.pagination?.pages || 1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFaqs();
  }, [page]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchFaqs();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const toggleFaq = (e) => {
    const item = e.currentTarget;
    item.classList.toggle('open');
  };

  return (
    <div style={{ background: 'var(--navy-900)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', color: '#fff' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Support & Info
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-fraunces), serif', color: '#fff', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--lav)', textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Everything you need to know about our services, process, and billing.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }} />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 48px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--lav)' }}>Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--lav)' }}>No FAQs found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="faq-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {faqs.map(faq => (
                <div 
                  key={faq._id} 
                  className="faq-item" 
                  onClick={toggleFaq}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', cursor: 'pointer', overflow: 'hidden' }}
                >
                  <div className="faq-q" style={{ padding: '24px', fontSize: '1.2rem', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
                    {faq.question}
                    <ChevronDown className="chevron" size={20} style={{ color: 'var(--gold)', transition: 'transform 0.3s' }} />
                  </div>
                  <div className="faq-a" style={{ padding: '0 24px 24px', color: 'var(--lav)', fontSize: '1rem', lineHeight: '1.7', display: 'none' }} dangerouslySetInnerHTML={{ __html: faq.answer }} />
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
        
        {/* CSS for FAQ toggling within this scoped component */}
        <style dangerouslySetInnerHTML={{__html: `
          .faq-item.open .faq-a { display: block !important; }
          .faq-item.open .chevron { transform: rotate(180deg); }
          .faq-item:hover { background: rgba(255,255,255,0.06) !important; }
        `}} />
      </div>
    </div>
  );
}
