const express = require("express");
require("dotenv").config();

const { connection } = require("./config/db");
const routes = require("./routes");

const app = express();

app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("WelCome to Library-Management-System");
});

// Routes
app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db!");
  } catch (error) {
    console.log("Error while connecting to db!");
    console.log(error);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
