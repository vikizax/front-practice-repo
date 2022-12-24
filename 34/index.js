/**
 * Deep Merge Two Objects
 *
 * for eg:
 * obj1 = {
 *  first_name: 'jj',
 *  last_name: 'll',
 *  ownedCardsId: [1,3,9],
 *  address: {
 *      state: "Assam",
 *      country: "India"
 *    }
 * }
 *
 * obj2 = {
 *  address: {
 *      zipcode: 780001,
 *      locality: {
 *          area: "P1",
 *          addr_mark: "Kids Park"
 *      }
 *    },
 *  ownedCardsId: [1,9,11,18]
 * }
 *
 * result: {
 *  first_name: 'jj',
 *  last_name: 'll',
 *  ownedCardsId: [1,3,9,11,18],
 *  address: {
 *      state: 'Assam',
 *      country: 'India',
 *      zipcode: 780001,
 *      locality: {
 *          area: "P1",
 *           addr_mark: "Kids Park"
 *       }
 *    }
 * }
 */

/**
 *
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
function deepMerge(target, source) {
  Object.keys(source).forEach((key) => {
    const value = target[key];
    // console.log({ value });
    if (Array.isArray(value)) {
      target[key] = Array.from(new Set(value.concat(source[key]))).sort(
        (a, b) => (a > b ? a : b)
      );
    } else if (typeof value === "object") {
      target[key] = deepMerge(Object.assign({}, target[key]), source[key]);
    } else {
      target[key] = source[key];
    }
  });

  return target;
}

const obj1 = {
  first_name: "jj",
  last_name: "ll",
  ownedCardsId: [1, 3, 9],
  address: {
    state: "Assam",
    country: "India",
    locality: {
      area: "P1",
      addr_mark: "Kids Park",
      neighbour_hn: 12,
    },
  },
};

const obj2 = {
  address: {
    zipcode: 780001,
    locality: {
      area: "P1",
      addr_mark: "Kids Park",
    },
  },
  ownedCardsId: [1, 9, 11, 18],
};

console.log(deepMerge(obj1, obj2));
