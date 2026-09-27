export default function Reviews() {
  const reviews = [
    { name: 'Rahul', company: 'TechFlow Solutions', text: 'KUMAR VASHISHTHA AND ASSOCIATES has been instrumental in restructuring our corporate taxation. Their advisory is top-notch and always timely.', rating: 5 },
    { name: 'Priya Desai', company: 'Desai & Co.', text: 'We have outsourced our entire GST compliance to them. 100% peace of mind. Highly recommended.', rating: 5 },
    { name: 'Amit Singh', company: 'Singh Logistics', text: 'Thorough, professional, and extremely knowledgeable. Their audit team caught discrepancies that saved us millions.', rating: 4 },
    { name: 'Neha Gupta', company: 'Startup Inc.', text: 'As a startup, navigating corporate law was a nightmare until we found them. They made company incorporation a breeze.', rating: 5 },
    { name: 'Vikram Patel', company: 'Patel Manufacturing', text: 'Excellent service. They are always available for consultation and their tax planning strategies are brilliant.', rating: 5 },
    { name: 'Sneha Reddy', company: 'Reddy Enterprises', text: 'Very professional team. They helped us with a complex M&A transaction seamlessly.', rating: 5 },
  ];

  return (
    <section>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Client Testimonials</h1>
      <p style={{ textAlign: 'center', color: 'var(--ink)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Don&apos;t just take our word for it. Here&apos;s what our esteemed clients have to say about our services.
      </p>

      <div className="contact">
        {reviews.map((review, i) => (
          <div key={i} style={styles.card} className="insight">
            <div style={{ color: '#fbbf24', fontSize: '1.25rem', marginBottom: '1rem' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              &quot;{review.text}&quot;
            </p>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--navy-800)' }}>{review.name}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>{review.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTop: '4px solid var(--secondary)',
  }
};
