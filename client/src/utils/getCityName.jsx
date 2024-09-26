import airports from "airports";

const airportMap = new Map(
  airports.map((airport) => [airport.iata, airport.name])
);

export const getCityNameFromIATA = (iataCode) => {
  if (typeof iataCode !== "string" || iataCode.length !== 3) {
    return "Invalid IATA code";
  }

  return airportMap.get(iataCode) || "Unknown";
};
