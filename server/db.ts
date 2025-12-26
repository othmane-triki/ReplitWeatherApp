import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import 'dotenv/config';

const { Pool } = pg;

// We removed the 'throw Error' so the app doesn't crash on Render
export const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL }) 
  : null;

export const db = pool ? drizzle(pool, { schema }) : null;