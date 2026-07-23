// Admin dashboard — server-gated by both middleware (fast edge check) and an
// explicit auth() call here (defence-in-depth; never rely solely on middleware).
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <main style={{ padding: '2rem', fontFamily: 'var(--font-inter)' }}>
      <h1
        style={{
          fontFamily: 'var(--font-fraunces)',
          color: 'var(--ink)',
          fontSize: '2rem',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          marginBottom: '0.5rem',
        }}
      >
        Admin dashboard
      </h1>
      <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>
        Signed in as <strong>{session.user?.email}</strong>. More controls
        coming soon.
      </p>
    </main>
  )
}
