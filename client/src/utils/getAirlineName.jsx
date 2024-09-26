import airlinesData from "../data/airlines.json";

const airlineMap = new Map(
  airlinesData.map((item) => [item.IATACode, item.Airline])
);

export const getAirlineNameFromIATA = (iataCode) => {
  if (typeof iataCode !== "string" || iataCode.length !== 3) {
    return "Invalid IATA code"; // Validate the IATA code
  }

  return airlineMap.get(iataCode) || "Unknown Airline"; // Use map for quick lookup
};
