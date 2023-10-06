const express = require("express");
const router = express.Router();

// Import your controllers
const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const borrowController = require("../controllers/borrowController");
const searchController = require("../controllers/searchController");

// Authentication routes
router.use("/auth", authController);

// Book management routes
router.use("/books", bookController);

// Borrowing and returning routes
router.use("/borrow", borrowController);

// Search functionality routes
router.use("/search", searchController);

module.exports = router;
