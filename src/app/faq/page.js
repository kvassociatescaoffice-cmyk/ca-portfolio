'use client';
import { useEffect, useState } from 'react';

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/faqs?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.success) setFaqs(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleFaq = (e) => {
    const item = e.currentTarget;
    item.classList.toggle('open');
  };

  return (
    <section style={{ padding: '6vw', background: 'var(--cream-bg)', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--navy-900)', fontFamily: "var(--font-fraunces), serif" }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--dim)', fontSize: '1.2rem', marginTop: '1rem' }}>Everything you need to know about our services and process.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>No FAQs found.</div>
      ) : (
        <div className="faq-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {faqs.map(faq => (
            <div key={faq._id} className="faq-item" onClick={toggleFaq}>
              <div className="faq-q">
                {faq.question}
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </div>
              <div className="faq-a" dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
