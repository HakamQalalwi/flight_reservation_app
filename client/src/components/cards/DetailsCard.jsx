import React from "react";
import { formatTime } from "../../utils/formatTime"; // Importing time formatting function

const FlightDetailsCard = ({ flight, onClose }) => {
  // Ensure flight object exists to avoid errors
  if (!flight) {
    return <p>No flight details available.</p>;
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md">
      {/* Close button with better accessibility */}
      <button
        aria-label="Close flight details"
        className="text-red-500 font-semibold text-sm mb-4 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        onClick={onClose}
      >
        Close
      </button>

      {/* Flight details */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          {/* Schedule date and time */}
          <div className="flex items-center">
            <span className="font-medium text-gray-900 w-32">
              Schedule Date:
            </span>
            <span className="text-gray-700">
              {formatTime(flight.scheduleDateTime) || "N/A"}
            </span>
          </div>

          {/* Flight number */}
          <div className="flex items-center">
            <span className="font-medium text-gray-900 w-32">
              Flight Number:
            </span>
            <span className="text-gray-700">
              {flight.flightNumber || "N/A"}
            </span>
          </div>

          {/* Airline code */}
          <div className="flex items-center">
            <span className="font-medium text-gray-900 w-32">
              Airline Code:
            </span>
            <span className="text-gray-700">{flight.airlineCode || "N/A"}</span>
          </div>

          {/* Service type */}
          <div className="flex items-center">
            <span className="font-medium text-gray-900 w-32">
              Service Type:
            </span>
            <span className="text-gray-700">{flight.serviceType || "N/A"}</span>
          </div>

          {/* Flight name */}
          <div className="flex items-center">
            <span className="font-medium text-gray-900 w-32">Flight Name:</span>
            <span className="text-gray-700">{flight.flightName || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsCard;
