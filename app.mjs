import express from 'express';
import bodyParser from 'body-parser';
import {Book} from './Book.mjs';

const app = express();

const port = 3000;

app.use(bodyParser.json());


// return a list is isbns 
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

app.post('/books/:isbn', async (req, res) => {

    let ing = await Book.create(req.params.isbn);

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

app.put('/books/:id', async (req, res) => {
    let ing = await Book.findByID(req.params.id);
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

app.delete('/books/:id', async (req, res) => {
    if (!await Book.deleteBookByID(req.params.id)) {
        res.status(400).send("Book is still in use");
        return;
    } 
    res.json(true);
})

await Book.create({isbn: 9780345445605})

app.listen(port, () => {
    console.log('Running on ' + port + '...');
})