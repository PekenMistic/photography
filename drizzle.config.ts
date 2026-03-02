import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://rst_owner:npg_iwVZleU93EjS@ep-floral-king-a1lh4ej5-pooler.ap-southeast-1.aws.neon.tech/rst?sslmode=require",
  },
  verbose: true,
  strict: true,
});
