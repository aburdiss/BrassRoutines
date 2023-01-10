/**
 * @function debounce
 * @description Returns a function, that, as long as it continues to be
 * invoked, will not be triggered. The function will be called after it stops
 * being called for N milliseconds. If `immediate` is passed, trigger the
 * function on the leading edge, instead of the trailing.
 * Created 2/5/2022
 * @param {Function} func The function to debounce
 * @param {number} wait The amount of time to wait between trying to call the
 * function
 * @param {boolean} immediate Whether or not to call this function immidiately,
 * or wait until after the wait time
 * @returns {Function} A debounced version of the inputted func param
 *
 * @author Alexander Burdiss
 * @since 1/10/23
 * @version 1.0.1
 * @example
 * const debouncedFunc = debounce(func, 300, true);
 */
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
