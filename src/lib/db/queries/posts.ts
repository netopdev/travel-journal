import 'server-only'
import { desc, isNotNull, eq } from 'drizzle-orm'
import { db } from '../index'
import { posts } from '../schema'
import type { Post } from '../schema'

/**
 * Returns all published posts (published_at is not null),
 * ordered newest-first. Used on the public homepage and tag pages.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  return db
    .select()
    .from(posts)
    .where(isNotNull(posts.published_at))
    .orderBy(desc(posts.published_at))
}

/**
 * Returns a single post by its slug, or undefined if not found.
 * Used on the public /trip/[slug] page.
 */
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1)
  return rows[0]
}

/**
 * Returns every post including drafts, ordered by creation date descending.
 * Used in the admin /admin/posts list.
 */
export async function getAllPostsForAdmin(): Promise<Post[]> {
  return db
    .select()
    .from(posts)
    .orderBy(desc(posts.created_at))
}
