/**
 * Find first exit true
 * for eg:
 * paths: {
 *    top: {
 *      left: {
 *          right: {
 *              exit: false
 *          }
 *      }
 *    },
 *    right: {
 *      top: {
 *          right: {
 *              exit: null
 *          }
 *      }
 *    },
 *   bottom: {
 *      top: {
 *          right: {
 *              exit: true
 *          }
 *      }
 *    },
 *   left: {
 *      top: {
 *          left: {
 *              exit: true
 *          }
 *      }
 *    }
 * }
 *
 * result: "bottom.top.right"
 */

function flattenObj(paths) {
  if (paths === null || paths === undefined) return paths;
  let result = {};
  for (const parentKey in paths) {
    const value = paths[parentKey];
    // if (Array.isArray(value)) continue;
    if (typeof value === "object") {
      const childObj = flattenObj(value);
      if (childObj === null || childObj === undefined) {
        result[`${parentKey}`] = childObj;
        continue;
      }

      for (childKey in childObj) {
        const currentKey = `${parentKey}.${childKey}`;
        result[`${currentKey}`] = childObj[childKey];
      }
    } else {
      result[parentKey] = value;
    }
  }

  return result;
}
/**
 *
 * @param {Object} paths
 * @returns {string}
 */
function findFirstExit(paths) {
  const result = flattenObj(paths);
  for (const key in result) {
    if (result[key] === true) {
      return key;
    }
  }
}

const testCase = {
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
const key = findFirstExit(testCase);
console.log(key);
