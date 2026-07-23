// Edge runtime — must NOT import anything that uses Node.js built-ins (pg, crypto, etc.).
// Use NextAuth(authConfig) with the edge-safe config; the full auth.ts (with DrizzleAdapter)
// only runs in Node.js API routes and server components.
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (isAdminRoute && !isLoginPage && !req.auth) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
})

// Only run this middleware on admin paths — keeps public routes unaffected
// and avoids running auth logic on static assets or API routes.
export const config = {
  matcher: ['/admin/:path*'],
}
