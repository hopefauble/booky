import {db} from './db.mjs';

// Use the db object to run table creation commands and otherwise initialize your database setup here.
await db.run('CREATE TABLE books (id INTEGER PRIMARY KEY, isbn TEXT NOT NULL, title TEXT NOT NULL, authors TEXT NOT NULL, description TEXT NOT NULL)');

await db.run('CREATE TABLE completed (id INTEGER PRIMARY KEY, isbn TEXT)')

db.close();