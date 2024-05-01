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
    const ids = await Book.getAllIDs(); // Assuming getAllIDs is a function that returns an array of book IDs

    const books = await Promise.all(ids.map(async (id) => {
      const book = await Book.findByID(id);
      return book.json(); // Assuming json() returns the JSON representation of the book
    }));

    res.json(books);
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
    if (!req.body.notes) {
        req.body.notes = "";
    }

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
    if (!await Book.findByID(req.params.id)) {
        res.status(404).send("Book not found.");
        return;
    }

    if (!await Book.deleteBookByID(req.params.id)) {
        res.status(400).send("Book not deleted");
        return;
    }
    res.json(true);
})

app.get('/completed', async (req, res) => {
    const ids = await Completed.getAllIDs(); // Assuming getAllIDs is a function that returns an array of book IDs

    const books = await Promise.all(ids.map(async (id) => {
      const book = await Completed.findByID(id);
      return book.json(); // Assuming json() returns the JSON representation of the book
    }));

    res.json(books);
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

    if (!book) {
        res.status(404).send("Book not found.");
        return;
    }

    let ing = await Completed.create({ isbn: book.getISBN(), title: book.getTitle(), authors: book.getAuthors(), description: book.getDescription(), notes: book.getNotes() });
    
    if (!ing) {
        res.status(400).send("Bad request, not moved to completed list.");
        return;
    }

    let deletion = await Book.deleteBookByID(req.params.id);

    if (!deletion) {
        res.status(400).send("Not deleted from booklist")
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


app.listen(port, () => {
    console.log('Running on ' + port + '...');
})