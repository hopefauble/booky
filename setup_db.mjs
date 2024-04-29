import {db} from './db.mjs';

// Use the db object to run table creation commands and otherwise initialize your database setup here.
await db.run('CREATE TABLE books (id INTEGER PRIMARY KEY, isbn INTEGER(100) NOT NULL)');

db.close();