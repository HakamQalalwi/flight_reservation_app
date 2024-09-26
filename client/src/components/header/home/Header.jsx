import React from "react";
import { Link } from "react-router-dom";
import FlightLogo from "../../../assets/flightlogo.png";
import DealsLogo from "../../../assets/deals.svg";
import DiscoverLogo from "../../../assets/discover.svg";
import AvatarPhoto from "../../../assets/Avatar.png";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

const IconLink = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center" aria-label={label}>
    <img src={icon} alt={`${label} Icon`} className="w-4 md:w-4" />
    <span className="text-xs md:text-sm font-light ml-2">{label}</span>
  </Link>
);

const Header = () => {
  return (
    <div className="bg-gray-100">
      {" "}
      {/* Background color */}
      <header className="py-4 px-6 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" aria-label="Home">
            <img src={FlightLogo} alt="Flight Logo" className="w-12 md:w-15" />
            <span className="text-xl md:text-xl font-bold ml-3">
              PLANE SCAPE
            </span>
          </Link>
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-4">
          <IconLink to="/" icon={DealsLogo} label="Deals" />
          <IconLink to="/" icon={DiscoverLogo} label="Discover" />
          <Stack direction="row" spacing={2}>
            <Link
              to="/"
              className="flex items-center"
              aria-label="User Profile"
            >
              <Avatar
                src={AvatarPhoto}
                alt="Joane Smith"
                className="w-4 md:w-4"
              />
              <span className="text-xs md:text-sm font-light ml-2">
                Joane Smith
              </span>
            </Link>
          </Stack>
        </div>
      </header>
    </div>
  );
};

export default Header;
