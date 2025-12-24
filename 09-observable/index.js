/**
 * Observable Implementation
 *
 * A simple Observable for reactive data streams.
 */
class Observable {
    /**
     * Create an Observable
     * @param {Function} subscribeFn - Function called with subscriber on subscribe
     */
    constructor(subscribeFn) {
        this._subscribeFn = subscribeFn;
    }

    /**
     * Subscribe to the Observable
     * @param {Object|Function} observer - Observer object or next callback
     * @returns {Object} Subscription with unsubscribe method
     */
    subscribe(observer) {
        let completed = false;
        let errored = false;
        let cleanup;

        if (typeof observer === 'function') {
            observer = {next: observer};
        }

        const subscriber = {
            next: (value) => {
                if (completed || errored) return;

                observer.next && observer.next(value);
            },

            error: (err) => {
                if (completed || errored) return;
                errored = true;

                observer.error && observer.error(err);
                cleanup && cleanup();
            },

            complete: () => {
                if (completed || errored) return;
                completed = true;

                observer.complete && observer.complete();
                cleanup && cleanup();
            }
        };
        cleanup = this._subscribeFn(subscriber);

        return {
            unsubscribe() {
                if (completed || errored) return;

                completed = errored = true;
                cleanup && cleanup();
            }
        };
    }

    /**
     * Transform each emitted value
     * @param {Function} fn - Transform function
     * @returns {Observable} New Observable with transformed values
     */
    map(fn) {
        return new Observable(subscriber => {
            const subscription = this.subscribe({
                next: (value) => subscriber.next(fn(value)),
                error: (err) => subscriber.error(err),
                complete: () => subscriber.complete()
            });

            return () => subscription.unsubscribe();
        });
    }

    /**
     * Filter emitted values
     * @param {Function} predicate - Filter function
     * @returns {Observable} New Observable with filtered values
     */
    filter(predicate) {
        return new Observable(subscriber => {
            const subscription = this.subscribe({
                next: (value) => {
                    if (predicate(value))
                        subscriber.next(value);
                },
                error: (err) => subscriber.error(err),
                complete: () => subscriber.complete()
            });

            return () => subscription.unsubscribe();
        });
    }

    /**
     * Take only first n values
     * @param {number} count - Number of values to take
     * @returns {Observable} New Observable limited to count values
     */
    take(count) {
        let step = 1;

        return new Observable(subscriber => {
            const subscription = this.subscribe({
                next: (value) => {
                    if (step > count) {
                        subscriber.complete();
                        return;
                    }

                    subscriber.next(value);
                    step++;
                },
                error: (err) => subscriber.error(err),
                complete: () => subscriber.complete()
            });

            return () => subscription.unsubscribe();
        });
    }

    /**
     * Skip first n values
     * @param {number} count - Number of values to skip
     * @returns {Observable} New Observable that skips first count values
     */
    skip(count) {
        let step = 1;

        return new Observable(subscriber => {
            const subscription = this.subscribe({
                next: (value) => {
                    if (step <= count) {
                        step++;
                        return;
                    }

                    subscriber.next(value);
                },
                error: (err) => subscriber.error(err),
                complete: () => subscriber.complete()
            });

            return () => subscription.unsubscribe();
        });
    }

    /**
     * Create Observable from array
     * @param {Array} array - Array of values
     * @returns {Observable} Observable that emits array values
     */
    static from(array) {
        return new Observable((subscriber) => {
            array.forEach(item => {
                subscriber.next(item);
            });
            subscriber.complete();
        });
    }

    /**
     * Create Observable from single value
     * @param {*} value - Value to emit
     * @returns {Observable} Observable that emits single value
     */
    static of(...values) {
        return Observable.from(values);
    }
}

module.exports = {Observable};
