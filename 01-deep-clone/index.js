/**
 * Deep Clone Implementation
 *
 * Create a deep copy of any JavaScript value, including nested objects,
 * arrays, and special types like Date, RegExp, Map, and Set.
 *
 * @param {*} value - The value to clone
 * @param {WeakMap} [visited] - WeakMap to track circular references (used internally)
 * @returns {*} A deep clone of the input value
 */
function deepClone(value, visited = new WeakMap()) {
    if (typeof (value) !== 'object' || value == null) return value;

    if (visited.has(value)) return visited.get(value);

    switch (Object.prototype.toString.call(value)) {
        case '[object Date]':
            return new Date(value);
        case '[object RegExp]':
            return new RegExp(value);
        case '[object Map]':
            const mapResult = new Map();
            visited.set(value, mapResult);

            for (const [k, v] of value) {
                mapResult.set(deepClone(k, visited), deepClone(v, visited));
            }
            return mapResult;
        case '[object Set]':
            const setResult = new Set();
            visited.set(value, setResult);

            for (const v of value) {
                setResult.add(deepClone(v,visited));
            }
            return setResult;
        case '[object Array]':
            const arrayResult = [];
            visited.set(value, arrayResult);

            for (const i of value) {
                arrayResult.push(deepClone(i,visited));
            }
            return arrayResult;
        default:
            const objectResult = {};
            visited.set(value, objectResult);

            for (const p in value) {
                objectResult[p] = deepClone(value[p], visited);
            }
            return objectResult;
    }
}

module.exports = {deepClone};
