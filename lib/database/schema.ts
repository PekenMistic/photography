import { pgTable, uuid, varchar, text, boolean, timestamp, decimal, integer, date, time, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('user'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Portfolio items table
export const portfolioItems = pgTable('portfolio_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(),
  imageUrl: text('image_url').notNull(),
  featured: boolean('featured').default(false),
  tags: text('tags').array(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  categoryIdx: index('idx_portfolio_category').on(table.category),
  featuredIdx: index('idx_portfolio_featured').on(table.featured),
  createdAtIdx: index('idx_portfolio_created_at').on(table.createdAt),
}));

// Services table
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  priceFrom: decimal('price_from', { precision: 10, scale: 2 }),
  duration: varchar('duration', { length: 100 }),
  features: text('features').array(),
  category: varchar('category', { length: 100 }),
  imageUrl: text('image_url'),
  popular: boolean('popular').default(false),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Bookings table
export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  eventDate: date('event_date').notNull(),
  eventTime: time('event_time'),
  location: text('location'),
  duration: varchar('duration', { length: 100 }),
  price: decimal('price', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).default('pending'),
  notes: text('notes'),
  serviceId: uuid('service_id').references(() => services.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index('idx_bookings_status').on(table.status),
  eventDateIdx: index('idx_bookings_event_date').on(table.eventDate),
  createdAtIdx: index('idx_bookings_created_at').on(table.createdAt),
}));

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('unread'),
  priority: varchar('priority', { length: 50 }).default('normal'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index('idx_messages_status').on(table.status),
  priorityIdx: index('idx_messages_priority').on(table.priority),
  createdAtIdx: index('idx_messages_created_at').on(table.createdAt),
}));

// Reviews table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  rating: integer('rating'),
  title: varchar('title', { length: 255 }),
  content: text('content').notNull(),
  serviceType: varchar('service_type', { length: 100 }),
  location: varchar('location', { length: 255 }),
  imageUrl: text('image_url'),
  videoUrl: text('video_url'),
  featured: boolean('featured').default(false),
  approved: boolean('approved').default(false),
  bookingId: uuid('booking_id').references(() => bookings.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  ratingIdx: index('idx_reviews_rating').on(table.rating),
  featuredIdx: index('idx_reviews_featured').on(table.featured),
  approvedIdx: index('idx_reviews_approved').on(table.approved),
}));

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  readTime: varchar('read_time', { length: 50 }),
  category: varchar('category', { length: 100 }),
  tags: text('tags').array(),
  image: text('image'),
  featured: boolean('featured').default(false),
  published: boolean('published').default(false),
  views: integer('views').default(0),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  publishedIdx: index('idx_blog_published').on(table.published),
  categoryIdx: index('idx_blog_category').on(table.category),
  createdAtIdx: index('idx_blog_created_at').on(table.createdAt),
}));

// Settings table
export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: jsonb('value'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// FAQs table
export const faqs = pgTable('faqs', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: varchar('category', { length: 100 }).notNull().default('General'),
  order: integer('order').notNull().default(0),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
  categoryIdx: index('idx_faq_category').on(table.category),
  orderIdx: index('idx_faq_order').on(table.order),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, {
    fields: [reviews.bookingId],
    references: [bookings.id],
  }),
}));

// Removed blog posts relations since we removed authorId field

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;

export type FAQ = typeof faqs.$inferSelect;
export type NewFAQ = typeof faqs.$inferInsert;
