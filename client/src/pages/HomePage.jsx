import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import Header from "../components/header/home/Header.jsx";
import SearchCard from "../components/cards/SearchCard.jsx";
import FlightsCard from "../components/cards/FlightsCard.jsx";
import FilterFlights from "../components/filter/FilterFlights.jsx";
import InfoCard from "../components/cards/InfoCard.jsx";
import Loading from "../components/loading/Loading.jsx";

const HomePage = () => {
  const [loading, setLoading] = useState(false); // State for loading status
  const [airlines, setAirlines] = useState([]); // State to hold airline data
  const [selectedAirline, setSelectedAirline] = useState(null); // State for selected airline

  const handleSearchClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setLoading(false);
  };

  const handleAirlinesUpdate = (airlines) => {
    setAirlines(airlines);
  };

  const handleAirlineSelect = (selectedAirline) => {
    setSelectedAirline(selectedAirline);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row md:space-x-4 p-4 mt-6">
        <div className="flex flex-col flex-grow">
          <SearchCard onSearchClick={handleSearchClick} />
          <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
            {/* Filter for mobile view */}
            <div className="md:hidden mb-4">
              <FilterFlights
                airlines={airlines}
                onAirlineSelect={handleAirlineSelect}
              />
            </div>
            <div className="flex flex-col md:w-2/3">
              <div className="h-96 overflow-y-auto">
                <FlightsCard
                  onAirlinesUpdate={handleAirlinesUpdate}
                  selectedAirline={selectedAirline}
                />
              </div>
            </div>
            {/* Filter for desktop view */}
            <div className="flex-col md:w-1/3 hidden md:block">
              <FilterFlights
                airlines={airlines}
                onAirlineSelect={handleAirlineSelect}
              />
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col md:space-y-4 space-y-2">
          <InfoCard />
        </div>
      </div>
      <div className="flex md:hidden justify-center space-y-2 p-4">
        <InfoCard />
      </div>
      {loading && <Loading />}
    </div>
  );
};

// PropTypes for type checking
HomePage.propTypes = {
  airlines: PropTypes.array.isRequired,
  selectedAirline: PropTypes.object,
  onAirlinesUpdate: PropTypes.func,
  onAirlineSelect: PropTypes.func,
};

export default HomePage;
