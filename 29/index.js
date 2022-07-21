/**
 * Flatten Array Custom
 */

/**
 * @description - using recursive approch
 * @param {Array} arr
 * @param {number} depth
 * @returns {Array}
 */
function customFlat(arr, depth = 1, initial = []) {
  if (depth === 0) return arr;
  for (let iter = 0; iter < arr.length; iter++) {
    if (Array.isArray(arr[iter])) {
      const recursiveResult = customFlat(arr[iter], depth - 1);
      initial = initial.concat(recursiveResult);
    } else {
      initial.push(arr[iter]);
    }
  }
  return initial;
}
// const nestedArr = [1, 2, 3, [4, 5, [6, 7]], 8];
// const flattenArr = customFlat(nestedArr, Infinity, []);
// console.log(nestedArr);
// console.log(flattenArr);

/**
 * @description - using reduce
 * @param {Array} arr
 * @param {number} depth
 * @returns {Array}
 */
function customFlat(arr, depth = 1, initial = []) {
  return depth > 0
    ? arr.reduce(
        (prev, val) =>
          prev.concat(Array.isArray(val) ? customFlat(val, depth - 1) : val),
        initial
      )
    : arr.slice();
}

const nestedArr = [1, 2, 3, [4, 5, [6, 7]], 8];
const flattenArr = customFlat(nestedArr, Infinity, [9]);
console.log(nestedArr);
console.log(flattenArr);
