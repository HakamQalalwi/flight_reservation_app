export const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;

  hours = hours % 12 || 12;

  const formattedMinutes = String(minutes).padStart(2, "0");

  const period = isPM ? "PM" : "AM";

  return `${hours}:${formattedMinutes} ${period}`;
};
