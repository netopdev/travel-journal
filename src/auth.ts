import NextAuth from 'next-auth'
import Resend from 'next-auth/providers/resend'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/lib/db'
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from '@/lib/db/auth-schema'

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  // Pass the Drizzle instance plus each table explicitly so the adapter never
  // has to guess which tables belong to it when the schema is merged.
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM ?? 'noreply@example.com',
    }),
  ],

  callbacks: {
    // Hard gate: every sign-in attempt — whether a new magic link request or
    // a token verification — must match ADMIN_EMAIL exactly.  If the env var
    // is missing we fail closed (return false) so a misconfigured deployment
    // never accidentally admits an unknown user.
    signIn({ user }) {
      if (!process.env.ADMIN_EMAIL) return false
      return user.email === process.env.ADMIN_EMAIL
    },
  },

  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
    // After Auth.js sends the magic link it redirects here.  The ?sent=1
    // param tells the login page to swap the form for the success message.
    verifyRequest: '/admin/login?sent=1',
  },
})
