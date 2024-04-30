import { db } from './db.mjs';
export class Book {

    #id
    #isbn
    #title
    #authors
    #description
    #notes

    constructor(id, isbn, title, authors, description, notes) {
        this.#id = id;
        this.#isbn = isbn;
        this.#title = title;
        this.#authors = authors;
        this.#description = description;
        this.#notes = notes;
    }

    static async create(data) {
        try {
            // Stretch two: check if the book already exists. If so, return "Book exists."
            let db_result = await db.run('insert into Books values (NULL, ?, ?, ?, ?, ?)', data.isbn, data.title, data.authors, data.description, "");
            let ing = new Book(db_result.lastID, data.isbn, data.title, data.authors, data.description, "");
            return ing;
        } catch (e) {
            return null;
        }
    }


    static async getAllIDs() {
        try {
            let rows = await db.all('select id from books');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async getAllISBNs() {
        try {
            let rows = await db.all('select isbn from books');
            return rows.map(r => r.isbn);
        } catch (e) {
            return [];
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from books where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Book(row.id, row.isbn, row.title, row.authors, row.description, row.notes);
            }
        } catch (e) {
            console.error("Error fetching book by ID:", e);
            return null;
        }
    }
        
    

    static async deleteBookByID(id) {
        try {
            await db.run('delete from books where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    async setNotes(id, new_note) {
        try {
            await db.run('update books set notes = ? where id = ?', [new_note, id]);
            this.#notes = new_note;
            return true;
        } catch (e) {
            console.error("Error setting notes:", e);
            return false;
        }
    }


    json() {
        return {
            id: this.#id,
            isbn: this.#isbn,
            title: this.#title,
            authors: this.#authors,
            description: this.#description,
            notes: this.#notes
        }
    }

    getID() {
        return this.#id;
    }

    getISBN() {
        return this.#isbn;
    }

    getTitle() {
        return this.#title;
    }

    getAuthors() {
        return this.#authors
    }

    getDescription() {
        return this.#description
    }

    getNotes() {
        return this.#notes
    }

}