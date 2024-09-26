import React, { useState } from "react";

const AirlinesFilter = () => {
  const [selectedAirline, setSelectedAirline] = useState("");

  const handleAirlineChange = (event) => {
    setSelectedAirline(event.target.value);
    // Additional logic can be added here to handle the filtering
  };

  return (
    <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-40">
      <h2 className="text-lg font-semibold mb-2">Filter by Airlines</h2>
      <form>
        <div className="mb-2">
          <label
            htmlFor="airline"
            className="block text-sm font-medium text-gray-700"
          >
            Airline:
          </label>
          <select
            id="airline"
            value={selectedAirline}
            onChange={handleAirlineChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <option value="">Select Airline</option>
            <option value="southwest">Southwest</option>
            <option value="delta">Delta</option>
            <option value="united">United</option>
            <option value="american">American</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default AirlinesFilter;
