/**
 * Custom Bind Implementation
 *
 * Creates a new function that, when called, has its `this` keyword set to
 * the provided context, with a given sequence of arguments preceding any
 * provided when the new function is called.
 *
 * @param {Function} fn - The function to bind
 * @param {*} context - The value to bind as `this`
 * @param {...*} boundArgs - Arguments to prepend to the bound function
 * @returns {Function} A new bound function
 */
function customBind(fn, context, ...boundArgs) {
    if (typeof (fn) !== 'function') throw TypeError();

    const bound = function (...args) {
        const isNewCall = this instanceof bound;
        const finalThis = isNewCall ? this : context;

        return fn.apply(finalThis, [...boundArgs, ...args]);
    };

    if (fn.prototype != null) {
        bound.prototype = Object.create(fn.prototype);
    }

    return bound;
}

/**
 * BONUS: Prototype Method Implementation
 *
 * Add customBind to Function.prototype so it can be called as:
 * myFunction.customBind(context, ...args)
 */

// Uncomment and implement:
// Function.prototype.customBind = function(context, ...boundArgs) {
//   // Your implementation
// };

module.exports = {customBind};
