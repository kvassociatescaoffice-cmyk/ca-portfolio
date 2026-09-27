'use client';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Save, X, Italic, Bold, Strikethrough, Link as LinkIcon, Type } from 'lucide-react';

export default function NewsEditor({ news, onSave, onCancel }) {
  const [formData, setFormData] = useState(news || {
    title: '',
    content: '',
    sourceUrl: '',
    tags: '',
    isPublished: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title) return toast.error("Title is required!");
    
    // Get content from the editable div
    const content = editorRef.current?.innerHTML || formData.content;
    if (!content) return toast.error("Content is required!");

    setIsSaving(true);
    try {
      const url = formData._id ? `/api/admin/news` : `/api/admin/news`;
      const method = formData._id ? 'PUT' : 'POST';
      
      const payload = {
        ...formData,
        content,
        // Convert comma-separated string to array if needed, though schema is just string. Let's keep it string for now.
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success(formData._id ? "News updated!" : "News published!");
        onSave();
      } else {
        toast.error("Failed to save: " + data.message);
      }
    } catch (err) {
      toast.error("Network error");
    }
    setIsSaving(false);
  };

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', margin: 0 }}>{formData._id ? 'Edit News' : 'Create News'}</h3>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)' }}><X /></button>
      </div>
      
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>
            News Title <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="Important Announcement..."
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>
            Content <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '8px', padding: '8px', background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
              <button type="button" onClick={() => execCommand('bold')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray" title="Bold"><Bold size={16} /></button>
              <button type="button" onClick={() => execCommand('italic')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray" title="Italic"><Italic size={16} /></button>
              <button type="button" onClick={() => execCommand('strikeThrough')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray" title="Strikethrough"><Strikethrough size={16} /></button>
              <div style={{ width: '1px', background: '#cbd5e1', margin: '0 4px' }} />
              <button type="button" onClick={() => {
                const url = prompt('Enter link URL:');
                if (url) execCommand('createLink', url);
              }} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray" title="Link"><LinkIcon size={16} /></button>
            </div>
            <div 
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              style={{ padding: '16px', minHeight: '150px', outline: 'none', fontSize: '1rem', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>Tags</label>
            <input 
              type="text" 
              value={formData.tags || ''} 
              onChange={e => setFormData({...formData, tags: e.target.value})}
              placeholder="e.g. tax, update, 2026"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: '250px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>Source URL (Optional)</label>
            <input 
              type="url" 
              value={formData.sourceUrl || ''} 
              onChange={e => setFormData({...formData, sourceUrl: e.target.value})}
              placeholder="https://..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          <input 
            type="checkbox" 
            id="news-publish" 
            checked={formData.isPublished}
            onChange={e => setFormData({...formData, isPublished: e.target.checked})}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <label htmlFor="news-publish" style={{ cursor: 'pointer', fontWeight: '500', color: 'var(--navy-900)' }}>
            Publish Immediately (Uncheck to save as Draft)
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button type="button" onClick={onCancel} style={{ padding: '12px 24px', background: '#f1f5f9', color: 'var(--navy-900)', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={isSaving} style={{ padding: '12px 24px', background: 'var(--navy-900)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isSaving ? 0.7 : 1 }}>
            <Save size={18} /> {isSaving ? 'Saving...' : (formData._id ? 'Update News' : 'Save News')}
          </button>
        </div>
      </form>
    </div>
  );
}
