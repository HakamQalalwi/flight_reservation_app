import React, { useCallback, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlightDetailsCard from "./DetailsCard";
import { getCityNameFromIATA } from "../../utils/getCityName";
import { getAirlineNameFromIATA } from "../../utils/getAirlineName";
import { formatTime } from "../../utils/formatTime";
import calculateFlightDuration from "../../utils/calculateFlightDuration";
import { Card, Spin, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

const FlightsCard = ({ onAirlinesUpdate, selectedAirline }) => {
  const [flightData, setFlightData] = useState([]);
  const [loggedIds, setLoggedIds] = useState(new Set());
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  // Fetch flight data from sessionStorage or API
  const fetchFlightData = useCallback(() => {
    const storedData = sessionStorage.getItem("filteredFlights");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const filteredData = selectedAirline
        ? parsedData.filter((flight) => flight.prefixIATA === selectedAirline)
        : parsedData;

      setFlightData(filteredData);

      const airlines = filteredData
        .map((flight) => flight.prefixIATA)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((code) => ({
          iataCode: code,
          name: getAirlineNameFromIATA(code),
        }));

      if (onAirlinesUpdate) {
        onAirlinesUpdate(airlines);
      }
    } else {
      setFlightData([]);
    }
    setLoading(false); // Set loading to false after fetching
  }, [selectedAirline, onAirlinesUpdate]);

  // Fetch flight data on component mount and set interval to refresh every 5 seconds
  useEffect(() => {
    fetchFlightData();
    const intervalId = setInterval(fetchFlightData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchFlightData, selectedAirline]);

  // Log flight IDs to avoid duplicating console logs
  useEffect(() => {
    flightData.forEach((flight) => {
      if (!loggedIds.has(flight.id)) {
        console.log(`Flight ID: ${flight.id}`);
        setLoggedIds((prev) => new Set(prev).add(flight.id));
      }
    });
  }, [flightData, loggedIds]);

  // Handle flight booking
  const bookFlight = useCallback(
    async (flight) => {
      try {
        const formattedFlight = {
          ...flight,
          codeshares: Array.isArray(flight.codeshares)
            ? flight.codeshares.map((cs) => String(cs))
            : [],
        };

        const response = await axios.post(
          "http://localhost:5001/server/flights/add-flight",
          formattedFlight
        );
        console.log(response.data);
        message.success("Flight booked successfully!");
        navigate("/my-flights");
      } catch (error) {
        console.error(
          "Error booking flight:",
          error.response ? error.response.data : error.message
        );
        message.error("Error booking flight. Please try again.");
      }
    },
    [navigate]
  );

  // Toggle the visibility of flight details
  const handleToggleDetails = (flight) => {
    if (selectedFlight && selectedFlight.id === flight.id) {
      setSelectedFlight(null);
    } else {
      setSelectedFlight(flight);
    }
  };

  // Memoized value to avoid recalculating flight data
  const displayedFlights = useMemo(() => flightData, [flightData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (flightData.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Currently, there are no flights available.</p>
      </div>
    );
  }

  return (
    <div className="mt-5 px-4 sm:px-6 lg:px-8">
      {displayedFlights.map((flight) => {
        const {
          id,
          flightDirection,
          route,
          scheduleDateTime,
          estimatedLandingTime,
          prefixIATA,
        } = flight;

        const destinations = route?.destinations || [];
        const departureAirport =
          flightDirection === "D" ? "AMS" : destinations[0];
        const arrivalAirport =
          flightDirection === "A"
            ? "AMS"
            : destinations[destinations.length - 1];
        const flightDuration = calculateFlightDuration(
          scheduleDateTime,
          estimatedLandingTime
        );
        const airlineName = getAirlineNameFromIATA(prefixIATA);

        return (
          <div key={id} className="relative mb-5">
            <Card
              className="relative max-w-full bg-white shadow-lg"
              style={{ borderRadius: "12px 12px 12px 0" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Departure Information */}
                <div className="flex flex-col">
                  <h2 className="text-md mb-5 font-bold">
                    {getCityNameFromIATA(departureAirport)} -{" "}
                    {getCityNameFromIATA(arrivalAirport)}
                  </h2>
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        className="text-xs text-gray-600"
                      />
                      <span className="text-md text-gray-500">Departure</span>
                    </div>
                    <span className="text-xl text-gray-900">
                      {formatTime(scheduleDateTime)}
                    </span>
                    <span className="text-lg text-gray-700">
                      Airport: {departureAirport}
                    </span>
                    <div className="pt-5">
                      <span className="text-lg text-purple-800 font-bold">
                        Price: $200
                      </span>
                      <br />
                      <span className="text-lg text-gray-600">Round Trip</span>
                    </div>
                  </div>
                </div>

                {/* Divider for large screens */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="border-t-4 border-gray-300 w-24"></div>
                </div>

                {/* Airline & Duration Information */}
                <div className="flex flex-row items-start">
                  <div className="flex flex-col items-start">
                    <span className="text-md mb-3 font-bold text-gray-900">
                      {airlineName}
                    </span>
                    <FontAwesomeIcon
                      icon={faPlane}
                      className="text-lg mb-3 text-purple-700"
                    />
                    <span className="text-md text-gray-900">
                      {flightDuration} (nonstop)
                    </span>
                  </div>
                </div>

                {/* Divider for large screens */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="border-t-4 border-gray-300 w-24"></div>
                </div>

                {/* Arrival Information */}
                <div className="flex flex-col items-start">
                  <div className="flex space-x-2">
                    <FontAwesomeIcon
                      icon={faPlaneArrival}
                      className="text-lg text-gray-600"
                    />
                    <span className="text-md text-gray-500">Arrival</span>
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-xl text-gray-900">
                      {formatTime(estimatedLandingTime)}
                    </span>
                    <span className="text-lg text-gray-900">
                      Airport: {arrivalAirport}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Flight Button */}
              <button
                onClick={() => bookFlight(flight)}
                className="absolute bottom-4 right-4 bg-purple-800 text-white hover:bg-purple-600 py-2 px-4 rounded"
              >
                Book Flight
              </button>
            </Card>

            {/* Toggle Details Button */}
            <div className="flex justify-start">
              <button
                onClick={() => handleToggleDetails(flight)}
                className="bg-gray-400 bg-opacity-40 text-purple-800 hover:bg-slate-100 py-2 px-4 rounded"
                style={{ textDecoration: "underline" }}
              >
                Check the details
              </button>
            </div>

            {/* Flight Details */}
            {selectedFlight && selectedFlight.id === flight.id && (
              <FlightDetailsCard
                flight={selectedFlight}
                onClose={() => setSelectedFlight(null)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlightsCard;
