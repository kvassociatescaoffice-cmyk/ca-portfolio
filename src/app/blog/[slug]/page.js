import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPost({ params }) {
  await dbConnect();
  
  const blog = await Blog.findOne({ slug: params.slug, isPublished: true }).lean();
  
  if (!blog) {
    notFound();
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--dim)', textDecoration: 'none', marginBottom: '32px', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Back to Insights
        </Link>
        
        {blog.coverImage && (
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', borderRadius: '24px', marginBottom: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
          />
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--dim)', fontSize: '0.95rem', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} />
            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div style={{ width: '4px', height: '4px', background: '#cbd5e1', borderRadius: '50%' }}></div>
          <span>By {blog.author || 'Kumar Vashishtha & Associates'}</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '24px', lineHeight: 1.2 }}>
          {blog.title}
        </h1>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {blog.tags?.map(tag => (
            <span key={tag} style={{ background: '#e2e8f0', color: 'var(--navy-800)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
              {tag}
            </span>
          ))}
        </div>
        
        <div 
          className="blog-content"
          style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--navy-800)', background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content h2 { font-size: 1.8rem; color: var(--navy-900); margin: 2rem 0 1rem 0; font-family: var(--font-fraunces), serif; }
        .blog-content h3 { font-size: 1.5rem; color: var(--navy-900); margin: 1.5rem 0 1rem 0; }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content ul, .blog-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content a { color: var(--orange); text-decoration: underline; }
        .blog-content blockquote { border-left: 4px solid var(--orange); padding-left: 1rem; font-style: italic; color: var(--dim); margin-bottom: 1.5rem; }
      `}} />
    </div>
  );
}
