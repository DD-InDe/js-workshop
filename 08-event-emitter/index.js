/**
 * Event Emitter Implementation
 *
 * A pub/sub event system similar to Node.js EventEmitter.
 */
class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    /**
     * Register a listener for an event
     * @param {string} event - Event name
     * @param {Function} listener - Callback function
     * @returns {EventEmitter} this (for chaining)
     */
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);

        const listeners = this.events.get(event);

        listeners.push(listener);

        return this;
    }

    /**
     * Remove a specific listener for an event
     * @param {string} event - Event name
     * @param {Function} listener - Callback to remove
     * @returns {EventEmitter} this (for chaining)
     */
    off(event, listener) {
        const listeners = this.events.get(event);

        if (listeners == null) return this;

        const index = listeners.findIndex(l => l === listener || l.original === listener);

        if (index !== -1)
            listeners.splice(index, 1);

        return this;
    }

    /**
     * Emit an event, calling all registered listeners
     * @param {string} event - Event name
     * @param {...*} args - Arguments to pass to listeners
     * @returns {boolean} true if event had listeners
     */
    emit(event, ...args) {
        if (!this.events.has(event)) return false;

        const listeners = this.events.get(event).slice();

        if (!listeners) return false;

        listeners.forEach(listener => listener(...args));

        return true;
    }

    /**
     * Register a one-time listener
     * @param {string} event - Event name
     * @param {Function} listener - Callback function
     * @returns {EventEmitter} this (for chaining)
     */
    once(event, listener) {
        const self = this;

        function wrapper(...args) {
            self.off(event, wrapper);
            listener(...args);
        }

        wrapper.original = listener;
        this.on(event, wrapper);

        return this;
    }

    /**
     * Remove all listeners for an event (or all events)
     * @param {string} [event] - Event name (optional)
     * @returns {EventEmitter} this (for chaining)
     */
    removeAllListeners(event) {
        if (!this.events.has(event)) {
            this.events = new Map();
            return this;
        }

        this.events.set(event, []);
        return this;
    }

    /**
     * Get array of listeners for an event
     * @param {string} event - Event name
     * @returns {Function[]} Array of listener functions
     */
    listeners(event) {
        return Array.of(...this.events.get(event) ?? []);
    }

    /**
     * Get number of listeners for an event
     * @param {string} event - Event name
     * @returns {number} Listener count
     */
    listenerCount(event) {
        return this.events.get(event)?.length || 0;
    }
}

module.exports = {EventEmitter};
