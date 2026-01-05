// utils/calculateCost.js
export const calculateCost = ({ type, weight, senderCenter, receiverCenter }) => {
  let base = type === "document" ? 60 : 100;

  if (type === "non-document" && weight) {
    base += Math.ceil(weight) * 20;
  }

  // Different service center surcharge
  if (senderCenter !== receiverCenter) {
    base += 40;
  }

  return base;
};
