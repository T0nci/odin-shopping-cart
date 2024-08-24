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

export { roundNumber };
