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
    <div style={{ background: 'var(--cream)', backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 237, 213, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(254, 215, 170, 0.4) 0px, transparent 50%)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', color: 'var(--navy-900)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(240, 102, 63, 0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Support & Info
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--dim)', textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Everything you need to know about our services, process, and billing.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px', background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)' }} />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 48px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', color: 'var(--navy-900)', fontSize: '1rem', outline: 'none' }}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--dim)' }}>Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: '#fff', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--dim)' }}>No FAQs found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="faq-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {faqs.map(faq => (
                <div 
                  key={faq._id} 
                  className="faq-item" 
                  onClick={toggleFaq}
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}
                >
                  <div className="faq-q" style={{ padding: '24px', fontSize: '1.2rem', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--navy-900)' }}>
                    {faq.question}
                    <ChevronDown className="chevron" size={20} style={{ color: 'var(--orange)', transition: 'transform 0.3s' }} />
                  </div>
                  <div className="faq-a" style={{ padding: '0 24px 24px', color: 'var(--dim)', fontSize: '1rem', lineHeight: '1.7', display: 'none' }} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </div>
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
        
        {/* CSS for FAQ toggling within this scoped component */}
        <style dangerouslySetInnerHTML={{__html: `
          .faq-item.open .faq-a { display: block !important; }
          .faq-item.open .chevron { transform: rotate(180deg); }
          .faq-item:hover { background: #f8fafc !important; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.05) !important; }
        `}} />
      </div>
    </div>
  );
}
