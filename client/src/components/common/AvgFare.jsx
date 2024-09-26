import React from "react";
import PropTypes from "prop-types";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const { Text } = Typography;

const AvgFare = ({ fare = 350 }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <InfoCircleOutlined style={{ color: "#74C0FC", fontSize: "24px" }} />
        <Text className="text-gray-800">Avg Fare:</Text>
      </div>
      <Text strong>${fare}</Text>
    </div>
  );
};

// Prop type validation
AvgFare.propTypes = {
  fare: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default AvgFare;
