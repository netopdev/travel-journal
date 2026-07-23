// Auth.js v5 route handler — forwards all GET and POST requests under
// /api/auth/* to the Auth.js core handler (sign-in, callback, sign-out, etc.)
import { handlers } from '@/auth'

export const { GET, POST } = handlers
