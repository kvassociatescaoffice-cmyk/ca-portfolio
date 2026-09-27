'use client';
import { useState, useEffect } from 'react';

export default function BlogEditor({ blog, onSave, onCancel }) {
  const [formData, setFormData] = useState(blog || {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    tags: '',
    isPublished: false
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, coverImage: data.url });
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      alert('Upload error');
    }
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Convert tags string to array
    const tagsArray = typeof formData.tags === 'string' 
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) 
      : formData.tags;

    const payload = { ...formData, tags: tagsArray };

    try {
      const url = blog ? `/api/admin/blogs/${blog._id}` : '/api/admin/blogs';
      const method = blog ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        onSave();
      } else {
        alert('Save failed: ' + data.message);
      }
    } catch (err) {
      alert('Save error');
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--navy-900)' }}>{blog ? 'Edit Blog Post' : 'Create New Post'}</h3>
        <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--dim)', cursor: 'pointer' }}>Cancel</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input required style={inputStyle} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} />
        </div>
        <div>
          <label style={labelStyle}>URL Slug</label>
          <input required style={inputStyle} value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Cover Image (Google Drive Upload)</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={isUploading} style={{ padding: '8px' }} />
          {isUploading && <span style={{ color: 'var(--orange)' }}>Uploading...</span>}
        </div>
        {formData.coverImage && (
          <img src={formData.coverImage} alt="Cover" style={{ height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '8px' }} />
        )}
      </div>

      <div>
        <label style={labelStyle}>Excerpt (Short summary)</label>
        <textarea required style={{...inputStyle, height: '60px'}} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
      </div>

      <div>
        <label style={labelStyle}>Full Content (Markdown or HTML)</label>
        <textarea required style={{...inputStyle, height: '300px', fontFamily: 'monospace'}} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>SEO Title</label>
          <input style={inputStyle} value={formData.seoTitle} onChange={e => setFormData({...formData, seoTitle: e.target.value})} />
        </div>
        <div>
          <label style={labelStyle}>SEO Description</label>
          <input style={inputStyle} value={formData.seoDescription} onChange={e => setFormData({...formData, seoDescription: e.target.value})} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Tags (Comma separated)</label>
        <input style={inputStyle} value={typeof formData.tags === 'string' ? formData.tags : formData.tags?.join(', ')} onChange={e => setFormData({...formData, tags: e.target.value})} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input type="checkbox" id="published" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} />
        <label htmlFor="published" style={{ fontWeight: '500', color: 'var(--navy-900)' }}>Publish Post Live</label>
      </div>

      <button disabled={isSaving} type="submit" style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}>
        {isSaving ? 'Saving to Database...' : 'Save Blog Post'}
      </button>

    </form>
  );
}

const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--dim)', marginBottom: '6px', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' };
