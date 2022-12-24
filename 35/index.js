/**
 * Array flatten
 * for eg:
 * arr = [1,2,3,[4,[[5,[6,7]]]], 10]
 * result = [1,2,3,4,5,6,7,10]
 */

/**
 *
 * @param {Array} arr
 * @returns {Array}
 */
function arrayFlattener(arr) {
  let result = [];
  arr.forEach((elem) => {
    if (Array.isArray(elem)) {
      result = result.concat(arrayFlattener(elem));
    } else {
      result.push(elem);
    }
  });
  return result;
}

const testArray = [
  1,
  2,
  3,
  [4, [[5, [6, 7]]]],
  10,
  [[[[[[11], 12], 13], 19], 20]],
];

console.log(arrayFlattener(testArray));

/**
 * Array flatten with depth control
 * for eg:
 * arr = [1,2,3,[4,[[5,[6,7]]]], 10]
 * depth = 2
 * result = [1,2,3,4,[5,[6,7]], 10]
 */

/**
 *
 * @param {Array} arr
 * @param {Number} depth
 */
function arrayFlattenerWithDepth(arr, depth) {
  if (depth <= 1) return arr;
  let result = [];

  arr.forEach((elem) => {
    if (Array.isArray(elem) && depth > 0) {
      result = result.concat(arrayFlattenerWithDepth(elem, depth - 1));
    } else {
      result.push(elem);
    }
  });

  return result;
}

const result = arrayFlattenerWithDepth(testArray, 5);

console.log(result);
