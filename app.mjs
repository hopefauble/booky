import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { Book } from './Book.mjs';
import { Completed } from './Completed.mjs';

const app = express();

const port = 3000;

app.use(cors());
app.use(bodyParser.json());


// return a list is isbns 
app.get('/books', async (req, res) => {
    res.json(await Book.getAllISBNs());
});

app.get('/books/:isbn', async (req, res) => {
    let ing = await Book.findByisbn({ isbn: req.params.isbn });
    if (!ing) {
        res.status(404).send("Book not found");
        return;
    }
    res.json(ing.json());
});

app.post('/books/:isbn', async (req, res) => {

    let ing = await Book.create({ isbn: req.params.isbn });

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

app.put('/books/:isbn', async (req, res) => {
    let ing = await Book.findByisbn(req.params.isbn);
    if (!ing) {
        res.status(404).send("Book not found.");
        return;
    }

    if ((!req.body instanceof Object) || (req.body.isbn == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    await ing.setISBN(req.body.isbn);
    res.json(true);
})

app.delete('/books/:isbn', async (req, res) => {
    if (!await Completed.deleteBookByisbn(req.params.isbn)) {
        res.status(400).send("Book not deleted");
        return;
    }
    res.json(true);
})

app.get('/completed', async (req, res) => {
    res.json(await Completed.getAllISBNs());
});

app.get('/completed/:isbn', async (req, res) => {
    let ing = await Completed.findByisbn({ isbn: req.params.isbn });
    if (!ing) {
        res.status(404).send("Book not found");
        return;
    }
    res.json(ing.json());
});

app.post('/completed/:isbn', async (req, res) => {

    let ing = await Completed.create({ isbn: req.params.isbn });
    let deletion = await Book.deleteBookByID({ isbn: req.params.isbn });

    if (!ing || !deletion) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

app.put('/completed/:isbn', async (req, res) => {
    let ing = await Completed.findByisbn(req.params.isbn);
    if (!ing) {
        res.status(404).send("Book not found.");
        return;
    }

    if ((!req.body instanceof Object) || (req.body.isbn == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    await ing.setISBN(req.body.isbn);
    res.json(true);
})

app.delete('/completed/:isbn', async (req, res) => {
    if (!await Completed.deleteBookByisbn(req.params.isbn)) {
        res.status(400).send("Book not deleted.");
        return;
    }
    res.json(true);
})

// await Book.create({isbn: 9780345445605})

app.listen(port, () => {
    console.log('Running on ' + port + '...');
})