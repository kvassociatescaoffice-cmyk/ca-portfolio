export default function About() {
  return (
    <section>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>About Us</h1>
      <div style={styles.content}>
        <p style={{ marginBottom: '1rem', color: 'var(--ink)' }}>
          Established in 1976, KUMAR VASHISHTHA AND ASSOCIATES is a premier Chartered Accountancy firm based in New Delhi. We pride ourselves on delivering comprehensive financial and compliance solutions to a diverse clientele ranging from startups to multinational corporations.
        </p>
        <p style={{ color: 'var(--ink)' }}>
          Our team of dedicated professionals operates with the highest standards of integrity, quality, and confidentiality. We combine decades of experience with modern technological approaches to help our clients navigate the complex regulatory landscapes.
        </p>
      </div>
    </section>
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
