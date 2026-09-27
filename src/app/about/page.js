export default function About() {
  return (
    <div className="container section animate-fade-in">
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About Us</h1>
      <div style={styles.content} className="glass">
        <p style={{ marginBottom: '1rem' }}>
          Established in 1976, KUMAR VASHISHTHA AND ASSOCIATES is a premier Chartered Accountancy firm based in New Delhi. We pride ourselves on delivering comprehensive financial and compliance solutions to a diverse clientele ranging from startups to multinational corporations.
        </p>
        <p>
          Our team of dedicated professionals operates with the highest standards of integrity, quality, and confidentiality. We combine decades of experience with modern technological approaches to help our clients navigate the complex regulatory landscapes.
        </p>
      </div>
    </div>
  );
}

const styles = {
  content: {
    padding: '3rem',
    borderRadius: 'var(--radius-lg)',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: 'var(--text-secondary)'
  }
};
