export default function About() {
  const leaders = [
    {
      name: "Kumar Vashishtha",
      role: "Founder & Managing Partner",
      bio: "With over 40 years of experience in corporate finance, taxation, and statutory audits, Kumar has guided the firm since its inception in 1976. His visionary leadership and deep expertise in regulatory frameworks have made him a trusted advisor to multinational corporations and high-net-worth individuals.",
      image: "/team-placeholder.jpg" // Placeholder if they want to add images later
    },
    {
      name: "S. K. Sharma",
      role: "Partner, Tax & Regulatory",
      bio: "S.K. Sharma specializes in complex direct and indirect tax litigation. With his profound knowledge of the ever-evolving tax landscape, he ensures our clients maintain impeccable compliance while optimizing their tax structures.",
      image: "/team-placeholder.jpg"
    },
    {
      name: "R. Agarwal",
      role: "Partner, Audit & Assurance",
      bio: "Leading the Audit division, R. Agarwal brings a meticulous approach to financial assurance. He has extensive experience in conducting statutory, internal, and management audits across diverse industries including manufacturing, IT, and healthcare.",
      image: "/team-placeholder.jpg"
    }
  ];

  return (
    <div style={{ background: 'var(--cream)', backgroundImage: 'radial-gradient(at 0% 0%, rgba(255, 237, 213, 0.4) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(254, 215, 170, 0.4) 0px, transparent 50%)', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', color: 'var(--navy-900)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(240, 102, 63, 0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Our Story
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '1rem' }}>
            About Us
          </h1>
          <p style={{ color: 'var(--dim)', textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8' }}>
            Established in 1976, KUMAR VASHISHTHA AND ASSOCIATES is a premier Chartered Accountancy firm based in New Delhi. We pride ourselves on delivering comprehensive financial and compliance solutions to a diverse clientele ranging from startups to multinational corporations.
          </p>
        </div>

        {/* Firm Values / Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '16px' }}>Our Mission</h3>
            <p style={{ color: 'var(--dim)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              To provide exceptional financial and professional services while maintaining the highest levels of integrity and professionalism. We strive to be the trusted partners in our clients' growth journey.
            </p>
          </div>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '16px' }}>Our Approach</h3>
            <p style={{ color: 'var(--dim)', lineHeight: '1.7', fontSize: '1.05rem' }}>
              Our team of dedicated professionals operates with the highest standards of quality and confidentiality. We combine decades of experience with modern technological approaches to navigate complex regulatory landscapes.
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(240, 102, 63, 0.1)', color: 'var(--orange)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
            Our Team
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-fraunces), serif', color: 'var(--navy-900)', marginBottom: '1rem' }}>
            Leadership & Partners
          </h2>
          <p style={{ color: 'var(--dim)', textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '40px' }}>
            Meet the experienced professionals guiding our firm's vision and ensuring excellence in every client engagement.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {leaders.map((leader, index) => (
            <div key={index} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }} className="hover-scale">
              <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'var(--navy-900)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontFamily: 'var(--font-fraunces), serif', marginBottom: '24px' }}>
                {leader.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--navy-900)', marginBottom: '8px', fontFamily: "var(--font-fraunces), serif" }}>{leader.name}</h3>
              <p style={{ color: 'var(--orange)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>{leader.role}</p>
              <p style={{ color: 'var(--dim)', lineHeight: '1.7', fontSize: '1rem', flex: 1 }}>
                {leader.bio}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
