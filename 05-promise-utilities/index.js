/**
 * Promise.all Implementation
 *
 * Returns a promise that resolves when all promises resolve,
 * or rejects when any promise rejects.
 *
 * @param {Iterable} promises - An iterable of promises (or values)
 * @returns {Promise} A promise that resolves to an array of results
 */
function promiseAll(promises) {
    const promiseArray = Array.from(promises);

    if (promiseArray.length === 0) return Promise.resolve([]);

    return new Promise((resolve, reject) => {
            const results = new Array(promiseArray.length);
            let completed = 0;

            for (let i = 0; i < promiseArray.length; i++) {
                Promise.resolve(promiseArray[i])
                    .then((value) => {
                        results[i] = value;
                        completed++;

                        if (completed === promiseArray.length) {
                            resolve(results);
                        }
                    }).catch(err => {
                    reject(err);
                });
            }
        }
    );
}

/**
 * Promise.race Implementation
 *
 * Returns a promise that settles with the first promise to settle.
 *
 * @param {Iterable} promises - An iterable of promises (or values)
 * @returns {Promise} A promise that settles with the first result
 */
function promiseRace(promises) {
    const promiseArray = Array.from(promises);

    if (promiseArray.length === 0) return Promise.race([]);

    return new Promise((resolve, reject) => {
        promiseArray.forEach(item => {
            Promise.resolve(item).then((value) => {
                resolve(value);
            }).catch((err) => {
                reject(err);
            });
        });
    });
}

/**
 * Promise.allSettled Implementation
 *
 * Returns a promise that resolves when all promises have settled.
 * Never rejects.
 *
 * @param {Iterable} promises - An iterable of promises (or values)
 * @returns {Promise} A promise that resolves to an array of settlement objects
 */
function promiseAllSettled(promises) {
    const promiseArray = Array.from(promises);

    if (promiseArray.length === 0) return Promise.allSettled([]);

    return new Promise((resolve) => {
        const result = new Array(promiseArray.length);
        let complete = 0;

        promiseArray.forEach((item, index) => {
            Promise.resolve(item)
                .then(value => {
                    result[index] = ({status: 'fulfilled', value: value});
                    complete++;
                    if (complete === promiseArray.length) resolve(result);
                })
                .catch(err => {
                    result[index] = ({status: 'rejected', reason: err});
                    complete++;
                    if (complete === promiseArray.length) resolve(result);
                });
        });

    });
}

/**
 * Promise.any Implementation
 *
 * Returns a promise that resolves with the first fulfilled promise,
 * or rejects with an AggregateError if all reject.
 *
 * @param {Iterable} promises - An iterable of promises (or values)
 * @returns {Promise} A promise that resolves with the first fulfilled value
 */
function promiseAny(promises) {
    const promiseArray = Array.from(promises);

    if (promiseArray.length === 0) return Promise.reject(new AggregateError([]));

    return new Promise((resolve, reject) => {
        const errors = [];
        let rejectedCount = 0;

        promiseArray.forEach(item => {
            Promise.resolve(item).then(value => {
                resolve(value);
            }).catch(err => {
                errors[rejectedCount] = err;
                rejectedCount++;

                if (rejectedCount === promiseArray.length) reject(new AggregateError(errors, 'All promises were rejected'));
            });
        });
    });
}

module.exports = {promiseAll, promiseRace, promiseAllSettled, promiseAny};
