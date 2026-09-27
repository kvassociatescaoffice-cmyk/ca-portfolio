'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
  });

  // Leads State
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/admin/login';
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'leads') {
      fetchLeads();
    }
  }, [isAuthenticated, activeTab, page, search]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
      if (res.status === 401) {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
        setTotalPages(data.pagination.pages);
        setTotalLeads(data.pagination.total);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    // We should also clear the JWT cookie via an API route, but for now we clear local state
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <div style={{ minHeight: '100vh', background: 'var(--navy-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Redirecting to secure login...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'var(--font-inter), sans-serif' }}>
      {/* Top Navbar */}
      <header style={{ background: '#fff', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--navy-900)' }}>KVA Admin Panel</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>Secure Session Active</span>
          <button onClick={handleLogout} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', gap: '40px' }}>
        
        {/* Sidebar */}
        <aside style={{ width: '200px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => setActiveTab('leads')} style={getTabStyle(activeTab === 'leads')}>📬 Contact Leads</button>
          <button onClick={() => setActiveTab('blog')} style={getTabStyle(activeTab === 'blog')}>📝 Blog Manager</button>
          <button onClick={() => setActiveTab('news')} style={getTabStyle(activeTab === 'news')}>📰 Firm News</button>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          
          {activeTab === 'leads' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>Client Inquiries ({totalLeads})</h2>
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '250px' }}
                />
              </div>

              {loading ? (
                <p style={{ color: 'var(--dim)' }}>Loading records securely...</p>
              ) : leads.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '8px' }}>
                  <p style={{ color: 'var(--dim)' }}>No contact leads found.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Contact</th>
                        <th style={thStyle}>Service Requested</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(lead => (
                        <tr key={lead._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={tdStyle}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                          <td style={tdStyle}><strong>{lead.name}</strong></td>
                          <td style={tdStyle}>
                            <a href={`mailto:${lead.email}`} style={{ color: 'var(--orange)' }}>{lead.email}</a>
                            {lead.phone && <div style={{ fontSize: '0.85rem', color: 'var(--dim)' }}>{lead.phone}</div>}
                          </td>
                          <td style={tdStyle}><span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{lead.service}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
                      <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>&larr; Prev</button>
                      <span style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>Page {page} of {totalPages}</span>
                      <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={pageBtnStyle}>Next &rarr;</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>Blog Content Manager</h2>
                <button style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ New Post</button>
              </div>
              <p style={{ color: 'var(--dim)' }}>This module is currently being connected to the MongoDB backend. Check back soon!</p>
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--navy-900)' }}>Firm News & Updates</h2>
                <button style={{ background: 'var(--navy-800)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add News</button>
              </div>
              <p style={{ color: 'var(--dim)' }}>This module is currently being connected to the MongoDB backend. Check back soon!</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

const getTabStyle = (isActive) => ({
  textAlign: 'left',
  padding: '12px 16px',
  background: isActive ? '#fff' : 'transparent',
  border: isActive ? '1px solid #e2e8f0' : '1px solid transparent',
  borderRight: isActive ? '3px solid var(--orange)' : '1px solid transparent',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: isActive ? '600' : '500',
  color: isActive ? 'var(--navy-900)' : 'var(--dim)',
  transition: 'all 0.2s'
});

const thStyle = { padding: '16px 12px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: '600' };
const tdStyle = { padding: '16px 12px', verticalAlign: 'top', color: 'var(--navy-900)' };
const pageBtnStyle = { background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--navy-900)' };
