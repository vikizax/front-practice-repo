import Queue from "./Queue.js";

const inputField = document.getElementsByTagName("input")[0];
const valueField = document.getElementsByTagName("p")[0];
const debounceValueField = document.getElementsByTagName("p")[1];
const throttledValueField = document.getElementsByTagName("p")[2];
const throttledValueWRField = document.getElementsByTagName("p")[3];
/**
 *
 * @param {Function} cb
 * @param {number} delay
 */
function debounce(cb, delay = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, args), delay);
  };
}

/**
 *
 * @param {Function} cb
 * @param {number} delay
 */
function throttle(cb, delay = 1000) {
  let stopFlag = false;
  let pendingArgs = null;

  function timeoutHandler() {
    if (pendingArgs === null) {
      stopFlag = false;
    } else {
      cb.apply(this, pendingArgs);
      pendingArgs = null;
      setTimeout(timeoutHandler, delay);
    }
  }

  return function (...args) {
    if (stopFlag) {
      pendingArgs = args;
      return;
    }

    cb.apply(this, args);
    stopFlag = true;

    setTimeout(timeoutHandler, delay);
  };
}

/**
 *
 * @param {Function} cb
 * @param {number} delay
 */
function throttleWithRetention(cb, delay = 1000) {
  let stopFlag = false;
  const pendingArgs = new Queue();

  function timeoutHandler() {
    if (pendingArgs.length === 0) {
      stopFlag = false;
    } else {
      cb.apply(this, pendingArgs.dequeue());
      setTimeout(timeoutHandler, delay);
    }
  }

  return function (...args) {
    if (stopFlag) {
      pendingArgs.enqueue(args);
      return;
    }
    cb.apply(this, args);
    stopFlag = true;
    setTimeout(timeoutHandler, delay);
  };
}

/**
 *
 * @param {string} value
 */
const valToDebounceP = (value) => {
  debounceValueField.textContent = `Debounce value: ${value}`;
};

/**
 *
 * @param {number} x
 * @param {number} y
 */
const valueToThrottleP = (x, y) => {
  throttledValueField.textContent = `Throttled: ${x}, ${y}`;
};

/**
 *
 * @param {number} x
 * @param {number} y
 */
const valueToThrottleWRP = (x, y) => {
  throttledValueWRField.textContent = `Throttled with retention [keeps updating in throttle]: ${x}, ${y}`;
};

const debouncedValFn = debounce(valToDebounceP, 600);
const throttledValFn = throttle(valueToThrottleP, 3000);
const throttledWithRetentionValFn = throttleWithRetention(
  valueToThrottleWRP,
  100
);

inputField.addEventListener("keyup", (e) => {
  valueField.textContent = `Value: ${inputField.value}`;
  debouncedValFn(inputField.value);
});

window.addEventListener("mousemove", (e) => {
  throttledValFn(e.clientX, e.clientY);
  throttledWithRetentionValFn(e.clientX, e.clientY);
});
