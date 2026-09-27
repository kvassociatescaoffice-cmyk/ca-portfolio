'use client';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Save, X, Italic, Bold, Strikethrough, Link as LinkIcon } from 'lucide-react';

export default function FaqEditor({ faq, onSave, onCancel }) {
  const [formData, setFormData] = useState(faq || {
    question: '',
    answer: '',
    category: 'General',
    isPublished: true,
    order: 0
  });
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.question) return toast.error("Question is required!");
    
    const answer = editorRef.current?.innerHTML || formData.answer;
    if (!answer) return toast.error("Answer is required!");

    setIsSaving(true);
    try {
      const url = formData._id ? `/api/admin/faqs` : `/api/admin/faqs`;
      const method = formData._id ? 'PUT' : 'POST';
      
      const payload = { ...formData, answer };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success(formData._id ? "FAQ updated!" : "FAQ created!");
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
        <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', margin: 0 }}>{formData._id ? 'Edit FAQ' : 'Create FAQ'}</h3>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)' }}><X /></button>
      </div>
      
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>
            Question <span style={{ color: 'red' }}>*</span>
          </label>
          <input 
            type="text" 
            value={formData.question} 
            onChange={e => setFormData({...formData, question: e.target.value})}
            placeholder="e.g. What are your consultation hours?"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>
            Answer <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '8px', padding: '8px', background: '#f8fafc', borderBottom: '1px solid #cbd5e1' }}>
              <button type="button" onClick={() => execCommand('bold')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray"><Bold size={16} /></button>
              <button type="button" onClick={() => execCommand('italic')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray"><Italic size={16} /></button>
              <button type="button" onClick={() => execCommand('strikeThrough')} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray"><Strikethrough size={16} /></button>
              <div style={{ width: '1px', background: '#cbd5e1', margin: '0 4px' }} />
              <button type="button" onClick={() => {
                const url = prompt('Enter link URL:');
                if (url) execCommand('createLink', url);
              }} style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} className="hover-bg-gray"><LinkIcon size={16} /></button>
            </div>
            <div 
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              style={{ padding: '16px', minHeight: '120px', outline: 'none', fontSize: '1rem', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: formData.answer }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>Category</label>
            <input 
              type="text" 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              placeholder="e.g. Taxation, Audit"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>
          <div style={{ width: '100px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--navy-900)' }}>Order</label>
            <input 
              type="number" 
              value={formData.order} 
              onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
          <input 
            type="checkbox" 
            id="faq-publish" 
            checked={formData.isPublished}
            onChange={e => setFormData({...formData, isPublished: e.target.checked})}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <label htmlFor="faq-publish" style={{ cursor: 'pointer', fontWeight: '500', color: 'var(--navy-900)' }}>
            Publish Immediately (Uncheck to save as Draft)
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <button type="button" onClick={onCancel} style={{ padding: '12px 24px', background: '#f1f5f9', color: 'var(--navy-900)', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={isSaving} style={{ padding: '12px 24px', background: 'var(--navy-900)', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isSaving ? 0.7 : 1 }}>
            <Save size={18} /> {isSaving ? 'Saving...' : (formData._id ? 'Update FAQ' : 'Save FAQ')}
          </button>
        </div>
      </form>
    </div>
  );
}
