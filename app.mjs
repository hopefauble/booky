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
//get all books
app.get('/books/all', async (req, res) => {
    try{
        let books = await Book.getAllbooks();
        res.json(books);
    } catch (error) {
        console.error('Error', error);
        res.status(500).send("Internal Server Error");
    }
});
//
app.post('/books/', async (req, res) => {
    let ing = await Book.create(req.body);

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

    if ((!req.body instanceof Object) || (req.body.id == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    await ing.setID(req.body.isbn);
    res.json(true);
})

app.delete('/books/:id', async (req, res) => {
    if (!await Completed.deleteBookByisbn(req.params.isbn)) {
        res.status(400).send("Book not deleted");
        return;
    }
    res.json(true);
})
app.get('/books/:id')

app.get('/completed', async (req, res) => {
    res.json(await Completed.getAllISBNs());
});


app.get('/completed/:id', async (req, res) => {
    let ing = await Completed.findByisbn({ id: req.params.id });
    if (!ing) {
        res.status(404).send("Book not found");
        return;
    }
    res.json(ing.json());
});

app.post('/completed/:isbn', async (req, res) => {

    let ing = await Completed.create({ id: req.params.id });
    let deletion = await Book.deleteBookByID({ id: req.params.id });

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



// await Book.create({isbn: "9780345445605", title: "The Hobbit", authors: "J.R.R. Tolkien", description: "A story of a little man going on a big journey."})

app.listen(port, () => {
    console.log('Running on ' + port + '...');
})