import 'server-only'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import * as authSchema from './auth-schema'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Both schema namespaces are merged so Drizzle can resolve all table
// references in queries, and so @auth/drizzle-adapter can be passed
// individual table objects for explicit binding.
export const db = drizzle(pool, { schema: { ...schema, ...authSchema } })
