/**
 * LRU Cache Implementation
 *
 * A cache that evicts the least recently used items when at capacity.
 */
class LRUCache {
    /**
     * Create an LRU Cache
     * @param {number} capacity - Maximum number of items
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    /**
     * Get value by key
     * @param {*} key - Cache key
     * @returns {*} Value or undefined if not found
     */
    get(key) {
        if (!this.cache.has(key)) return undefined;

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    /**
     * Set key-value pair
     * @param {*} key - Cache key
     * @param {*} value - Value to store
     */
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }

    /**
     * Check if key exists (without updating recency)
     * @param {*} key - Cache key
     * @returns {boolean}
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * Delete a key
     * @param {*} key - Cache key
     * @returns {boolean} true if key existed
     */
    delete(key) {
        const itemExist = this.has(key);
        if (itemExist)
            this.cache.delete(key);
        return itemExist;
    }

    /**
     * Clear all items
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Current number of items
     * @returns {number}
     */
    get size() {
        return this.cache.size;
    }

    /**
     * Get all keys in order (least recent first)
     * @returns {Array} Array of keys
     */
    keys() {
        return Array.of(...this.cache.keys());
    }

    /**
     * Get all values in order (least recent first)
     * @returns {Array} Array of values
     */
    values() {
        return Array.of(...this.cache.values());
    }
}

module.exports = {LRUCache};
