// Middleware runs on the Edge before every matched request.
// Auth.js v5 exposes `auth` as a higher-order function so we can read the
// session from the incoming request without an extra round-trip to the DB.
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isAuthenticated = !!req.auth

  // Unauthenticated requests to any admin page (except the login page itself)
  // are bounced to the login page.
  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
})

// Only run this middleware on admin paths — keeps public routes unaffected
// and avoids running auth logic on static assets or API routes.
export const config = {
  matcher: ['/admin/:path*'],
}
