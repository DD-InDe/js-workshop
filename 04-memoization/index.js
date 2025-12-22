/**
 * Memoization Implementation
 *
 * Creates a memoized version of a function that caches results based on arguments.
 *
 * @param {Function} fn - The function to memoize
 * @param {Object} [options] - Optional configuration
 * @param {number} [options.maxSize] - Maximum number of cached entries
 * @param {number} [options.ttl] - Time-to-live for cache entries in milliseconds
 * @param {Function} [options.keyGenerator] - Custom function to generate cache keys
 * @returns {Function} Memoized function with cache control methods
 */
function memoize(fn, options = {}) {
    const {maxSize = 100, ttl = 5000, keyGenerator = (args) => JSON.stringify(args)} = options;
    const cache = new Map();

    const memoized = function (...args) {
        const key = keyGenerator(args);

        if (cache.has(key)) {
            const cachedValue = cache.get(key);

            if (Date.now() - cachedValue.timestamp < ttl) {
                return cachedValue.value;
            }
            cache.delete(key);
        }

        const value = fn.apply(this, args);
        cache.set(key, {value: value, timestamp: Date.now()});

        if (cache.size > maxSize) {
            cache.delete(cache.keys().next().value);
        }

        return value;
    };
    memoized.cache = {
        clear: () => cache.clear(),
        delete: (key) => cache.delete(key),
        has: (key) => cache.has(key),
        get size() {
            return cache.size;
        },
    };
    return memoized;
}

module.exports = {memoize};
