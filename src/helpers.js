import { useLocation } from "react-router-dom";
import { useState } from "react";

const useCustomLocationState = () => {
  const { state } = useLocation();

  let initialArray = [];
  if (state && Array.isArray(state)) {
    initialArray = [...state];
  }

  const [items, setItems] = useState(initialArray);

  return [items, setItems];
};

const roundNumber = (number, toDecimalPlaces) => {
  if (
    isNaN(number) ||
    isNaN(toDecimalPlaces) ||
    typeof number !== "number" ||
    typeof toDecimalPlaces !== "number" ||
    toDecimalPlaces < 0
  )
    return null;

  return Math.round(number * 10 ** toDecimalPlaces) / 10 ** toDecimalPlaces;
};

export { useCustomLocationState, roundNumber };
