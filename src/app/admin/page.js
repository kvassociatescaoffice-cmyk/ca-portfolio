'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from './BlogEditor';
import FaqEditor from './FaqEditor';
import NewsEditor from './NewsEditor';
import { Mail, Edit3, HelpCircle, Newspaper, LogOut, Image as ImageIcon, Eye, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // UI States
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [viewingLead, setViewingLead] = useState(null);
  
  // Gallery
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [galleryLink, setGalleryLink] = useState('');

  // Editor States
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  
  const [isEditingFaq, setIsEditingFaq] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);
  
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  
  // Data States
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    const auth = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(auth);
    
    if (!auth) {
      window.location.href = '/admin/login';
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'leads') fetchLeads();
      else if (activeTab === 'blog') fetchBlogs();
      else if (activeTab === 'faq') fetchFaqs();
      else if (activeTab === 'news') fetchNews();
    }
  }, [isAuthenticated, activeTab, page, limit, search]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
        setTotalPages(data.pagination.pages);
        setTotalLeads(data.pagination.total);
      }
    } catch (err) {}
    setLoading(false);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (err) {}
    setLoading(false);
  };

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/faqs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        setFaqs(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (err) {}
    setLoading(false);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/news?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
        setTotalPages(data.pagination.pages);
      }
    } catch (err) {}
    setLoading(false);
  };

  const handleLogout = () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  if (!isMounted) return null;
  if (!isAuthenticated) return <div style={{ minHeight: '100vh', background: '#0f172a' }} />;

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingMedia(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.success) {
        setGalleryLink(data.url);
        toast.success("Media uploaded directly to Drive!");
      } else toast.error("Upload failed.");
    } catch (err) { toast.error("Network error"); }
    setUploadingMedia(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 0, padding: 0, minHeight: '100vh', background: 'var(--cream)', backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 237, 213, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(254, 215, 170, 0.4) 0px, transparent 50%)', fontFamily: 'var(--font-inter), sans-serif', color: 'var(--navy-900)' }}>
      {/* Ultra Premium Header */}
      <header style={{ 
        background: 'rgba(15, 23, 42, 0.95)', 
        backdropFilter: 'blur(10px)',
        padding: '16px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: "var(--font-fraunces), serif", lineHeight: 1.1 }}>
            <span style={{ background: 'linear-gradient(to right, #fbbf24, #fef08a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800', fontSize: '1.4rem' }}>
              KVA Workspace
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} className="pulse-dot" />
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>Online</span>
          </div>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: showHelp ? 'rgba(255,255,255,0.2)' : 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s' }} className="hover-gold-border"
            title="Dashboard Guidelines"
          >
            <HelpCircle size={16} /> Help
          </button>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s' }} className="hover-gold-border">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1600px', margin: '0 auto', padding: '40px 2%', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Floating Glassmorphic Sidebar */}
        <aside style={{ 
          width: '260px', 
          flexShrink: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          padding: '24px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.02)',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', paddingLeft: '12px' }}>Menu</div>
          <button onClick={() => { setActiveTab('leads'); setPage(1); }} style={getTabStyle(activeTab === 'leads')}>
            <Mail size={18} /> Contact Leads
          </button>
          <button onClick={() => { setActiveTab('blog'); setPage(1); }} style={getTabStyle(activeTab === 'blog')}>
            <Edit3 size={18} /> Blog Manager
          </button>
          <button onClick={() => setActiveTab('faq')} style={getTabStyle(activeTab === 'faq')}>
            <HelpCircle size={18} /> FAQ Manager
          </button>
          <button onClick={() => setActiveTab('news')} style={getTabStyle(activeTab === 'news')}>
            <Newspaper size={18} /> Firm News
          </button>
          <button onClick={() => setActiveTab('gallery')} style={getTabStyle(activeTab === 'gallery')}>
            <ImageIcon size={18} /> Media Gallery
          </button>
        </aside>

        {/* Dynamic Main Content Area */}
        <main style={{ 
          flex: 1, 
          minWidth: '300px',
          background: '#ffffff', 
          padding: '48px', 
          borderRadius: '32px', 
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.04)',
          border: '1px solid rgba(255,255,255,0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {showHelp && (
            <div className="animate-fade-in" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))', backdropFilter: 'blur(10px)', padding: '24px', borderRadius: '16px', marginBottom: '32px', border: '1px solid var(--gold)', color: 'var(--navy-900)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}><HelpCircle size={20} color="var(--orange)" /> Dashboard Guidelines</h4>
              <ul style={{ paddingLeft: '24px', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--navy-800)' }}>
                <li><strong>Leads:</strong> Filter by name/email. Manage client inquiries submitted from the homepage. Click 'View' to read their full message.</li>
                <li><strong>Rows per page:</strong> Use the dropdown at the bottom of any table to show 10, 25, or 50 items.</li>
                <li><strong>Blogs:</strong> Upload cover images via Google Drive. Drafts are hidden from the public.</li>
                <li><strong>Gallery:</strong> Direct upload to Google Drive without attaching it to a blog post.</li>
              </ul>
            </div>
          )}
          
          {/* View Lead Full Data Modal */}
          {viewingLead && (
            <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', maxWidth: '600px', width: '90%', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <button onClick={() => setViewingLead(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: '#f1f5f9', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', transition: 'background 0.2s' }} className="hover-bg-gray"><X size={20} /></button>
                <div style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--cream)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '16px' }}>Client Lead</div>
                <h3 style={{ fontSize: '2rem', fontFamily: "var(--font-fraunces), serif", marginBottom: '8px', color: 'var(--navy-900)' }}>{viewingLead.name}</h3>
                <p style={{ color: 'var(--dim)', marginBottom: '32px', fontSize: '0.95rem' }}>Submitted: {new Date(viewingLead.createdAt).toLocaleString()}</p>
                
                <div style={{ display: 'grid', gap: '20px', fontSize: '1rem' }}>
                  <div style={{ display: 'flex', gap: '40px' }}>
                    <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Email</strong> <a href={`mailto:${viewingLead.email}`} style={{ color: 'var(--navy-900)', fontWeight: '600', textDecoration: 'none' }}>{viewingLead.email}</a></div>
                    <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</strong> <span style={{ fontWeight: '500' }}>{viewingLead.phone || 'N/A'}</span></div>
                  </div>
                  <div><strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--dim)', textTransform: 'uppercase', marginBottom: '4px' }}>Service Requested</strong> <span style={{ display: 'inline-block', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '6px 12px', borderRadius: '8px', fontWeight: '600' }}>{viewingLead.service}</span></div>
                  
                  <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginTop: '16px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy-900)' }}><Mail size={16} /> Original Message</strong>
                    <p style={{ marginTop: '12px', whiteSpace: 'pre-wrap', lineHeight: '1.7', color: 'var(--navy-800)' }}>{viewingLead.message || 'No message provided.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)', lineHeight: '1.2' }}>Client Inquiries</h2>
                  <p style={{ color: 'var(--dim)', marginTop: '8px' }}>Manage and respond to {totalLeads} prospective clients.</p>
                </div>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="Search name or email..." 
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    style={{ padding: '14px 20px 14px 48px', borderRadius: '30px', border: '1px solid #cbd5e1', width: '320px', background: '#f8fafc', outline: 'none', transition: 'all 0.3s', fontSize: '0.95rem' }}
                    className="focus-ring"
                  />
                  <div style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><div className="spinner" /></div>
              ) : leads.length === 0 ? (
                <div style={{ padding: '80px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                  <Mail size={48} color="#cbd5e1" style={{ marginBottom: '16px', display: 'inline-block' }} />
                  <p style={{ color: 'var(--navy-800)', fontSize: '1.2rem', fontWeight: '500' }}>No client inquiries found.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Contact Info</th>
                        <th style={thStyle}>Service Required</th>
                        <th style={thStyle}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(lead => (
                        <tr key={lead._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.2s' }} className="hover-row">
                          <td style={tdStyle}>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td style={tdStyle}><strong style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{lead.name}</strong></td>
                          <td style={tdStyle}>
                            <a href={`mailto:${lead.email}`} style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: '500', display: 'block' }}>{lead.email}</a>
                            {lead.phone && <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: '6px' }}>{lead.phone}</div>}
                          </td>
                          <td style={tdStyle}><span style={{ background: 'var(--cream)', border: '1px solid #fef08a', padding: '6px 14px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600', color: '#b45309' }}>{lead.service}</span></td>
                          <td style={tdStyle}>
                            <button onClick={() => setViewingLead(lead)} style={{ background: '#fff', border: '1px solid #e2e8f0', color: 'var(--navy-900)', padding: '8px 16px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="hover-shadow">
                              <Eye size={16} /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {totalPages > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderTop: '1px solid #f1f5f9', background: '#fff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--dim)', fontWeight: '500' }}>Rows per page:</span>
                        <select 
                          value={limit} 
                          onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                          style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--navy-900)', fontWeight: '600', outline: 'none' }}
                          className="focus-ring"
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>&larr; Prev</button>
                        <span style={{ fontSize: '0.95rem', color: 'var(--navy-800)', fontWeight: '600', background: 'var(--cream)', padding: '6px 16px', borderRadius: '20px' }}>{page} / {totalPages}</span>
                        <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} style={pageBtnStyle}>Next &rarr;</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="animate-fade-in">
              {isEditingBlog ? (
                <BlogEditor 
                  blog={currentBlog} 
                  onCancel={() => { setIsEditingBlog(false); setCurrentBlog(null); }} 
                  onSave={() => { setIsEditingBlog(false); setCurrentBlog(null); fetchBlogs(); }} 
                />
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '2.5rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)', lineHeight: '1.2' }}>Blog Content</h2>
                      <p style={{ color: 'var(--dim)', marginTop: '8px' }}>Manage your SEO-optimized articles.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="text" 
                          placeholder="Search articles..." 
                          value={search}
                          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                          style={{ padding: '14px 20px 14px 48px', borderRadius: '30px', border: '1px solid #cbd5e1', width: '280px', background: '#f8fafc', outline: 'none', transition: 'all 0.3s', fontSize: '0.95rem' }}
                          className="focus-ring"
                        />
                        <div style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                      </div>
                      <button onClick={() => setIsEditingBlog(true)} style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)', transition: 'transform 0.2s' }} className="hover-scale">
                        <Edit3 size={18} /> New Article
                      </button>
                    </div>
                  </div>
                  
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><div className="spinner" /></div>
                  ) : blogs.length === 0 ? (
                    <div style={{ padding: '80px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                      <Edit3 size={48} color="#cbd5e1" style={{ marginBottom: '16px', display: 'inline-block' }} />
                      <p style={{ color: 'var(--navy-800)', fontSize: '1.2rem', fontWeight: '500' }}>No articles yet. Start writing!</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc' }}>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Article</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map(blog => (
                            <tr key={blog._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="hover-row">
                              <td style={tdStyle}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                              <td style={tdStyle}>
                                <strong style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>{blog.title}</strong>
                                <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: '6px' }}>/{blog.slug}</div>
                              </td>
                              <td style={tdStyle}>
                                <span style={{ background: blog.isPublished ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9', color: blog.isPublished ? '#059669' : '#64748b', padding: '6px 14px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600' }}>
                                  {blog.isPublished ? 'Live' : 'Draft'}
                                </span>
                              </td>
                              <td style={tdStyle}>
                                <button onClick={() => { setCurrentBlog(blog); setIsEditingBlog(true); }} style={{ background: '#fff', border: '1px solid #cbd5e1', color: 'var(--navy-900)', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="hover-shadow">Edit</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {totalPages > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderTop: '1px solid #f1f5f9', background: '#fff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', flexWrap: 'wrap', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--dim)', fontWeight: '500' }}>Rows per page:</span>
                            <select 
                              value={limit} 
                              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                              style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--navy-900)', fontWeight: '600', outline: 'none' }}
                              className="focus-ring"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                            </select>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>&larr; Prev</button>
                            <span style={{ fontSize: '0.95rem', color: 'var(--navy-800)', fontWeight: '600', background: 'var(--cream)', padding: '6px 16px', borderRadius: '20px' }}>{page} / {totalPages}</span>
                            <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} style={pageBtnStyle}>Next &rarr;</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="animate-fade-in">
              {isEditingFaq ? (
                <FaqEditor 
                  faq={currentFaq} 
                  onSave={() => { setIsEditingFaq(false); fetchFaqs(); }} 
                  onCancel={() => setIsEditingFaq(false)} 
                />
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '2.5rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)', lineHeight: '1.2' }}>FAQ Manager</h2>
                      <p style={{ color: 'var(--dim)', marginTop: '8px' }}>Manage dynamic questions and answers.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="text" 
                          placeholder="Search questions..." 
                          value={search}
                          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                          style={{ padding: '14px 20px 14px 48px', borderRadius: '30px', border: '1px solid #cbd5e1', width: '280px', background: '#f8fafc', outline: 'none', transition: 'all 0.3s', fontSize: '0.95rem' }}
                          className="focus-ring"
                        />
                        <div style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setCurrentFaq(null); setIsEditingFaq(true); }}
                        style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)', transition: 'transform 0.2s' }} className="hover-scale"
                      >
                        <HelpCircle size={18} /> Add Question
                      </button>
                    </div>
                  </div>
                  
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><div className="spinner" /></div>
                  ) : faqs.length === 0 ? (
                    <div style={{ padding: '80px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                      <HelpCircle size={48} color="#cbd5e1" style={{ marginBottom: '16px', display: 'inline-block' }} />
                      <p style={{ color: 'var(--navy-800)', fontSize: '1.2rem', fontWeight: '500' }}>No FAQs found.</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc' }}>
                            <th style={thStyle}>Question</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqs.map(faq => (
                            <tr key={faq._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.2s' }} className="hover-row">
                              <td style={tdStyle}>
                                <strong style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{faq.question}</strong>
                                <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: '6px', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} dangerouslySetInnerHTML={{__html: faq.answer}}></div>
                              </td>
                              <td style={tdStyle}><span style={{ background: 'var(--cream)', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '500' }}>{faq.category || 'General'}</span></td>
                              <td style={tdStyle}>
                                <span style={{ background: faq.isPublished ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9', color: faq.isPublished ? '#059669' : '#64748b', padding: '6px 14px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600' }}>
                                  {faq.isPublished ? 'Live' : 'Hidden'}
                                </span>
                              </td>
                              <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => { setCurrentFaq(faq); setIsEditingFaq(true); }} style={{ background: '#fff', border: '1px solid #cbd5e1', color: 'var(--navy-900)', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="hover-shadow">Edit</button>
                                  <button 
                                    onClick={() => {
                                      toast.promise(
                                        fetch(`/api/admin/faqs?id=${faq._id}`, { method: 'DELETE' })
                                          .then(res => { if (!res.ok) throw new Error(); return res.json(); }).then(() => fetchFaqs()),
                                        { pending: 'Deleting...', success: 'FAQ deleted!', error: 'Failed to delete' }
                                      );
                                    }}
                                    style={{ background: '#fff', border: '1px solid #fecdd3', color: '#e11d48', padding: '8px 16px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="hover-shadow"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {totalPages > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderTop: '1px solid #f1f5f9', background: '#fff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', flexWrap: 'wrap', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--dim)', fontWeight: '500' }}>Rows per page:</span>
                            <select 
                              value={limit} 
                              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                              style={{ padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', color: 'var(--navy-900)', fontWeight: '600', outline: 'none' }}
                              className="focus-ring"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                            </select>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>&larr; Prev</button>
                            <span style={{ fontSize: '0.95rem', color: 'var(--navy-800)', fontWeight: '600', background: 'var(--cream)', padding: '6px 16px', borderRadius: '20px' }}>{page} / {totalPages}</span>
                            <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)} style={pageBtnStyle}>Next &rarr;</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="animate-fade-in">
              {isEditingNews ? (
                <NewsEditor 
                  news={currentNews} 
                  onSave={() => { setIsEditingNews(false); fetchNews(); }} 
                  onCancel={() => setIsEditingNews(false)} 
                />
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                      <h2 style={{ fontSize: '2.5rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)', lineHeight: '1.2' }}>Firm News</h2>
                      <p style={{ color: 'var(--dim)', marginTop: '8px' }}>Post public announcements and updates.</p>
                    </div>
                    <button 
                      onClick={() => { setCurrentNews(null); setIsEditingNews(true); }}
                      style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)', transition: 'transform 0.2s' }} className="hover-scale"
                    >
                      <Newspaper size={18} /> Post Update
                    </button>
                  </div>
                  
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><div className="spinner" /></div>
                  ) : news.length === 0 ? (
                    <div style={{ padding: '80px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                      <Newspaper size={48} color="#cbd5e1" style={{ marginBottom: '16px', display: 'inline-block' }} />
                      <p style={{ color: 'var(--navy-800)', fontSize: '1.2rem', fontWeight: '500' }}>No news published yet.</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc' }}>
                            <th style={thStyle}>Title & Date</th>
                            <th style={thStyle}>Content Snippet</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {news.map(item => (
                            <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'all 0.2s' }} className="hover-row">
                              <td style={tdStyle}>
                                <strong style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{item.title}</strong>
                                <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: '6px' }}>{new Date(item.createdAt).toLocaleDateString()}</div>
                              </td>
                              <td style={tdStyle}>
                                <div style={{ fontSize: '0.9rem', color: 'var(--navy-800)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} dangerouslySetInnerHTML={{__html: item.content}}></div>
                              </td>
                              <td style={tdStyle}>
                                <span style={{ background: item.isPublished ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9', color: item.isPublished ? '#059669' : '#64748b', padding: '6px 14px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600' }}>
                                  {item.isPublished ? 'Live' : 'Draft'}
                                </span>
                              </td>
                              <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                  <button onClick={() => { setCurrentNews(item); setIsEditingNews(true); }} style={{ background: '#fff', border: '1px solid #cbd5e1', color: 'var(--navy-900)', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="hover-shadow">Edit</button>
                                  <button 
                                    onClick={() => {
                                      toast.promise(
                                        fetch(`/api/admin/news?id=${item._id}`, { method: 'DELETE' })
                                          .then(res => { if (!res.ok) throw new Error(); return res.json(); }).then(() => fetchNews()),
                                        { pending: 'Deleting...', success: 'News deleted!', error: 'Failed to delete' }
                                      );
                                    }}
                                    style={{ background: '#fff', border: '1px solid #fecdd3', color: '#e11d48', padding: '8px 16px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="hover-shadow"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)' }}>Media Gallery</h2>
                  <p style={{ color: 'var(--dim)', marginTop: '8px' }}>Upload files directly to the cloud.</p>
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '60px 40px', borderRadius: '24px', border: '2px dashed #cbd5e1', textAlign: 'center', transition: 'all 0.3s' }} className="hover-border-gold">
                <ImageIcon size={48} color="#cbd5e1" style={{ marginBottom: '24px', display: 'inline-block' }} />
                <h3 style={{ marginBottom: '16px', color: 'var(--navy-900)', fontSize: '1.5rem' }}>Upload to Google Drive</h3>
                <p style={{ color: 'var(--dim)', marginBottom: '32px' }}>Select an image or document to instantly generate a public sharing link.</p>
                
                <div style={{ display: 'inline-block', position: 'relative' }}>
                  <input type="file" onChange={handleGalleryUpload} disabled={uploadingMedia} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                  <button style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '30px', fontWeight: 'bold', pointerEvents: 'none', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)' }}>
                    {uploadingMedia ? 'Uploading...' : 'Browse Files'}
                  </button>
                </div>
                
                {galleryLink && (
                  <div className="animate-fade-in" style={{ marginTop: '48px', background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'left', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534' }}>✓</div>
                      <h4 style={{ color: '#166534', fontSize: '1.2rem' }}>Upload Successful!</h4>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--dim)', marginBottom: '12px', fontWeight: '500' }}>Direct Public Link:</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <input type="text" readOnly value={galleryLink} style={{ flex: 1, padding: '14px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', color: 'var(--navy-900)', outline: 'none' }} />
                      <button onClick={() => { navigator.clipboard.writeText(galleryLink); toast.info('Link copied!'); }} style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '0 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Copy</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
      <ToastContainer position="bottom-right" toastStyle={{ borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
      <style jsx>{`
        .spinner { width: 40px; height: 40px; border: 4px solid var(--cream); border-top: 4px solid var(--gold); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .hover-gold-border:hover { border-color: var(--gold) !important; color: var(--gold) !important; }
        
        /* Table row hover and zebra striping */
        .hover-row:nth-child(even) { background-color: rgba(0, 0, 0, 0.015); }
        .hover-row:hover { background-color: rgba(251, 191, 36, 0.05) !important; transform: scale(1.002); }
        
        .hover-shadow:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important; transform: translateY(-2px); }
        .hover-bg-gray:hover { background-color: #e2e8f0 !important; }
        .focus-ring:focus { border-color: var(--gold) !important; box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.2) !important; }
        .hover-scale:hover { transform: scale(1.03); }
        .hover-border-gold:hover { border-color: var(--gold) !important; }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
      `}</style>
    </div>
  );
}

const getTabStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textAlign: 'left',
  padding: '16px 20px',
  background: isActive ? 'var(--navy-900)' : 'transparent',
  border: 'none',
  borderRadius: '16px',
  cursor: 'pointer',
  fontWeight: isActive ? '700' : '500',
  color: isActive ? '#fff' : 'var(--navy-900)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: '1rem',
  boxShadow: isActive ? '0 10px 25px rgba(15, 23, 42, 0.2)' : 'none',
  marginBottom: '4px'
});

const thStyle = { padding: '20px 24px', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--dim)', fontWeight: '700', letterSpacing: '1.5px', borderBottom: '1px solid #e2e8f0' };
const tdStyle = { padding: '24px', verticalAlign: 'middle', color: 'var(--navy-900)' };
const pageBtnStyle = { background: '#fff', border: '1px solid #cbd5e1', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', color: 'var(--navy-900)', fontWeight: '600', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' };
