// Node.js runtime only — imports pg via DrizzleAdapter, cannot run on Edge.
// Middleware uses auth.config.ts (edge-safe) instead.
import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/lib/db'
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from '@/lib/db/auth-schema'
import { authConfig } from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  // DrizzleAdapter uses pg — Node.js only, never bundled into middleware.
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
})
