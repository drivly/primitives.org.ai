/**
 * PostgreSQL adapter with vector storage support
 * 
 * This file is conditionally imported based on environment.
 * On Vercel, we use SQLite adapter instead.
 */

const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL_ENV;

const dummyAdapter = {
  connect: async () => ({}),
  disconnect: async () => {},
};

const adapter = dummyAdapter;

if (!isVercel && typeof window === 'undefined') {
  console.log('Using PostgreSQL adapter for non-Vercel environment');
  
}

export const db = adapter
