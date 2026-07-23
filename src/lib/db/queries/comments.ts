import 'server-only'
import { asc, eq, and } from 'drizzle-orm'
import { db } from '../index'
import { comments } from '../schema'
import type { Comment } from '../schema'

/**
 * Returns all unapproved comments, oldest-first.
 * Used in the admin moderation queue at /admin/comments.
 */
export async function getPendingComments(): Promise<Comment[]> {
  return db
    .select()
    .from(comments)
    .where(eq(comments.approved, false))
    .orderBy(asc(comments.created_at))
}

/**
 * Returns all approved comments for a specific post, oldest-first.
 * Used on the public /trip/[slug] page below the post body.
 */
export async function getApprovedCommentsByPost(postId: number): Promise<Comment[]> {
  return db
    .select()
    .from(comments)
    .where(and(eq(comments.post_id, postId), eq(comments.approved, true)))
    .orderBy(asc(comments.created_at))
}
