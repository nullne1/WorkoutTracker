import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

// Create a local SQLite database file
const db = new Database("database.sqlite");

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
});