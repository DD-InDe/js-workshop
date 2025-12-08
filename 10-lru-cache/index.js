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
    // TODO: Initialize the cache

    // Step 1: Store capacity
    // this.capacity = capacity;

    // Step 2: Create storage (Map recommended)
    // this.cache = new Map();
  }

  /**
   * Get value by key
   * @param {*} key - Cache key
   * @returns {*} Value or undefined if not found
   */
  get(key) {
    // TODO: Implement get

    // Step 1: Check if key exists

    // Step 2: If exists:
    //   - Get the value
    //   - Move to end (most recent)
    //   - Return value

    // Step 3: If not exists, return undefined

    return undefined;
  }

  /**
   * Set key-value pair
   * @param {*} key - Cache key
   * @param {*} value - Value to store
   */
  put(key, value) {
    // TODO: Implement put

    // Step 1: If key already exists, delete it first (to update position)

    // Step 2: If at capacity, evict least recently used (first item)

    // Step 3: Add the new key-value pair (goes to end = most recent)
  }

  /**
   * Check if key exists (without updating recency)
   * @param {*} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    // TODO: Implement has

    return false;
  }

  /**
   * Delete a key
   * @param {*} key - Cache key
   * @returns {boolean} true if key existed
   */
  delete(key) {
    // TODO: Implement delete

    return false;
  }

  /**
   * Clear all items
   */
  clear() {
    // TODO: Implement clear
  }

  /**
   * Current number of items
   * @returns {number}
   */
  get size() {
    // TODO: Return current size

    return 0;
  }

  /**
   * Get all keys in order (least recent first)
   * @returns {Array} Array of keys
   */
  keys() {
    // TODO: Return array of keys

    return [];
  }

  /**
   * Get all values in order (least recent first)
   * @returns {Array} Array of values
   */
  values() {
    // TODO: Return array of values

    return [];
  }
}

module.exports = { LRUCache };
