import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { Book } from './Book.mjs';
import { Completed } from './Completed.mjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


// return an array of book objects
app.get('/books', async (req, res) => {
    res.json(await Book.getAllIDs());
});

app.get('/books/:id', async (req, res) => {
    let ing = await Book.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Book not found");
        return;
    }
    res.json(ing.json());
});

app.post('/books/', async (req, res) => {
    let ing = await Book.create(req.body);

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})


// WIP: Stretch goal - user notes.
app.put('/books/:id', async (req, res) => {
    let ing = await Book.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Book not found.");
        return;
    }

    if (!req.body || typeof req.body.notes !== 'string') {
        res.status(400).send("Bad request");
        return;
    }

    let updated = await ing.setNotes(req.params.id, req.body.notes);
    if (!updated) {
        res.status(500).send("Failed to update notes.");
        return;
    }

    res.json(true);
});
app.delete('/books/:id', async (req, res) => {
    if (!await Book.deleteBookByID(req.params.id)) {
        res.status(400).send("Book not deleted");
        return;
    }
    res.json(true);
})

app.get('/completed', async (req, res) => {
    res.json(await Completed.getAllIDs());
});

app.get('/completed/:id', async (req, res) => {
    let ing = await Completed.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Book not found");
        return;
    }
    res.json(ing.json());
});

app.post('/completed/:id', async (req, res) => {

    let book = await Book.findByID(req.params.id)

    let ing = await Completed.create({ isbn: book.getISBN(), title: book.getTitle(), authors: book.getAuthors(), description: book.getDescription(), notes: book.getNotes() });
    let deletion = await Book.deleteBookByID(req.params.id);
    ;
    if (!ing || !deletion) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

// Stretch goal - user notes
app.put('/completed/:id', async (req, res) => {
    let ing = await Completed.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Book not found.");
        return;
    }

    if (!req.body || typeof req.body.notes !== 'string') {
        res.status(400).send("Bad request");
        return;
    }

    let success = await ing.setNotes(req.params.id, req.body.notes);
    if (!success) {
        res.status(500).send("Failed to update notes.");
        return;
    }

    res.json(true);
});


app.delete('/completed/:id', async (req, res) => {

    let book = await Completed.findByID(req.params.id);

    if (!book) {
        res.status(404).send("Book not found.");
        return;
    }

    if (!await Completed.deleteBookByID(req.params.id)) {
        res.status(400).send("Book not deleted.");
        return;
    }

    if (req.query.move == "true") {

        let ing = await Book.create({ isbn: book.getISBN(), title: book.getTitle(), authors: book.getAuthors(), description: book.getDescription(), notes: book.getNotes() });

        if (!ing) {
            res.status(400).send("Bad request, book not returned to booklist.");
            return;
        }
    }

    res.json(true);
})

// await Book.create({isbn: "9780345445605", title: "The Hobbit", authors: "J.R.R. Tolkien", description: "A story of a little man going on a big journey."})
// await Completed.create({isbn: "9780345445605", title: "The Hobbit", authors: "J.R.R. Tolkien", description: "A story of a little man going on a big journey."})

app.listen(port, () => {
    console.log('Running on ' + port + '...');
})