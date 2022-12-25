/**
 * Deep clone object
 */

/**
 * for eg:
 * obj1: {
 *    name: "abc",
 *    address: {
 *        state: "state",
 *        zipcode: 123123,
 *        country: "country"
 *    },
 *    contactDetails: {
 *       phone: {
 *          personal: 1231231231,
 *          work: 9879879870
 *      }
 *    }
 * }
 *
 * result should be a new object(new reference) with all the keys of obj1
 */

/**
 * @param {Object} target
 * @returns {Object}
 */
function deepCloneObject(target) {
  const result = {};

  Object.keys(target).forEach((key) => {
    const value = target[key];
    if (Array.isArray(value) || typeof value !== "object") {
      result[key] = value;
    } else {
      result[key] = deepCloneObject(value);
    }
  });
  return result;
}

const testObject = {
  name: "abc",
  address: {
    state: "state",
    zipcode: 123123,
    country: "country",
  },
  contactDetails: {
    phone: {
      personal: 1231231231,
      work: 9879879870,
    },
  },
};
const testObject2 = testObject;

const result = deepCloneObject(testObject);

testObject.address.country = "india";
console.log({ test_country: testObject.address.country });
console.log({ test2_country: testObject2.address.country });
console.log({ result_country: result.address?.country });
