const express = require("express");
const router = express.Router();
const BorrowedBook = require("../models/BorrowedBook");
const { authenticateToken } = require("../middleware/authMiddleware");

// Borrow a book
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { userId, bookId, returnDate } = req.body;

    // Check if the user has already borrowed the maximum allowed books
    const userBorrowedBooks = await BorrowedBook.find({ userId });
    if (userBorrowedBooks.length >= 3) {
      return res.status(400).json({ message: "Maximum borrow limit reached" });
    }

    // Create a new borrowed book record
    const newBorrowedBook = new BorrowedBook({
      userId,
      bookId,
      returnDate,
      returned: false,
    });
    await newBorrowedBook.save();

    res.status(201).json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.error("Error occurred while borrowing the book!", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Return a borrowed book by ID
router.put("/return/:id", async (req, res) => {
  try {
    const borrowedBookId = req.params.id;

    // Find the borrowed book record
    const borrowedBook = await BorrowedBook.findById(borrowedBookId);
    if (!borrowedBook) {
      return res.status(404).json({ message: "Borrowed book not found" });
    }

    // Check if the book is already returned
    if (borrowedBook.returned) {
      return res.status(400).json({ message: "Book is already returned" });
    }

    // Update the borrowed book record to mark it as returned
    borrowedBook.returned = true;
    await borrowedBook.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error occurred while returning the book!", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
