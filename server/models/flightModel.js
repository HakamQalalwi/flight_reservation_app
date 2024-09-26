const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  lastUpdatedAt: Date,
  actualLandingTime: Date,
  codeshares: [String],
  estimatedLandingTime: Date,
  flightDirection: String,
  flightName: String,
  flightNumber: Number,
  id: String,
  prefixIATA: String,
  prefixICAO: String,
  airlineCode: Number,
  route: {
    destinations: [String],
  },
  scheduleDateTime: Date,
  scheduleDate: String,
  scheduleTime: String,
  serviceType: String,
  terminal: Number,
});

const Flight = mongoose.model("flights", flightSchema);
module.exports = Flight;
