import React from "react";
import Header from "../components/header/my-flights/Header";
import SortBy from "../components/common/SortBy";
import AvgFare from "../components/common/AvgFare";
import MyFlightsCard from "../components/cards/MyFlightsCard";

const MyFlightsPage = () => {
  const isLoading = false; // Placeholder for loading state
  const hasError = false; // Placeholder for error state
  const flightsAvailable = true; // Placeholder for availability of flight data

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex justify-between p-4 mt-5">
        <SortBy />
        <AvgFare />
      </div>
      <div className="container mx-auto p-4 flex-grow">
        <div className="flex justify-center mt-10">
          {isLoading && <p>Loading flights...</p>}
          {hasError && <p>There was an error loading your flights.</p>}
          {!isLoading && flightsAvailable ? (
            <MyFlightsCard />
          ) : (
            <p>No flights available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFlightsPage;
