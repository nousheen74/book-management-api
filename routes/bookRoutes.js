const express = require('express');
const multer = require("multer");
const router = express.Router();
const {getAllBooks, getBookById, addBook, updateBook, deleteBook, importBooks} = require('../controllers/bookControllers');
const upload = multer({dest: 'uploads/'})

router.route("/").get(getAllBooks); //GET books API 
router.route("/:id").get(getBookById); //GET books  API
router.route("/").post(addBook); //POST books API
router.route("/:id").put(updateBook); // PUT book API
router.route("/:id").delete(deleteBook); //delete book API
router.post('/import', upload.single('file'), importBooks);

module.exports = router;
