/**
 * Async Queue Implementation
 *
 * A queue that processes async tasks with concurrency control.
 */
class AsyncQueue {
    /**
     * Create an async queue
     * @param {Object} options - Queue options
     * @param {number} [options.concurrency=1] - Maximum concurrent tasks
     * @param {boolean} [options.autoStart=true] - Start processing immediately
     */
    constructor(options = {}) {
        this.concurrency = options.concurrency || 1;
        this.autoStart = options.autoStart !== false;
        this.queue = [];
        this.running = 0;
        this.paused = false;
        this.emptyCallbacks = [];
    }

    /**
     * Add a task to the queue
     * @param {Function} task - Async function to execute
     * @param {Object} [options] - Task options
     * @param {number} [options.priority=0] - Task priority (higher = sooner)
     * @returns {Promise} Resolves when task completes
     */
    add(task, options = {}) {
        return new Promise((resolve, reject) => {
            const entry = {
                task: task, priority: options.priority || 1, resolve: resolve, reject: reject
            };

            this.queue.push(entry);
            this.queue.sort((a, b) => b.priority - a.priority);

            if (this.autoStart && !this.paused) this._process();
        });
    }

    /**
     * Start processing the queue
     */
    start() {
        this.paused = false;
        this._process();
    }

    /**
     * Pause the queue (running tasks will complete)
     */
    pause() {
        this.paused = true;
    }

    /**
     * Clear all pending tasks
     */
    clear() {
        this.queue = [];
    }

    /**
     * Register callback for when queue becomes empty
     * @param {Function} callback - Called when queue is empty
     */
    onEmpty(callback) {
        this.emptyCallbacks.push(callback);
        if (this.queue.length === 0 && this.running === 0) this._checkEmpty();
    }

    /**
     * Number of pending tasks
     * @returns {number}
     */
    get size() {
        return this.queue.length;
    }

    /**
     * Number of currently running tasks
     * @returns {number}
     */
    get pending() {
        return this.running;
    }

    /**
     * Whether queue is paused
     * @returns {boolean}
     */
    get isPaused() {
        return this.paused;
    }

    /**
     * Internal: Process next tasks from queue
     * @private
     */
    _process() {
        if (this.paused) return;

        while (
            this.running < this.concurrency &&
            this.queue.length > 0
            ) {
            const entry = this.queue.shift();
            this.running++;

            Promise.resolve()
                .then(() => entry.task())
                .then(result => {
                    entry.resolve(result);
                })
                .catch(err => {
                    entry.reject(err);
                })
                .finally(() => {
                    this.running--;
                    this._process();
                    this._checkEmpty();
                });
        }
    }

    /**
     * Internal: Check and trigger empty callbacks
     * @private
     */
    _checkEmpty() {
        if (this.queue.length === 0 && this.running === 0) {
            const callbacks = this.emptyCallbacks;
            this.emptyCallbacks = [];
            callbacks.forEach(item => item());
        }
    }
}

module.exports = {AsyncQueue};
