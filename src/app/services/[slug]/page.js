import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  getCategoryBySlug, 
  getAllCategories 
} from '@/lib/servicesData';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Service from '@/models/Service';
import { 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  ClipboardCheck, 
  Scale, 
  ArrowLeftRight, 
  Receipt, 
  BookOpen, 
  Globe2, 
  Briefcase, 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  Layers,
  Award,
  PhoneCall,
  MessageSquare
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

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: `${category.name} | Kumar Vashishtha & Associates`,
    description: category.description ? category.description.slice(0, 160) : 'Premier Chartered Accountancy & Financial Advisory Services in India.',
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  
  // 1. Get base category data (with fallback to 'others' if not matched)
  let category = getCategoryBySlug(slug);

  // 2. Also check if this is a custom category in MongoDB
  try {
    await dbConnect();
    const dbCat = await Category.findOne({ slug: slug.toLowerCase() }).lean();
    if (dbCat && !category.isCustom) {
      category = {
        ...category,
        name: dbCat.name,
        shortTitle: dbCat.shortTitle || dbCat.name,
        badge: dbCat.badge || category.badge,
        description: dbCat.description || category.description,
        icon: dbCat.icon || category.icon
      };
    }

    // 3. Check for any dynamic custom services added to this category
    const dbServices = await Service.find({ 
      category: category.slug, 
      isPublished: true 
    }).lean();

    if (dbServices && dbServices.length > 0) {
      const existingTitles = new Set(category.services.map(s => s.title.toLowerCase()));
      const customOfferings = dbServices
        .filter(ds => !existingTitles.has(ds.title.toLowerCase()))
        .map(ds => ({
          title: ds.title,
          description: ds.description,
          details: ds.details,
          features: ds.features || []
        }));
      
      category = {
        ...category,
        services: [...category.services, ...customOfferings]
      };
    }
  } catch (err) {
    // If DB fails, static reference data is already loaded safely
  }

  const IconComponent = iconMap[category.icon] || Briefcase;
  const allCategories = getAllCategories();
  const otherCategories = allCategories.filter(c => c.slug !== category.slug);

  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--dim)' }}>
          <Link href="/" style={{ color: 'var(--dim)', textDecoration: 'none' }} className="hover-orange">Home</Link>
          <span>/</span>
          <Link href="/services" style={{ color: 'var(--dim)', textDecoration: 'none' }} className="hover-orange">Services</Link>
          <span>/</span>
          <span style={{ color: 'var(--navy-900)', fontWeight: 600 }}>{category.shortTitle}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 48px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--navy-900) 0%, #152e5a 100%)', 
          borderRadius: '24px', 
          padding: 'clamp(32px, 5vw, 64px)', 
          color: '#fff',
          boxShadow: '0 20px 40px rgba(13,29,58,0.12)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow */}
          <div style={{ 
            position: 'absolute', 
            top: '-50px', 
            right: '-50px', 
            width: '300px', 
            height: '300px', 
            background: 'radial-gradient(circle, rgba(240,102,63,0.25) 0%, transparent 70%)', 
            pointerEvents: 'none' 
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(240,102,63,0.2)',
              border: '1px solid rgba(240,102,63,0.4)',
              color: '#ff9a7b',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.5px'
            }}>
              <IconComponent size={16} />
              {category.badge || 'Practice Area'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              {category.services.length} Specialized Offerings
            </span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', 
            color: '#fff', 
            marginBottom: '20px', 
            lineHeight: 1.15,
            fontWeight: 700
          }}>
            {category.name}
          </h1>

          <p style={{ 
            fontSize: 'clamp(1rem, 1.8vw, 1.18rem)', 
            color: 'rgba(255,255,255,0.85)', 
            maxWidth: '860px', 
            lineHeight: 1.7,
            marginBottom: '36px'
          }}>
            {category.description}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link 
              href="/contact" 
              className="btn solid" 
              style={{ 
                background: 'var(--orange)', 
                color: '#fff', 
                padding: '13px 28px', 
                borderRadius: '100px', 
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={18} />
              Request Consultation
            </Link>
            <a 
              href="#offerings" 
              style={{ 
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: '#fff', 
                padding: '13px 28px', 
                borderRadius: '100px', 
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
            >
              <Layers size={18} />
              Explore All Services ({category.services.length})
            </a>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-block', fontSize: '0.85rem', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Comprehensive Solutions
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--navy-900)' }}>
            Services in {category.shortTitle}
          </h2>
          <p style={{ color: 'var(--dim)', fontSize: '1.05rem', maxWidth: '700px', marginTop: '6px' }}>
            Explore each specialized engagement delivered by our seasoned partners and qualified professionals.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', 
          gap: '24px' 
        }}>
          {category.services.map((service, idx) => (
            <div 
              key={idx} 
              style={{
                background: '#ffffff',
                border: '1px solid var(--line)',
                borderRadius: '20px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(13,29,58,0.03)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
              }}
              className="card-hover-effect"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <span style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  background: 'var(--cream-tint)', 
                  color: 'var(--orange)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.95rem'
                }}>
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--dim)', background: '#f1f5f9', padding: '4px 10px', borderRadius: '100px' }}>
                  {category.shortTitle}
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', color: 'var(--navy-900)', marginBottom: '12px', lineHeight: 1.3 }}>
                {service.title}
              </h3>

              <p style={{ color: 'var(--dim)', fontSize: '0.96rem', lineHeight: 1.65, flexGrow: 1, marginBottom: '20px' }}>
                {service.description}
              </p>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link 
                  href={`/contact?service=${encodeURIComponent(service.title)}`} 
                  style={{ 
                    color: 'var(--orange)', 
                    fontWeight: 600, 
                    fontSize: '0.92rem', 
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  className="hover-underline"
                >
                  Consult on this &rarr;
                </Link>
                <CheckCircle2 size={18} color="var(--gold)" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Sectors (if available) */}
      {category.experience && category.experience.length > 0 && (
        <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{ 
            background: 'var(--cream-card)', 
            border: '1px solid var(--line)', 
            borderRadius: '20px', 
            padding: '36px',
            boxShadow: '0 6px 20px rgba(13,29,58,0.03)'
          }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={22} color="var(--gold)" />
              Sectors & Industry Footprint
            </h3>
            <p style={{ color: 'var(--dim)', marginBottom: '24px', fontSize: '0.98rem' }}>
              Our {category.shortTitle} practice regularly supports organizations across broad market sectors:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {category.experience.map((exp, i) => (
                <div 
                  key={i} 
                  style={{ 
                    background: 'var(--cream)', 
                    border: '1px solid var(--line)', 
                    padding: '10px 18px', 
                    borderRadius: '100px', 
                    fontSize: '0.92rem',
                    color: 'var(--ink)',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)' }}></span>
                  {typeof exp === 'string' ? exp : (exp.metric || exp.title || exp.label || JSON.stringify(exp))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section (if present) */}
      {category.caseStudies && category.caseStudies.length > 0 && (
        <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Proven Track Record
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--navy-900)', marginTop: '4px' }}>
              Real-World Client Engagements
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {category.caseStudies.map((cs, i) => (
              <div 
                key={i} 
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: '24px',
                  padding: 'clamp(24px, 4vw, 40px)',
                  boxShadow: '0 10px 30px rgba(13,29,58,0.04)'
                }}
              >
                {cs.tag && (
                  <span style={{ 
                    display: 'inline-block', 
                    background: 'rgba(201,154,82,0.15)', 
                    color: 'var(--navy-900)', 
                    fontWeight: 600, 
                    fontSize: '0.82rem', 
                    padding: '4px 12px', 
                    borderRadius: '6px', 
                    marginBottom: '12px' 
                  }}>
                    {cs.tag}
                  </span>
                )}
                <h3 style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)', color: 'var(--navy-900)', marginBottom: '16px', lineHeight: 1.3 }}>
                  {cs.title}
                </h3>
                {cs.introduction && (
                  <p style={{ color: 'var(--dim)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                    {cs.introduction}
                  </p>
                )}

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
                  gap: '24px',
                  background: 'var(--cream)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '20px'
                }}>
                  {cs.challenge && (
                    <div>
                      <h4 style={{ color: '#dc2626', fontSize: '1.05rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Key Challenges
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--dim)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                        {Array.isArray(cs.challenge) ? cs.challenge.map((c, j) => <li key={j} style={{ marginBottom: '6px' }}>{c}</li>) : <li>{cs.challenge}</li>}
                      </ul>
                    </div>
                  )}

                  {cs.approach && (
                    <div>
                      <h4 style={{ color: 'var(--navy-800)', fontSize: '1.05rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Strategic Approach
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--dim)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                        {Array.isArray(cs.approach) ? cs.approach.map((a, j) => <li key={j} style={{ marginBottom: '6px' }}>{a}</li>) : <li>{cs.approach}</li>}
                      </ul>
                    </div>
                  )}
                </div>

                {cs.outcome && (
                  <div style={{ background: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(5, 150, 105, 0.2)', padding: '16px 20px', borderRadius: '12px' }}>
                    <strong style={{ color: '#047857', display: 'block', marginBottom: '4px', fontSize: '0.95rem' }}>Result & Value Delivered:</strong>
                    <p style={{ margin: 0, color: '#065f46', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      {cs.outcome}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools & Technology Framework (if present) */}
      {category.tools && (
        <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, var(--cream-tint) 100%)', 
            border: '1px solid var(--line)', 
            borderRadius: '24px', 
            padding: 'clamp(28px, 4vw, 44px)',
            boxShadow: '0 6px 20px rgba(13,29,58,0.03)'
          }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
              Technology, Tools & Quality Protocols
            </h3>
            <p style={{ color: 'var(--dim)', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: '20px' }}>
              {category.tools.introduction}
            </p>
            {category.tools.details && Array.isArray(category.tools.details) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                {category.tools.details.map((detail, idx) => (
                  <div key={idx} style={{ background: '#fff', border: '1px solid var(--line)', padding: '16px 20px', borderRadius: '12px', fontSize: '0.92rem', color: 'var(--dim)', lineHeight: 1.6 }}>
                    {detail}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Category Navigator: Explore Other Categories */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', margin: 0 }}>
              Other Practice Areas
            </h3>
            <p style={{ color: 'var(--dim)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
              Switch to other specialized corporate and tax advisory domains
            </p>
          </div>
          <Link href="/services" style={{ color: 'var(--orange)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            View All Categories &rarr;
          </Link>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', 
          gap: '16px' 
        }}>
          {otherCategories.map(cat => {
            const CatIcon = iconMap[cat.icon] || Briefcase;
            return (
              <Link 
                key={cat.slug} 
                href={`/services/${cat.slug}`}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '20px',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(13,29,58,0.02)'
                }}
                className="hover-card"
              >
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '10px', 
                  background: 'var(--cream-tint)', 
                  color: 'var(--navy-800)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <CatIcon size={20} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, color: 'var(--navy-900)', fontSize: '0.95rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {cat.shortTitle}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>
                    {cat.services.length} services &rarr;
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Consultation Banner */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--navy-900) 0%, #1a3d8f 100%)', 
          borderRadius: '24px', 
          padding: 'clamp(32px, 5vw, 48px)', 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#fff', marginBottom: '10px' }}>
              Need Specialized Advice on {category.shortTitle}?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '1rem', lineHeight: 1.6 }}>
              Our senior Chartered Accountants are ready to assist with statutory audits, complex tax representations, cross-border restructuring, and routine compliances.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link 
              href="/contact" 
              className="btn solid" 
              style={{ 
                background: 'var(--orange)', 
                color: '#fff', 
                padding: '12px 26px', 
                borderRadius: '100px', 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Book Consultation
            </Link>
            <a 
              href="https://wa.me/917701999395" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                background: 'rgba(255,255,255,0.15)', 
                border: '1px solid rgba(255,255,255,0.25)', 
                color: '#fff', 
                padding: '12px 24px', 
                borderRadius: '100px', 
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MessageSquare size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
