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
    if (Array.isArray(value)) {
      result[key] = Array.from(value);
    } else if (typeof value === "object") {
      result[key] = deepCloneObject(value);
    } else {
      result[key] = value;
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
  ids: [1, 2, 4, 9],
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
testObject.ids.push(10);
console.log({ test_country: testObject.address.country });
console.log({ test2_country: testObject2.address.country });
console.log({ test1_ids: testObject2.ids });
console.log({ result_country: result?.address?.country });
console.log({ result_ids: result?.ids });
