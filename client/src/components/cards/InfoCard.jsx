import PropTypes from "prop-types";
import Carr from "../../assets/Car.png";
import Hotel from "../../assets/Hotel.png";
import Travel from "../../assets/Travel.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarRear,
  faHotel,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";

// CustomCard component for rendering each card
const CustomCard = ({ src, alt, icon, iconText }) => {
  return (
    <div className="relative overflow-hidden rounded-lg w-[120px] h-[180px] md:w-[250px] md:h-[200px] shadow-lg transition-transform transform hover:scale-105 duration-300">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
      />
      {icon && (
        <div className="absolute bottom-4 left-4 text-white flex flex-col items-start">
          <FontAwesomeIcon icon={icon} bounce className="text-2xl mb-1" />
          <span className="text-base font-semibold">{iconText}</span>
        </div>
      )}
    </div>
  );
};

// Prop validation for CustomCard
CustomCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  iconText: PropTypes.string.isRequired,
};

// InfoCards component rendering multiple CustomCards
const InfoCards = () => {
  return (
    <div className="flex flex-row md:flex-col gap-6 bg-gray-100 p-4">
      <CustomCard
        src={Carr}
        alt="Car rentals for your trip"
        icon={faCarRear}
        iconText="CAR RENTALS"
      />
      <CustomCard
        src={Hotel}
        alt="Find the best hotels"
        icon={faHotel}
        iconText="HOTELS"
      />
      <CustomCard
        src={Travel}
        alt="Book travel packages"
        icon={faUmbrellaBeach}
        iconText="TRAVEL PACKAGES"
      />
    </div>
  );
};

export default InfoCards;
