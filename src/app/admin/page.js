'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BlogEditor from './BlogEditor';
import { Mail, Edit3, HelpCircle, Newspaper, LogOut, Image as ImageIcon, Eye, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Data States
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  
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
      const res = await fetch(`/api/admin/blogs?page=${page}&limit=${limit}`);
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {}
    setLoading(false);
  };

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/faqs`);
      if (res.status === 401) return handleLogout();
      const data = await res.json();
      if (data.success) setFaqs(data.data);
    } catch (err) {}
    setLoading(false);
  };

  const handleLogout = () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  if (!isMounted) return null;
  if (!isAuthenticated) return <div style={{ minHeight: '100vh', background: 'var(--navy-900)' }} />;

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
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'var(--font-inter), sans-serif', color: 'var(--navy-900)' }}>
      <ToastContainer position="bottom-right" />
      {/* Premium Header */}
      <header style={{ 
        background: 'var(--navy-900)', 
        padding: '20px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontFamily: "var(--font-fraunces), serif", lineHeight: 1.1 }}>
            <span style={{ background: 'linear-gradient(100deg, var(--gold), #ffdf91)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800', fontSize: '1.5rem' }}>
              Kumar Vashishtha
            </span>
            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '500', letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase' }}>
              Command Center
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500', letterSpacing: '1px' }}>SYSTEM ONLINE</span>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.3s' }} className="hover-gold-border">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '40px 5%', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Sidebar */}
        <aside style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

        {/* Main Content Area */}
        <main style={{ 
          flex: 1, 
          minWidth: '300px',
          background: '#fff', 
          padding: '40px', 
          borderRadius: '24px', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.05)',
          position: 'relative'
        }}>
          
          <button 
            onClick={() => setShowHelp(!showHelp)}
            style={{ position: 'absolute', top: '40px', right: '40px', background: 'transparent', border: 'none', color: 'var(--dim)', cursor: 'pointer' }}
            title="Dashboard Guidelines"
          >
            <HelpCircle size={24} />
          </button>

          {showHelp && (
            <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--gold)', color: 'var(--navy-900)' }}>
              <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><HelpCircle size={18} /> Dashboard Guidelines</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Leads:</strong> Filter by name/email. Manage client inquiries submitted from the homepage. Click 'View' to read their full message.</li>
                <li><strong>Rows per page:</strong> Use the dropdown at the bottom of any table to show 10, 25, or 50 items.</li>
                <li><strong>Blogs:</strong> Upload cover images via Google Drive. Drafts are hidden from the public.</li>
                <li><strong>Gallery:</strong> Direct upload to Google Drive without attaching it to a blog post.</li>
              </ul>
            </div>
          )}
          
          {/* View Lead Full Data Modal */}
          {viewingLead && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', maxWidth: '500px', width: '90%', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <button onClick={() => setViewingLead(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                <h3 style={{ fontSize: '1.5rem', fontFamily: "var(--font-fraunces), serif", marginBottom: '8px', color: 'var(--navy-900)' }}>{viewingLead.name}</h3>
                <p style={{ color: 'var(--dim)', marginBottom: '24px', fontSize: '0.9rem' }}>{new Date(viewingLead.createdAt).toLocaleString()}</p>
                
                <div style={{ display: 'grid', gap: '16px', fontSize: '0.95rem' }}>
                  <div><strong>Email:</strong> <a href={`mailto:${viewingLead.email}`} style={{ color: 'var(--orange)' }}>{viewingLead.email}</a></div>
                  <div><strong>Phone:</strong> {viewingLead.phone || 'N/A'}</div>
                  <div><strong>Service:</strong> {viewingLead.service}</div>
                  <div style={{ background: 'var(--cream)', padding: '16px', borderRadius: '8px', marginTop: '8px' }}>
                    <strong>Message:</strong><br/>
                    <p style={{ marginTop: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{viewingLead.message || 'No message provided.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                <h2 style={{ fontSize: '2rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)' }}>Client Inquiries <span style={{ color: 'var(--gold)' }}>({totalLeads})</span></h2>
                <input 
                  type="text" 
                  placeholder="Search name or email..." 
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  style={{ padding: '12px 20px', borderRadius: '30px', border: '1px solid #e2e8f0', width: '300px', background: 'var(--cream)', outline: 'none' }}
                />
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>
              ) : leads.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', background: 'var(--cream)', borderRadius: '16px' }}>
                  <p style={{ color: 'var(--navy-800)', fontSize: '1.1rem' }}>No client inquiries found.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--gold)' }}>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Contact Info</th>
                        <th style={thStyle}>Service Required</th>
                        <th style={thStyle}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(lead => (
                        <tr key={lead._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="hover-row">
                          <td style={tdStyle}>{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td style={tdStyle}><strong style={{ fontSize: '1.05rem' }}>{lead.name}</strong></td>
                          <td style={tdStyle}>
                            <a href={`mailto:${lead.email}`} style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: '500' }}>{lead.email}</a>
                            {lead.phone && <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: '4px' }}>{lead.phone}</div>}
                          </td>
                          <td style={tdStyle}><span style={{ background: 'var(--cream)', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '500' }}>{lead.service}</span></td>
                          <td style={tdStyle}>
                            <button onClick={() => setViewingLead(lead)} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--navy-900)', padding: '6px 16px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Eye size={14} /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {totalPages > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>Rows per page:</span>
                        <select 
                          value={limit} 
                          onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'var(--cream)', color: 'var(--navy-900)' }}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>&larr; Previous</button>
                        <span style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: '600' }}>Page {page} of {totalPages}</span>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)' }}>Blog Content</h2>
                    <button onClick={() => setIsEditingBlog(true)} style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>+ Publish New Article</button>
                  </div>
                  
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner" /></div>
                  ) : blogs.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', background: 'var(--cream)', borderRadius: '16px' }}>
                      <p style={{ color: 'var(--navy-800)', fontSize: '1.1rem' }}>No blog posts yet. Create your first insight!</p>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--gold)' }}>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Article</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map(blog => (
                            <tr key={blog._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={tdStyle}>{new Date(blog.createdAt).toLocaleDateString()}</td>
                              <td style={tdStyle}>
                                <strong style={{ fontSize: '1.05rem', color: 'var(--navy-900)' }}>{blog.title}</strong>
                                <div style={{ fontSize: '0.85rem', color: 'var(--dim)', marginTop: '4px' }}>/{blog.slug}</div>
                              </td>
                              <td style={tdStyle}>
                                <span style={{ background: blog.isPublished ? 'rgba(16, 185, 129, 0.1)' : 'var(--cream)', color: blog.isPublished ? '#059669' : 'var(--navy-900)', padding: '6px 12px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600' }}>
                                  {blog.isPublished ? 'Live' : 'Draft'}
                                </span>
                              </td>
                              <td style={tdStyle}>
                                <button onClick={() => { setCurrentBlog(blog); setIsEditingBlog(true); }} style={{ background: 'transparent', border: '1px solid var(--gold)', color: 'var(--navy-900)', padding: '6px 16px', borderRadius: '30px', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      {totalPages > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', flexWrap: 'wrap', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>Rows per page:</span>
                            <select 
                              value={limit} 
                              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'var(--cream)', color: 'var(--navy-900)' }}
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50}>50</option>
                            </select>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={pageBtnStyle}>&larr; Previous</button>
                            <span style={{ fontSize: '0.9rem', color: 'var(--navy-800)', fontWeight: '600' }}>Page {page} of {totalPages}</span>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)' }}>FAQ Manager</h2>
                <button style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Question</button>
              </div>
              <p style={{ color: 'var(--dim)' }}>Database architecture for FAQs is ready. UI integration coming in the next commit!</p>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)' }}>Firm News & Updates</h2>
                <button style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>+ Post Update</button>
              </div>
              <p style={{ color: 'var(--dim)' }}>News feed module pending UI completion.</p>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', fontFamily: "var(--font-fraunces), serif", color: 'var(--navy-900)' }}>Media Gallery</h2>
              </div>
              <div style={{ background: 'var(--cream)', padding: '40px', borderRadius: '16px', border: '1px dashed var(--gold)', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--navy-900)' }}>Upload to Google Drive directly</h3>
                <input type="file" onChange={handleGalleryUpload} disabled={uploadingMedia} style={{ padding: '8px', background: '#fff', borderRadius: '8px' }} />
                {uploadingMedia && <p style={{ marginTop: '16px', color: 'var(--orange)' }}>Uploading to Drive...</p>}
                
                {galleryLink && (
                  <div style={{ marginTop: '32px', background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'left' }}>
                    <h4 style={{ marginBottom: '8px', color: '#10b981' }}>Upload Successful!</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--dim)', marginBottom: '8px' }}>Direct Link:</p>
                    <input type="text" readOnly value={galleryLink} style={{ width: '100%', padding: '12px', background: 'var(--cream)', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    <a href={galleryLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '12px', color: 'var(--navy-900)', fontWeight: 'bold' }}>Test Link &rarr;</a>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--cream);
          border-top: 4px solid var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .hover-gold-border:hover { border-color: var(--gold) !important; color: var(--gold) !important; }
        .hover-row:hover { background-color: var(--cream); }
      `}</style>
    </div>
  );
}

const getTabStyle = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
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
  boxShadow: isActive ? '0 10px 20px rgba(10, 37, 64, 0.15)' : 'none'
});

const thStyle = { padding: '20px 16px', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--navy-900)', fontWeight: '700', letterSpacing: '1px' };
const tdStyle = { padding: '20px 16px', verticalAlign: 'middle', color: 'var(--navy-900)' };
const pageBtnStyle = { background: '#fff', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '30px', cursor: 'pointer', color: 'var(--navy-900)', fontWeight: '600', transition: 'all 0.2s' };
