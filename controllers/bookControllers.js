const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const dbPath = path.join(__dirname, "../config/database.db");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const readline = require('readline');

// Function to get all books
const getAllBooks = async (req, res) => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        const books = await db.all("SELECT * FROM books");
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.status(500).json({ error: "Failed to fetch books" });
    }
};

const getBookById = async (req, res) => {
    try{
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        const book = await db.get("SELECT * FROM books WHERE id = ?", [req.params.id]);
        if (!book){
            return res.status(404).json({error:"Book not found"});
        }
        res.status(200).json(book);
    }catch(error){
        console.error("Error fetching book:", error.message);
        res.status(500).json({ error: "Failed to fetch book" });
    }
}

const addBook = async (req, res) => {
    const {title, author, publishedYear} = req.body
    if (!title || !author || !publishedYear){
        return res.status(400).json({error: "Please provide all required fields: title, author, publishedYear"});
    }
    try{
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        const id = uuidv4();
        const query = `INSERT INTO books (id, title, author, publishedYear) VALUES (?,?,?,?)`;
        await db.run(query, [id,title, author, publishedYear])
        res.status(201).json({message: "Book added successfully", book: {id, title, author, publishedYear}});
    }catch(error){
        console.log("Error adding book:", error.message);
        res.status(500).json({error: "Failed to add book"});
    }
}

const updateBook = async (req, res) => {
    const { title, author, publishedYear } = req.body;
    // Validating the request body
    if (!title || !author || !publishedYear) {
        return res.status(400).json({ error: "Please provide all required fields for update: title, author, publishedYear" });
    }
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        console.log("Updating book with ID:", req.params.id); // Debugging log to confirm the id.
        //sql query to update the book
        const query = `UPDATE books SET title = ?, author = ?, publishedYear = ? WHERE id = ?`;
        const result = await db.run(query, [title, author, publishedYear, req.params.id]);
        // Check if the book was updated
        if (result.changes === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({message: "Book updated successfully",book: { id: req.params.id, title, author, publishedYear },});
    } catch (error) {
        console.log("Error updating book:", error.message);
        res.status(500).json({ error: "Failed to update book" });
    }
};

const deleteBook = async (req, res) => {
    try{
        const db = await open({
            filename: dbPath, 
            driver: sqlite3.Database,
        })
        const query = `DELETE FROM books WHERE id = ?`;
        const result = await db.run(query, [req.params.id]);
        if (result.changes === 0){
            res.status(404).json({error: "Book not Found"});
        }
        res.status(200).json({message: "Book deleted succesfully"});
    }catch(error){
        console.log("Error deleting book:", error.message);
        res.status(500).json({error: "Failed to delete the book"});
    }
}

const importBooks = async (req, res) => {
    const filePath = req.file.path; // Path to the uploaded CSV file
    const validBooks = [];
    const errors = [];
    let lineNumber = 0;

    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            lineNumber++;
            const [title, author, publishedYear] = line.split(',');

            // Validate the row
            if (!title || !author || !publishedYear || isNaN(publishedYear)) {
                errors.push({ line: lineNumber, error: 'Invalid or missing fields', row: line });
                continue;
            }

            // Add valid book to the array
            validBooks.push({ id: uuidv4(), title: title.trim(), author: author.trim(), publishedYear: parseInt(publishedYear.trim()) });
        }

        // Insert valid books into the database
        for (const book of validBooks) {
            const query = `INSERT INTO books (id, title, author, publishedYear) VALUES (?, ?, ?, ?)`;
            await db.run(query, [book.id, book.title, book.author, book.publishedYear]);
        }

        // Return the summary
        res.status(200).json({
            message: 'Books imported successfully',
            booksAdded: validBooks.length,
            errors,
        });
    } catch (error) {
        console.error('Error importing books:', error.message);
        res.status(500).json({ error: 'Failed to import books' });
    } finally {
        // Clean up the uploaded file
        fs.unlinkSync(filePath);
    }
};



module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook, importBooks};