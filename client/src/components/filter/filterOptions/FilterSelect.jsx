import React, { useState } from "react";
import PropTypes from "prop-types";

const FilterSelect = ({ options = [], onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]?.value || "");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-bold text-gray-800">Sort by:</label>
      <div className="relative mt-1">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="block w-full p-2 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-purple-800 focus:border-purple-800 sm:text-sm appearance-none"
          aria-label="Sort options"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
FilterSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func, // Callback function for selection change
};

// Default props
FilterSelect.defaultProps = {
  options: [], // Default to an empty array
};

export default FilterSelect;
