export function toTwoDecPlaces(num: number): number {
  const fixedPlaces = num.toFixed(2);
  const retValue = parseFloat(fixedPlaces);
  return retValue;
}