import React from "react";
import loadingGif from "../../assets/Loading.gif";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50"
      role="alert"
      aria-live="polite"
    >
      <img
        src={loadingGif}
        alt={message}
        className="w-1/4 h-auto max-w-xs max-h-40"
      />
      <p className="mt-4 text-lg font-semibold">{message}</p>{" "}
    </div>
  );
};

export default Loading;
