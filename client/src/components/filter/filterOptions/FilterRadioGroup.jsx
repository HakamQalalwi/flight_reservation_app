import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const FilterRadioGroup = React.memo(({ title, name, options, onChange }) => (
  <div className="mb-4">
    <h3 className="text-sm font-bold text-gray-800 mb-2">{title}</h3>
    <div className="flex flex-col space-y-2">
      {/* Render options */}
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
            onChange={onChange}
            aria-labelledby={`${name}-${option.value}`} // Accessibility improvement
          />
          <span
            id={`${name}-${option.value}`}
            className="text-sm text-gray-700"
          >
            {option.label}
          </span>
          {option.price && (
            <span className="ml-2 text-gray-500">{option.price}</span>
          )}
        </label>
      ))}
    </div>
  </div>
));

// Prop type validation
FilterRadioGroup.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      price: PropTypes.string, // Optional price field
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterRadioGroup;
