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

export { useCustomLocationState };
