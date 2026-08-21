import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Page Not Found / पृष्ठ नहीं मिला</h2>
      <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>The requested page could not be found.</p>
      <Link href="/" style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>
        Return Home / होम पर जाएं
      </Link>
    </div>
  );
}
