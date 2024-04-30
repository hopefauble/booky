import {db} from './db.mjs';
export class Book {

    #id
    #isbn
    #title
    #authors
    #description

    constructor (id, isbn, title, authors, description) {
        this.#id = id;
        this.#isbn = isbn;
        this.#title = title;
        this.#authors = authors;
        this.#description =  description;
    }

    static async create(data) {
        // if ((data !== undefined) && (data instanceof Object) 
        // ) {
            try {
                let db_result = await db.run('insert into Books values (NULL, ?, ?, ?, ?)', data.isbn, data.title, data.authors, data.description);
                let ing = new Book(db_result.lastID, data.isbn, data.title, data.authors, data.description);
                return ing;
            } catch (e) {
                return null;
            }
        }
        // return null;
    // }

    static async getAllIDs() {
        try {
            let rows = await db.all('select id from books');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async getAllbooks(){
        try{
            let rows = await db.all('select * from books');
            return rows;
        } catch (e){
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
                return new Book(row.id, row.isbn, row.title, row.authors, row.description);
            }
        } catch (e) {
            console.error("Error fetching book by ID:", e);
            return null;
        }
    }
        
    

    static async deleteBookByID(id) {
        try {
            await db.run('delete from Books where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    json() {
        return {
            id: this.#id,
            isbn: this.#isbn,
            title: this.#title,
            authors: this.#authors,
            description: this.#description
        }
    }

    getID() {
        return this.#id;
    }

    async setisbn(new_isbn) {
        try {
            await db.run('update Books set isbn = ? where id = ?', this.#isbn, this.#id);
            this.#isbn = new_isbn;
            return true;
        } catch (e) {
            return false;
        }
    }
}