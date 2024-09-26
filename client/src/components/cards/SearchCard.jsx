import React, { useState } from "react";
import { Card, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faPlaneArrival,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import dayjs from "dayjs";

const Search = ({ onSearchClick }) => {
  const [tripType, setTripType] = useState("round");
  const [direction, setDirection] = useState("");
  const [arrival, setArrival] = useState("");
  const [flightDate, setFlightDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = dayjs();

  const handleSearch = async () => {
    if (!direction || !arrival || !flightDate) {
      message.warning("Please fill out all required fields.");
      return;
    }

    if (tripType === "round" && !returnDate) {
      message.warning("Please select a return date for a round trip.");
      return;
    }

    onSearchClick(); // Change loading state
    setLoading(true); // Start loading animation

    const fromAirportCode = direction.toUpperCase();
    const toAirportCode = arrival.toUpperCase();

    try {
      let directionFilter = null;
      if (fromAirportCode !== "AMS" && toAirportCode === "AMS") {
        directionFilter = "A"; // Arrival
      } else if (fromAirportCode === "AMS" && toAirportCode !== "AMS") {
        directionFilter = "D"; // Departure
      }

      if (directionFilter) {
        const response = await axios.get(
          "http://localhost:5001/server/flights",
          {
            params: {
              flightdate: flightDate ? flightDate.format("YYYY-MM-DD") : null,
              direction: directionFilter,
            },
          }
        );

        const flights = response.data.flights;
        if (Array.isArray(flights)) {
          const filteredFlights = flights.filter((flight) => {
            const { destinations } = flight.route;
            return directionFilter === "A"
              ? destinations.includes(fromAirportCode)
              : destinations.includes(toAirportCode);
          });

          if (filteredFlights.length === 0) {
            message.error("No flights found for the given criteria.");
          } else {
            sessionStorage.setItem(
              "filteredFlights",
              JSON.stringify(filteredFlights)
            );
            message.success("Flights found successfully.");
          }
        } else {
          console.error("Unexpected response format:", flights);
        }
      } else {
        console.log("No filtering applied.");
      }
    } catch (error) {
      message.error(`Error fetching flights: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <Card
      className="relative w-auto p-4 bg-white overflow-hidden"
      style={{ minHeight: "300px" }}
    >
      <div className="absolute top-4 left-10 mt-2 flex items-center z-10">
        <FontAwesomeIcon icon={faPlane} className="mr-2 text-lg" />
        <h2 className="text-lg font-bold">BOOK YOUR FLIGHT</h2>
      </div>

      <div className="absolute top-14 right-10 flex items-center z-10">
        <div className="flex trip-options">
          <div
            className={`cursor-pointer px-4 py-2 text-md font-semibold rounded-l-full ${
              tripType === "round"
                ? "bg-purple-800 text-white"
                : "bg-gray-200 text-purple-800"
            } hover:text-white border border-r-0 border-gray-300`}
            onClick={() => {
              setTripType("round");
              setReturnDate(null); // Reset return date for one-way trips
            }}
          >
            Round trip
          </div>
          <div
            className={`cursor-pointer px-4 py-2 text-md font-semibold rounded-r-full ${
              tripType === "one"
                ? "bg-purple-800 text-white"
                : "bg-gray-200 text-purple-800"
            } hover:text-white border border-gray-300`}
            onClick={() => {
              setTripType("one");
              setReturnDate(null); // Reset return date for one-way trips
            }}
          >
            One way
          </div>
        </div>
      </div>

      <div className="pt-16 pb-24 lg:pb-16">
        <div className="flex flex-col lg:flex-row lg:gap-4">
          <div className="flex flex-col lg:flex-row lg:gap-4 mb-8">
            <div className="relative flex-1 min-w-[250px] mb-4 lg:mb-0">
              <FontAwesomeIcon
                icon={faPlaneDeparture}
                bounce
                style={{ color: "#5831a0" }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                className="border border-gray-300 rounded-l-xl pb-1 pl-10 pr-4 py-7 w-full box-border focus:outline-none hover:border-purple-700"
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              />
              <div className="absolute top-0 left-2 text-black-100 text-sm font-semibold mt-2 bg-white px-1">
                From
              </div>
            </div>

            <div className="relative flex-1 min-w-[250px] mb-4 lg:mb-0">
              <FontAwesomeIcon
                icon={faPlaneArrival}
                bounce
                style={{ color: "#5831a0" }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                className="border border-gray-300 rounded-r-xl pb-1 pl-10 pr-4 py-7 w-full box-border focus:outline-none hover:border-purple-700"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
              />
              <div className="absolute top-0 left-2 text-black-100 text-sm font-semibold mt-2 bg-white px-1">
                To
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div className="flex-1 min-w-[250px] mb-4 lg:mb-0">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Flight Date"
                  minDate={today}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      borderRadius: "0.75rem 0 0 0.75rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#d1d5db",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6d28d9",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6d28d9",
                        borderWidth: 1,
                        outline: "none",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#6d28d9",
                    },
                  }}
                  value={flightDate}
                  onChange={(date) => setFlightDate(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarTodayIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            {tripType === "round" && (
              <div className="flex-1 min-w-[250px] mb-4 lg:mb-0">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Return Date"
                    minDate={flightDate || today}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        borderRadius: "0 0.75rem 0.75rem 0",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#d1d5db",
                        },
                        "&:hover fieldset": {
                          borderColor: "#6d28d9",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#6d28d9",
                          borderWidth: 1,
                          outline: "none",
                        },
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#6d28d9",
                      },
                    }}
                    value={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarTodayIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 left-10 z-10">
          <button
            className="px-6 py-3 bg-purple-800 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out"
            onClick={handleSearch}
          >
            Show Flights
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Search;
