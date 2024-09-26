const express = require("express");
const axios = require("axios");
const Flight = require("../models/flightModel");
const router = express.Router();

// Environment variables for API keys (ensure these are in your .env file)
const flightApiUrl = "https://api.schiphol.nl/public-flights/flights";
const appKey = process.env.SCHIPHOL_API_KEY;
const appId = process.env.SCHIPHOL_APP_ID;

// Helper function for error handling
const handleErrorResponse = (res, message, error, statusCode = 500) => {
  console.error(message, error);
  res.status(statusCode).json({
    message,
    error: error?.message || "Unknown error",
  });
};

// Fetch flights from Schiphol API
router.get("/", async (req, res) => {
  try {
    const { direction, flightdate } = req.query;

    if (!direction || !flightdate) {
      return res
        .status(400)
        .json({ message: "Flight direction and date are required." });
    }

    const response = await axios.get(flightApiUrl, {
      headers: {
        app_id: appId,
        app_key: appKey,
        resourceversion: "v4",
        Accept: "application/json",
      },
      params: {
        scheduleDate: flightdate,
        flightDirection: direction,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    handleErrorResponse(
      res,
      "Error fetching flight data from Schiphol API",
      error
    );
  }
});

// Add a new flight to MongoDB
router.post("/add-flight", async (req, res) => {
  try {
    const newFlight = new Flight(req.body);

    await newFlight.save();

    res.status(201).json({ message: "Flight added successfully!" });
  } catch (error) {
    handleErrorResponse(res, "Error adding new flight to MongoDB", error);
  }
});

// Get all flights from MongoDB
router.get("/get-flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    handleErrorResponse(res, "Error fetching flight data from MongoDB", error);
  }
});

// Delete a flight by its ID
router.delete("/delete-flight", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Flight ID is required." });
    }

    const flight = await Flight.findOne({ id });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    await Flight.findByIdAndDelete(flight._id);
    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (error) {
    handleErrorResponse(res, "Error deleting flight from MongoDB", error);
  }
});

module.exports = router;
