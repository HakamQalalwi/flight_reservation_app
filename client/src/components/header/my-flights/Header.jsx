import React, { useState, useRef, useEffect } from "react";
import TimeFilter from "./filters/TimeFilter";
import StopFilter from "./filters/StopFilter";
import AirlinesFilter from "./filters/AirlinesFilter";
import AirportsFilter from "./filters/AirportsFilter";
import AmenitiesFilter from "./filters/AmenitiesFilter";
import { Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Reusable Button component for filter buttons
const FilterButton = ({ label, isActive, onClick, ariaExpanded }) => (
  <button
    onClick={onClick}
    aria-expanded={ariaExpanded}
    className={`bg-white border border-gray-100 hover:border-gray-400 text-gray-800 font-sans rounded-lg shadow-sm transition duration-150 ease-in-out w-full text-center`}
  >
    {label}
  </button>
);

const Header = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [ratingValue, setRatingValue] = useState(3);
  const containerRef = useRef(null);

  const handleClick = (item) => {
    setActiveItem(activeItem === item ? null : item);
  };

  const handleEditSearchClick = () => {
    setShowFilters((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setActiveItem(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white p-4">
      <div
        ref={containerRef}
        className="flex flex-col sm:flex-row sm:justify-between"
      >
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4">
          {showFilters && (
            <>
              <div className="relative flex-1 min-w-[110px]">
                <FilterButton
                  label="Times"
                  isActive={activeItem === "Times"}
                  onClick={() => handleClick("Times")}
                  ariaExpanded={activeItem === "Times"}
                />
                {activeItem === "Times" && <TimeFilter />}
              </div>

              <div className="relative flex-1 min-w-[110px]">
                <FilterButton
                  label="Stop"
                  isActive={activeItem === "Stop"}
                  onClick={() => handleClick("Stop")}
                  ariaExpanded={activeItem === "Stop"}
                />
                {activeItem === "Stop" && <StopFilter />}
              </div>

              <div className="relative flex-1 min-w-[110px]">
                <FilterButton
                  label="Airlines"
                  isActive={activeItem === "Airlines"}
                  onClick={() => handleClick("Airlines")}
                  ariaExpanded={activeItem === "Airlines"}
                />
                {activeItem === "Airlines" && <AirlinesFilter />}
              </div>

              <div className="relative flex-1 min-w-[110px]">
                <FilterButton
                  label="Airports"
                  isActive={activeItem === "Airports"}
                  onClick={() => handleClick("Airports")}
                  ariaExpanded={activeItem === "Airports"}
                />
                {activeItem === "Airports" && <AirportsFilter />}
              </div>

              <div className="relative flex-1 min-w-[110px]">
                <FilterButton
                  label="Amenities"
                  isActive={activeItem === "Amenities"}
                  onClick={() => handleClick("Amenities")}
                  ariaExpanded={activeItem === "Amenities"}
                />
                {activeItem === "Amenities" && <AmenitiesFilter />}
              </div>
            </>
          )}

          <h1
            className="min-w-[110px] text-blue-600 font-bold mr-2 cursor-pointer flex items-center select-none"
            onClick={handleEditSearchClick}
            style={{ userSelect: "none" }}
          >
            Edit Search
            <span
              className={`ml-2 inline-block transition-transform duration-300 ${
                showFilters ? "rotate-90" : "rotate-270"
              }`}
              style={{ fontSize: "0.75rem" }}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </h1>
        </div>

        {showFilters && (
          <div className="mt-2">
            <div className="mr-2">
              <Rate
                onChange={setRatingValue}
                value={ratingValue}
                style={{ fontSize: "20px" }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
