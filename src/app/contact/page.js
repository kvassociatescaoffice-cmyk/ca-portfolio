'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Thank you! Your message has been received.");
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section>
      <ToastContainer position="bottom-right" />
      <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Contact Us</h1>
      <div className="contact">
        <div style={styles.info}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--navy-800)' }}>Our Office</h3>
          <p style={{ color: 'var(--ink)' }}>123 Financial District<br/>New Delhi, India 110001</p>
          <br/>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--navy-800)' }}>Contact Details</h3>
          <p style={{ color: 'var(--ink)' }}>Email: kvassociatescaoffice@gmail.com</p>
          <p style={{ color: 'var(--ink)' }}>Phone: +91-7701 999 395</p>
        </div>
        <div>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div className="field">
              <label>Name <span style={{color: 'red'}}>*</span></label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="field">
              <label>Email <span style={{color: 'red'}}>*</span></label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="field">
              <label>Phone</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="field">
              <label>Subject</label>
              <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
            </div>
            <div className="field">
              <label>Message <span style={{color: 'red'}}>*</span></label>
              <textarea style={{ minHeight: '120px' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn solid" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '3rem',
  },
  info: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-md)',
  },
  formContainer: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-md)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text-primary)',
    fontFamily: 'inherit'
  }
};
