// Edge-safe Auth.js config — NO database adapter, NO pg, NO Node.js-only APIs.
// Used by middleware (Edge runtime) and re-used by auth.ts (Node.js runtime).
import type { NextAuthConfig } from 'next-auth'
import Resend from 'next-auth/providers/resend'

export const authConfig: NextAuthConfig = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM ?? 'noreply@example.com',
    }),
  ],

  callbacks: {
    signIn({ user }) {
      if (!process.env.ADMIN_EMAIL) return false
      return user.email === process.env.ADMIN_EMAIL
    },
    authorized({ auth }) {
      return !!auth
    },
  },

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
    verifyRequest: '/admin/login?sent=1',
  },
}
