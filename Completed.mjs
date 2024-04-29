import {db} from './db.mjs';
export class Completed {

    #id
    #isbn

    constructor (id, isbn) {
        this.#id = id;
        this.#isbn = isbn;
    }

    static async create(data) {
        // if ((data !== undefined) && (data instanceof Object) 
        // ) {
            try {
                let db_result = await db.run('insert into Books values (NULL, ?)', data.isbn);
                let ing = new Book(db_result.lastID, data.isbn);
                console.log("HERE");
                return ing;
            } catch (e) {
                return null;
            }
        }
        // return null;
    // }

    static async getAllIDs() {
        try {
            let rows = await db.all('select id from Books');
            return rows.map(r => r.id);
        } catch (e) {
            return [];
        }
    }

    static async getAllISBNs() {
        try {
            let rows = await db.all('select isbn from Books');
            return rows.map(r => r.isbn);
        } catch (e) {
            return [];
        }
    }

    static async findByID(id) {
        try {
            let row = await db.get('select * from Books where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Book(row.id, row.isbn);
            }
        } catch (e) {
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
            isbn: this.#isbn
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