/**
 * This function will generate a list of items based on the provided length and map function.
 *
 * @param {number} listLength - length of the list to be generated.
 * @param {mapCallback} function - map function.
 * @returns {Array} Array with length that equal to `listLength` and with objects that were return from mapCallback.
 */

const generateList = (listLength, mapCallback) => Array(listLength).fill(null).map(mapCallback);

export default generateList;