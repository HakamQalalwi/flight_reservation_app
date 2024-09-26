import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import FilterSelect from "./filterOptions/FilterSelect";
import FilterRadioGroup from "./filterOptions/FilterRadioGroup";
import FilterRange from "./filterOptions/FilterRange";

const FilterFlights = ({ airlines, onAirlineSelect }) => {
  const selectOptions = [
    { value: "lowest-price", label: "Lowest Price" },
    { value: "highest-price", label: "Highest Price" },
    { value: "recommended", label: "Recommended" },
  ];

  const defaultAirlines = [
    { value: "turkish-airlines", label: "Turkish Airlines - $230" },
    { value: "emirates", label: "Emirates - $230" },
  ];

  const airlineOptions =
    airlines.length > 0
      ? airlines.map((airline) => ({
          value: airline.iataCode,
          label: `${airline.name} - ${airline.price || "$230"}`,
        }))
      : defaultAirlines;

  const handleAirlineChange = (event) => {
    onAirlineSelect(event.target.value);
  };

  return (
    <div className="p-4 max-h-[500px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Filtreleme Seçenekleri</h2>

      <FilterSelect options={selectOptions} />

      <div className="mb-4">
        <FilterRadioGroup
          title="Arrival Time"
          name="arrival-time"
          options={[
            { value: "5:00 AM - 11:59 PM", label: "5:00 AM - 11:59 PM" },
            { value: "12:00 PM - 5:59 PM", label: "12:00 PM - 5:59 PM" },
          ]}
        />
      </div>

      <div className="mb-4">
        <FilterRadioGroup
          title="Stops"
          name="stops"
          options={[
            { value: "nonstop", label: "Nonstop" },
            { value: "1-stop", label: "1 Stop" },
            { value: "2+-stop", label: "2+ Stops" },
          ]}
        />
      </div>

      <div className="mb-4">
        <FilterRadioGroup
          title="Airlines Included"
          name="airlines"
          options={airlineOptions}
          onChange={handleAirlineChange}
        />
      </div>

      {/* Price range filter */}
      <div className="mb-20">
        <FilterRange />
      </div>
    </div>
  );
};

// Prop type validation
FilterFlights.propTypes = {
  airlines: PropTypes.arrayOf(
    PropTypes.shape({
      iataCode: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string, // Optional price field
    })
  ).isRequired,
  onAirlineSelect: PropTypes.func.isRequired,
};

export default FilterFlights;
