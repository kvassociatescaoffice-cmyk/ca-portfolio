'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  FolderPlus, 
  Trash2, 
  ExternalLink, 
  Layers, 
  Plus, 
  X, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  ClipboardCheck, 
  Scale, 
  ArrowLeftRight, 
  Receipt, 
  BookOpen, 
  Globe2, 
  Briefcase 
} from 'lucide-react';

const iconMap = {
  ShieldCheck,
  Building2,
  TrendingUp,
  ClipboardCheck,
  Scale,
  ArrowLeftRight,
  Receipt,
  BookOpen,
  Globe2,
  Briefcase
};

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newCat, setNewCat] = useState({
    name: '',
    slug: '',
    shortTitle: '',
    badge: 'Specialized Practice',
    icon: 'Briefcase',
    description: '',
    order: 0
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      toast.error('Failed to load categories');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) {
      return toast.error('Category Name is required');
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Category "${data.data.name}" created successfully!`);
        setShowCreateModal(false);
        setNewCat({
          name: '',
          slug: '',
          shortTitle: '',
          badge: 'Specialized Practice',
          icon: 'Briefcase',
          description: '',
          order: 0
        });
        fetchCategories();
      } else {
        toast.error(data.message || 'Failed to create category');
      }
    } catch (err) {
      toast.error('Network error creating category');
    }
    setSubmitting(false);
  };

  const handleDeleteCategory = async (cat) => {
    if (!cat.isCustom) {
      return toast.warning('Standard practice area categories cannot be deleted.');
    }

    if (!confirm(`Are you sure you want to delete category "${cat.name}"? Unmatched services will automatically fall back to "Others".`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories?id=${cat._id || ''}&slug=${cat.slug}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Category removed');
        fetchCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top action header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--navy-900)', margin: '0 0 6px 0' }}>
            Practice Area Categories ({categories.length})
          </h2>
          <p style={{ color: 'var(--dim)', margin: 0, fontSize: '0.95rem' }}>
            Manage core practice areas. If any service has an unmatched category, it automatically defaults to <strong>"Others"</strong>.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn solid hover-scale"
          style={{
            background: 'var(--orange)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '100px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={18} />
          Create Category
        </button>
      </div>

      {/* Categories Cards Table/Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--dim)' }}>
          Loading categories...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {categories.map((cat) => {
            const IconC = iconMap[cat.icon] || Briefcase;
            return (
              <div
                key={cat.slug}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 14px rgba(13,29,58,0.03)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--cream-tint)',
                      color: 'var(--navy-800)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconC size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy-900)' }}>
                        {cat.shortTitle || cat.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'monospace' }}>
                        /services/{cat.slug}
                      </div>
                    </div>
                  </div>

                  {cat.isCustom ? (
                    <span style={{ fontSize: '0.75rem', background: 'rgba(240,102,63,0.1)', color: 'var(--orange)', padding: '3px 8px', borderRadius: '100px', fontWeight: 600 }}>
                      Custom
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: 'var(--dim)', padding: '3px 8px', borderRadius: '100px', fontWeight: 600 }}>
                      Standard
                    </span>
                  )}
                </div>

                <p style={{ color: 'var(--dim)', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 16px 0', flexGrow: 1 }}>
                  {cat.description ? (cat.description.length > 120 ? cat.description.slice(0, 120) + '...' : cat.description) : 'No description provided.'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--navy-900)', fontWeight: 500 }}>
                    {cat.services?.length || 0} services
                  </span>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={`/services/${cat.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: 'var(--cream)',
                        color: 'var(--navy-900)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ExternalLink size={14} /> View
                    </a>

                    {cat.isCustom && (
                      <button
                        onClick={() => handleDeleteCategory(cat)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#dc2626',
                          padding: '6px 8px'
                        }}
                        title="Delete custom category"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Category Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            maxWidth: '540px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderPlus size={22} color="var(--orange)" />
                Create New Category
              </h3>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                  Category Name <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ESG & Sustainability Audits"
                  value={newCat.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setNewCat({ ...newCat, name, slug, shortTitle: name });
                  }}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. esg-audits"
                    value={newCat.slug}
                    onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Specialized Practice"
                    value={newCat.badge}
                    onChange={(e) => setNewCat({ ...newCat, badge: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy-900)' }}>
                  Category Description
                </label>
                <textarea
                  placeholder="Provide an overview of this category's scope, regulatory background, and client value proposition..."
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                  rows={4}
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn solid"
                  style={{ padding: '12px 24px', borderRadius: '10px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  {submitting ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
