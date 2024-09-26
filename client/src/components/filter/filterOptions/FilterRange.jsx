import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const FilterRange = ({ min, max, step, label = "Price Range" }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event) => {
    const newValue = event.target.value.split(",").map(Number);
    setValue(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-800 mb-2">
        {label}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="w-full"
        aria-label={`Select price range between ${min} and ${max}`}
      />

      <div className="flex justify-between text-sm text-gray-700 mt-1">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};

// Prop type validation
FilterRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  label: PropTypes.string,
};

FilterRange.defaultProps = {
  step: 1, // Default step value
  label: "Price Range",
};

export default FilterRange;
