/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0) return "";
  if (size === undefined) return string;

  let resString = "";
  let sumSymbol = "";
  let prevSymbol = "";


  for (let curSymbol of string) {
    if (curSymbol === prevSymbol){
      if (sumSymbol.length < size) {
        sumSymbol = sumSymbol + curSymbol;
      }
    } else {
      resString = resString + sumSymbol;
      sumSymbol = curSymbol;
    }
    prevSymbol = curSymbol;
  }

  resString = resString + sumSymbol;

  return resString;
}
