// Admin magic-link login page.
//
// This is a Server Component.  The form submits to a Server Action that calls
// Auth.js signIn().  signIn() always throws a redirect — either to
// /admin/login?sent=1 (success, via pages.verifyRequest) or back to
// /admin/login?error=... (failure, via pages.error).  No client-side JS is
// needed for the success/error states — we read them from search params.

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { signIn } from '@/auth'

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const emailSchema = z.object({
  email: z.string().email(),
})

// ---------------------------------------------------------------------------
// Server Action
// ---------------------------------------------------------------------------
async function sendMagicLink(formData: FormData) {
  'use server'

  const raw = { email: formData.get('email') }
  const result = emailSchema.safeParse(raw)

  if (!result.success) {
    redirect('/admin/login?error=invalid_email')
  }

  // signIn() throws a redirect on both success and failure — the Next.js
  // runtime intercepts it.  On success it goes to pages.verifyRequest
  // (/admin/login?sent=1); on an access-denied error it goes to pages.error
  // (/admin/login?error=AccessDenied).
  await signIn('resend', {
    email: result.data.email,
    redirectTo: '/admin',
  })
}

// ---------------------------------------------------------------------------
// Error message helper
// ---------------------------------------------------------------------------
function errorMessage(code: string): string {
  switch (code) {
    case 'AccessDenied':
      return 'That email address is not authorised to access this journal.'
    case 'invalid_email':
      return 'Please enter a valid email address.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
type SearchParams = Promise<{ sent?: string; error?: string }>

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const sent = params.sent === '1'
  const errorCode = typeof params.error === 'string' ? params.error : null

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '26rem',
          background: '#ffffff',
          border: '1px solid var(--line)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 2px 10px rgba(44,38,32,.07)',
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontWeight: 900,
            fontSize: '1.875rem',
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            margin: '0 0 1.25rem',
          }}
        >
          Admin login
        </h1>

        {/* Success state */}
        {sent ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              background: 'var(--paper-deep)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '1.25rem 1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.9375rem',
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Check your email for the magic link. You can close this tab.
            </p>
          </div>
        ) : (
          <>
            {/* Subheading */}
            <p
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.9375rem',
                color: 'var(--ink-soft)',
                margin: '0 0 1.5rem',
                lineHeight: 1.6,
              }}
            >
              Enter your email and we&rsquo;ll send you a magic link.
            </p>

            {/* Error banner */}
            {errorCode && (
              <div
                role="alert"
                style={{
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--accent)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.875rem',
                    color: 'var(--accent-deep)',
                    margin: 0,
                  }}
                >
                  {errorMessage(errorCode)}
                </p>
              </div>
            )}

            {/* Form */}
            <form action={sendMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.9375rem',
                    color: 'var(--ink)',
                    background: 'var(--paper)',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    padding: '0.625rem 0.875rem',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s ease',
                  }}
                  // CSS :focus is handled in globals.css via a utility class below
                  className="login-input"
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.25rem',
                  cursor: 'pointer',
                  marginTop: '0.25rem',
                  transition: 'background 0.15s ease',
                }}
                className="login-btn"
              >
                Send magic link
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
