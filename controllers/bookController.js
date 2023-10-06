const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const { authenticateToken } = require("../middleware/authMiddleware");

// Add a new book
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { ISBN, title, author, publishedYear, quantity } = req.body;

    const newBook = new Book({
      ISBN,
      title,
      author,
      publishedYear,
      quantity,
    });

    await newBook.save();

    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    console.error("Error occurred while adding the book!",error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a book by ID
router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const { ISBN, title, author, publishedYear, quantity } = req.body;
    const bookId = req.params.id;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { ISBN, title, author, publishedYear, quantity },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error occurred while updating the book!",error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a book by ID
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error occurred while deleting the book!", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// List all available books
router.get("/list", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error occurred while listing the books!", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
