/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortArr = arr.slice();

  let direction;
  switch (param) {
    case "asc" :
      direction = 1;
      break;
    case "desc" :
      direction = -1;
      break;
    default  :
      console.warn(`Недопустимый вариант сортировки: ${param}. Вариантов сортировки только два: asc и desc`);
      return arr;
  }

  sortArr.sort((a, b) => {
        return direction * a.localeCompare(b, ["ru", "en"], {caseFirst: 'upper'})
    }
  );

  return sortArr;

}
