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
 * @returns {Object}
 */
function objectFlattening(target) {
  if (target === null || target === undefined) return target;
  let result = {};
  Object.keys(target).forEach((parent_key) => {
    const value = target[parent_key];
    if (typeof value === "object" && !Array.isArray(value)) {
      const obj = objectFlattening(value, parent_key);
      if (obj === null || obj === undefined) {
        const currentKey = `${parent_key}`;
        result[`${currentKey}`] = obj;
      } else
        Object.keys(obj).forEach((key) => {
          const currentKey = `${parent_key + "." + key}`;
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
  testKey3: {
    a: {
      b: {
        c: 10,
      },
    },
  },
};

const testObject_2 = {
  bottom: {
    right: {
      left: {
        exit: null,
      },
    },
  },
  right: {
    top: {
      exit: null,
    },
  },
  top: {
    bottom: {
      left: {
        left: {
          right: {
            exit: true,
          },
        },
      },
    },
  },
  left: {
    right: {
      exit: true,
    },
  },
};

console.log(objectFlattening(testObject));
console.log(objectFlattening(testObject_2));
