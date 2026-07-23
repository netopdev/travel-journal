import {
  pgTable,
  serial,
  varchar,
  text,
  numeric,
  timestamp,
  boolean,
  integer,
  index,
  primaryKey,
} from 'drizzle-orm/pg-core'

// ---------------------------------------------------------------------------
// posts
// ---------------------------------------------------------------------------
export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: text('subtitle'),
    body_mdx: text('body_mdx'),
    hero_image_url: varchar('hero_image_url', { length: 500 }),
    location_name: varchar('location_name', { length: 255 }),
    location_lat: numeric('location_lat', { precision: 9, scale: 6 }),
    location_lng: numeric('location_lng', { precision: 9, scale: 6 }),
    published_at: timestamp('published_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('posts_slug_idx').on(table.slug),
    index('posts_published_at_idx').on(table.published_at),
  ],
)

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert

// ---------------------------------------------------------------------------
// media_items
// ---------------------------------------------------------------------------
export const mediaItems = pgTable(
  'media_items',
  {
    id: serial('id').primaryKey(),
    post_id: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 10 }).notNull().$type<'image' | 'youtube'>(),
    url: varchar('url', { length: 500 }).notNull(),
    caption: text('caption'),
    sort_order: integer('sort_order').notNull().default(0),
  },
  (table) => [
    index('media_items_post_id_idx').on(table.post_id),
  ],
)

export type MediaItem = typeof mediaItems.$inferSelect
export type NewMediaItem = typeof mediaItems.$inferInsert

// ---------------------------------------------------------------------------
// tags
// ---------------------------------------------------------------------------
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).unique().notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
})

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert

// ---------------------------------------------------------------------------
// post_tags (join table)
// ---------------------------------------------------------------------------
export const postTags = pgTable(
  'post_tags',
  {
    post_id: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tag_id: integer('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({ columns: [table.post_id, table.tag_id] }),
    index('post_tags_post_id_idx').on(table.post_id),
    index('post_tags_tag_id_idx').on(table.tag_id),
  ],
)

export type PostTag = typeof postTags.$inferSelect
export type NewPostTag = typeof postTags.$inferInsert

// ---------------------------------------------------------------------------
// comments
// ---------------------------------------------------------------------------
export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    post_id: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    author_name: varchar('author_name', { length: 100 }).notNull(),
    author_email: varchar('author_email', { length: 255 }).notNull(),
    body: text('body').notNull(),
    approved: boolean('approved').notNull().default(false),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('comments_post_id_idx').on(table.post_id),
    index('comments_approved_idx').on(table.approved),
  ],
)

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert

// ---------------------------------------------------------------------------
// subscribers
// ---------------------------------------------------------------------------
export const subscribers = pgTable(
  'subscribers',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    confirmed_at: timestamp('confirmed_at', { withTimezone: true }),
    unsubscribe_token: varchar('unsubscribe_token', { length: 255 }).unique().notNull(),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index('subscribers_email_idx').on(table.email),
  ],
)

export type Subscriber = typeof subscribers.$inferSelect
export type NewSubscriber = typeof subscribers.$inferInsert
