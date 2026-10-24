'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  getAllCategories, 
  getAllServicesFlat 
} from '@/lib/servicesData';
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
  Search, 
  ArrowRight,
  Layers,
  CheckCircle2,
  PhoneCall
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

export default function Services() {
  const allCategories = getAllCategories();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTab, setPreviewTab] = useState(allCategories[0]);

  // Filter categories and search services
  const filteredCategories = useMemo(() => {
    return allCategories.filter(cat => {
      const matchesFilter = activeCategoryFilter === 'all' || cat.slug === activeCategoryFilter;
      const matchesSearch = !searchQuery.trim() || 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.services.some(s => 
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesFilter && matchesSearch;
    });
  }, [allCategories, activeCategoryFilter, searchQuery]);

  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      {/* Hero Header */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 40px' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ 
            display: 'inline-block', 
            background: 'rgba(240,102,63,0.12)', 
            color: 'var(--orange)', 
            fontWeight: 700, 
            fontSize: '0.85rem', 
            padding: '6px 16px', 
            borderRadius: '100px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            marginBottom: '14px' 
          }}>
            10 Practice Areas · Decades of Integrity
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', color: 'var(--navy-900)', marginBottom: '16px', lineHeight: 1.15 }}>
            Our Practice Areas & Services
          </h1>
          <p style={{ color: 'var(--dim)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 1.7, margin: 0 }}>
            Comprehensive audit, direct tax litigation, GST advisory, corporate law, valuation, and cross-border accounting delivered with unwavering professional standards.
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ 
            maxWidth: '560px', 
            margin: '0 auto', 
            width: '100%', 
            position: 'relative' 
          }}>
            <Search size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)' }} />
            <input 
              type="text" 
              placeholder="Search across all services, e.g. Statutory Audit, GST, FEMA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 48px',
                borderRadius: '100px',
                border: '1px solid var(--line)',
                background: '#fff',
                fontSize: '0.98rem',
                outline: 'none',
                boxShadow: '0 4px 16px rgba(13,29,58,0.04)',
                color: 'var(--ink)'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="category-pills-carousel" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={() => setActiveCategoryFilter('all')}
              style={{
                padding: '9px 18px',
                borderRadius: '100px',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid',
                borderColor: activeCategoryFilter === 'all' ? 'var(--navy-900)' : 'var(--line)',
                background: activeCategoryFilter === 'all' ? 'var(--navy-900)' : '#fff',
                color: activeCategoryFilter === 'all' ? '#fff' : 'var(--ink)'
              }}
            >
              All Categories ({allCategories.length})
            </button>
            {allCategories.map(cat => {
              const active = activeCategoryFilter === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategoryFilter(cat.slug)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '100px',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '1px solid',
                    borderColor: active ? 'var(--navy-900)' : 'var(--line)',
                    background: active ? 'var(--navy-900)' : '#fff',
                    color: active ? '#fff' : 'var(--ink)'
                  }}
                >
                  {cat.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
        {filteredCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '20px', border: '1px solid var(--line)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--navy-900)', marginBottom: '8px' }}>No matching practice areas found</h3>
            <p style={{ color: 'var(--dim)', marginBottom: '20px' }}>Try searching for a different term or reset filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategoryFilter('all'); }}
              className="btn solid"
              style={{ padding: '10px 22px', borderRadius: '100px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', 
            gap: '28px' 
          }}>
            {filteredCategories.map(cat => {
              const IconComp = iconMap[cat.icon] || Briefcase;
              return (
                <div 
                  key={cat.slug} 
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--line)',
                    borderRadius: '24px',
                    padding: '36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(13,29,58,0.03)',
                    transition: 'all 0.25s ease',
                    position: 'relative'
                  }}
                  className="category-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '16px', 
                      background: 'var(--cream-tint)', 
                      color: 'var(--navy-800)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <IconComp size={26} />
                    </div>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--navy-900)', 
                      background: 'rgba(201,154,82,0.15)', 
                      padding: '5px 12px', 
                      borderRadius: '100px', 
                      fontWeight: 600 
                    }}>
                      {cat.services.length} Offerings
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', color: 'var(--navy-900)', marginBottom: '12px', lineHeight: 1.25 }}>
                    {cat.name}
                  </h3>

                  <p style={{ color: 'var(--dim)', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '22px' }}>
                    {cat.description.length > 150 ? cat.description.slice(0, 150) + '...' : cat.description}
                  </p>

                  {/* Sub-services preview pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px', flexGrow: 1 }}>
                    {cat.services.slice(0, 4).map((s, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'var(--cream)',
                          border: '1px solid var(--line)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          color: 'var(--ink)'
                        }}
                      >
                        {s.title}
                      </span>
                    ))}
                    {cat.services.length > 4 && (
                      <span style={{ padding: '4px 8px', fontSize: '0.82rem', color: 'var(--dim)' }}>
                        +{cat.services.length - 4} more
                      </span>
                    )}
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link 
                      href={`/services/${cat.slug}`}
                      className="btn solid"
                      style={{ 
                        background: 'var(--navy-900)', 
                        color: '#fff', 
                        padding: '10px 20px', 
                        borderRadius: '100px', 
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        justifyContent: 'center'
                      }}
                    >
                      View Category Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Interactive Quick Preview Panel */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ 
          background: '#fff', 
          border: '1px solid var(--line)', 
          borderRadius: '24px', 
          padding: 'clamp(28px, 4vw, 44px)',
          boxShadow: '0 10px 30px rgba(13,29,58,0.03)'
        }}>
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              Instant Reference
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy-900)', marginTop: '4px' }}>
              Quick Practice Area Explorer
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {/* Sidebar list */}
            <div className="services-tabs-carousel" style={{ flex: '1', minWidth: 'min(300px, 100%)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {allCategories.map(cat => {
                const isSelected = previewTab.slug === cat.slug;
                const IconC = iconMap[cat.icon] || Briefcase;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setPreviewTab(cat)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--navy-900)' : 'var(--line)',
                      background: isSelected ? 'var(--navy-900)' : '#fff',
                      color: isSelected ? '#fff' : 'var(--ink)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontWeight: 500,
                      fontSize: '0.94rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <IconC size={18} color={isSelected ? 'var(--orange)' : 'var(--navy-800)'} />
                    <span style={{ flexGrow: 1 }}>{cat.shortTitle}</span>
                    <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>({cat.services.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Content Preview */}
            <div style={{ flex: '2', minWidth: 'min(300px, 100%)', background: 'var(--cream)', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ background: 'var(--cream-tint)', color: 'var(--navy-900)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600 }}>
                  {previewTab.badge}
                </span>
                <span style={{ color: 'var(--dim)', fontSize: '0.85rem' }}>
                  {previewTab.services.length} services in this domain
                </span>
              </div>

              <h3 style={{ fontSize: '1.7rem', color: 'var(--navy-900)', marginBottom: '14px' }}>
                {previewTab.name}
              </h3>

              <p style={{ color: 'var(--dim)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '24px' }}>
                {previewTab.description}
              </p>

              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--navy-900)', marginBottom: '12px' }}>
                  Key Services Included:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  {previewTab.services.slice(0, 6).map((s, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', color: 'var(--ink)' }}>
                      <CheckCircle2 size={16} color="var(--orange)" />
                      <span>{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link 
                  href={`/services/${previewTab.slug}`}
                  className="btn solid"
                  style={{ background: 'var(--orange)', color: '#fff', padding: '12px 24px', borderRadius: '100px', fontWeight: 600, textDecoration: 'none' }}
                >
                  Explore Full {previewTab.shortTitle} Page &rarr;
                </Link>
                <Link 
                  href="/contact"
                  style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--ink)', padding: '12px 24px', borderRadius: '100px', fontWeight: 500, textDecoration: 'none' }}
                >
                  Consult Partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
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
          <div>
            <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#fff', marginBottom: '8px' }}>
              Have a Specific Regulatory or Tax Query?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '1rem' }}>
              Speak directly with our senior partners for confidential, strategic consultation.
            </p>
          </div>
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
              whiteSpace: 'nowrap'
            }}
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(13,29,58,0.08) !important;
          border-color: rgba(240,102,63,0.3) !important;
        }
        @media(max-width: 768px) {
          .category-pills-carousel {
            justify-content: flex-start !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding-bottom: 8px !important;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .category-pills-carousel::-webkit-scrollbar {
            display: none;
          }
          .category-pills-carousel button {
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
