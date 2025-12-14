const express = require("express");
const cors = require("cors");
const fs = require("fs");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const db = require("./db/database");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database
db.exec(fs.readFileSync("./db/schema.sql", "utf8"), (err) => {
  if (err) {
    console.error("Error initializing database:", err);
  } else {
    console.log("Database initialized successfully");
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);

app.listen(3001, () => console.log("Backend running on port 3001"));
