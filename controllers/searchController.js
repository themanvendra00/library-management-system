const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Search for a book by title, author, or ISBN
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { ISBN: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
