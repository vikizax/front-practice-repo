/**
 * Object flattening
 */

/**
 * for eg:
 * obj = {
 *    address: {
 *      country: "country",
 *      state: "state",
 *      zipcode: 123123
 *    }
 * }
 *
 * result: {
 *  "address.country" : "country",
 *  "address.state" : "state",
 *  "address.zipcode": 123123
 * }
 */

/**
 *
 * @param {Object} target
 * @param {String} initialKey
 * @returns {Object}
 */
function objectFlattening(target, initialKey = "") {
  let result = {};

  Object.keys(target).forEach((parent_key) => {
    const value = target[parent_key];
    if (typeof value === "object" && !Array.isArray(value)) {
      const obj = objectFlattening(value, parent_key);
      Object.keys(obj).forEach((key) => {
        const currentKey =
          initialKey.length > 0
            ? `${initialKey}.${key}`
            : `${parent_key}.${key}`;
        result[`${currentKey}`] = obj[key];
      });
    } else {
      result[parent_key] = value;
    }
  });

  return result;
}

const testObject = {
  address: {
    country: "country",
    state: "state",
    zipcode: 123123,
    test: {
      a: 1,
      b: 3,
      c: [1, 2, 2, 2],
      d: {
        e: 1,
        f: {
          g: {
            h: 1,
            i: {
              j: 10,
            },
          },
        },
      },
    },
  },
  testKey1: 1,
  testKey2: 10,
};

console.log(objectFlattening(testObject));
