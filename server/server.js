const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5001; // Use environment variable or default to 5001

// Route'lar
const flightRoute = require("./routes/flights.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

// Route'ları tanımlama
app.use("/server/flights", flightRoute); // Uçuş verileri için route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred!" });
});

// Başlatma
const startServer = async () => {
  await connectToDatabase(); // Ensure DB connection is established before starting server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
