import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set.\n' +
    'Please add it to your .env.local file:\n' +
    'DATABASE_URL=postgresql://your_user:your_password@your_host/your_db?sslmode=require'
  );
}

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export type Database = typeof db;
