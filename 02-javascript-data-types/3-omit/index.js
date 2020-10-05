/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let resObj = {};

  for (let prop of Object.entries(obj) ){
    if (!fields.includes(prop[0], 0)) resObj[prop[0]] = prop[1];
  }

  return resObj;
};
