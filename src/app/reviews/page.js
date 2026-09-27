export default function Reviews() {
  const reviews = [
    { name: 'Rahul Sharma', company: 'TechFlow Solutions', text: 'VJA Clone has been instrumental in restructuring our corporate taxation. Their advisory is top-notch and always timely.', rating: 5 },
    { name: 'Priya Desai', company: 'Desai & Co.', text: 'We have outsourced our entire GST compliance to them. 100% peace of mind. Highly recommended.', rating: 5 },
    { name: 'Amit Singh', company: 'Singh Logistics', text: 'Thorough, professional, and extremely knowledgeable. Their audit team caught discrepancies that saved us millions.', rating: 4 },
    { name: 'Neha Gupta', company: 'Startup Inc.', text: 'As a startup, navigating corporate law was a nightmare until we found them. They made company incorporation a breeze.', rating: 5 },
    { name: 'Vikram Patel', company: 'Patel Manufacturing', text: 'Excellent service. They are always available for consultation and their tax planning strategies are brilliant.', rating: 5 },
    { name: 'Sneha Reddy', company: 'Reddy Enterprises', text: 'Very professional team. They helped us with a complex M&A transaction seamlessly.', rating: 5 },
  ];

  return (
    <div className="container section animate-fade-in">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Client Testimonials</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Don't just take our word for it. Here's what our esteemed clients have to say about our services.
      </p>

      <div style={styles.grid}>
        {reviews.map((review, i) => (
          <div key={i} style={styles.card} className="glass">
            <div style={{ color: '#fbbf24', fontSize: '1.25rem', marginBottom: '1rem' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              "{review.text}"
            </p>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--primary)' }}>{review.name}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{review.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
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
