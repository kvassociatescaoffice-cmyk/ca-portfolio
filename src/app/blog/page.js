import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Calendar } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  await dbConnect();
  
  // Fetch published blogs only
  const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '1rem', textAlign: 'center' }}>
          Insights & Resources
        </h1>
        <p style={{ color: 'var(--dim)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Expert analysis, financial updates, and corporate strategies from the desk of Kumar Vashishtha & Associates.
        </p>

        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: '#fff', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--navy-800)' }}>No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {blogs.map(blog => (
              <Link href={`/blog/${blog.slug}`} key={blog._id} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'transform 0.3s', height: '100%', display: 'flex', flexDirection: 'column' }} className="hover-scale">
                  {blog.coverImage && (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                    />
                  )}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--dim)', fontSize: '0.85rem', marginBottom: '12px' }}>
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h2 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '12px', lineHeight: 1.4 }}>{blog.title}</h2>
                    <p style={{ color: 'var(--dim)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {blog.excerpt}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {blog.tags?.map(tag => (
                        <span key={tag} style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
