'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminAuth', 'true');
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy-900)' }}>
      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: 'var(--navy-900)', marginBottom: '20px', textAlign: 'center', fontFamily: "var(--font-fraunces), serif" }}>Admin Login</h1>
        
        {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
        
        {step === 1 ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--dim)', marginBottom: '6px' }}>Admin Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }}
                placeholder="Enter your email"
              />
            </div>
            <button disabled={loading} type="submit" style={{ background: 'var(--orange)', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--dim)', marginBottom: '6px' }}>Enter 6-digit OTP</label>
              <input 
                type="text" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                required
                maxLength={6}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem' }}
                placeholder="••••••"
              />
            </div>
            <button disabled={loading} type="submit" style={{ background: 'var(--navy-800)', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {loading ? 'Verifying...' : 'Login'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--orange)', cursor: 'pointer', fontSize: '0.9rem' }}>
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
