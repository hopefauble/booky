# Welcome to Booky!

## Once you've cloned this repo, take these steps to set up the program:

### Front-end Setup

1. Open a new terminal, change the working directory to `frontend` and run `npm install`.
2. Run `ng serve` to begin the front-end development server.
3. The front-end server will run on localhost:4200.

### Back-end Setup

1. Open a new terminal, in the root directory run `npm install`.
2. You may need to download additional dependencies, such as sqlite3, cors. Sometimes standard npm install misses these.
3. The database should already be set up, and you can run `node app.mjs` to run the backend database. It will receive requests on port 3000.


### Usage
After these steps have all been taken, you should be able to freely interact with the program on localhost:4200 in your web browser.

## Book Search Page
1. Navigate to the book search page where you can search for books by title or author.
2. Click the "Search" button to display a list of books with their title, author, ISBN, and description. 
3. Each book has a "Save to Reading List" button to add it your reading list. 
4. You can also mark a book as finished by clicking "I've finished reading this" which will simply move the book to your finished books list. 

## Reading List Page
1. Access you reading list where you can see all your saved books. 
2. Each book has a "Delete" button to remove it from the reading list. 
3. You can navigate to the finished book page by clicking "I've finished this", where you will see all the books that you have finished reading. 

## Finished Book Page
1. View a list of all the books you have marked as finished. 
2. Each book has a "Delete" button to remove it permanently. 
3. There is also a "Return to Booklist" button to go back to the book search page. 
