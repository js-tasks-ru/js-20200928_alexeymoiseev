/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  let resObj = {};

  for (let prop of Object.entries(obj) ){
    if (fields.includes(prop[0], 0)) resObj[prop[0]] = prop[1];
  }

  return resObj;
};
