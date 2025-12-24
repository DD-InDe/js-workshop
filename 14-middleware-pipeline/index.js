const {run} = require("jest");

/**
 * Middleware Pipeline Implementation
 *
 * An Express/Koa-style middleware pipeline.
 */
class Pipeline {
    constructor() {
        this.middleware = [];
    }

    /**
     * Add middleware to the pipeline
     * @param {Function} fn - Middleware function (ctx, next) => {}
     * @returns {Pipeline} this (for chaining)
     */
    use(fn) {
        if (typeof fn !== 'function') return this;

        this.middleware.push(fn);
        return this;
    }

    /**
     * Execute the pipeline with given context
     * @param {Object} context - Context object passed to all middleware
     * @returns {Promise} Resolves when pipeline completes
     */
    run(context) {
        const pipeline = this;

        function dispatch(index) {
            const middleware = pipeline.middleware[index];

            if (!middleware) return Promise.resolve();

            return Promise.resolve(middleware(context, () => dispatch(index + 1)));
        }

        return dispatch(0);
    }

    /**
     * Compose middleware into a single function
     * @returns {Function} Composed middleware function
     */
    compose() {
        return (context) => this.run(context);
    }
}

/**
 * Compose function (standalone)
 *
 * Composes an array of middleware into a single function.
 *
 * @param {Function[]} middleware - Array of middleware functions
 * @returns {Function} Composed function (context) => Promise
 */
function compose(middleware) {
    if (!middleware.every(m => typeof m === 'function')) throw Error();

    return function (context) {
        function dispatch(index) {
            const middlewareElement = middleware[index];
            if (!middlewareElement) return Promise.resolve();

            const next = () => dispatch(index + 1);
            return Promise.resolve(middlewareElement(context, next));
        }

        return dispatch(0);
    };
}

/**
 * Create a middleware that runs conditionally
 *
 * @param {Function} condition - (ctx) => boolean
 * @param {Function} middleware - Middleware to run if condition is true
 * @returns {Function} Conditional middleware
 */
function when(condition, middleware) {
    return (ctx, next) => {
        if (condition(ctx))
            middleware(ctx, next);
        next.call();
    };
}

/**
 * Create a middleware that handles errors
 *
 * @param {Function} errorHandler - (error, ctx) => {}
 * @returns {Function} Error handling middleware
 */
function errorMiddleware(errorHandler) {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            errorHandler(e, ctx);
        }
    };
}

module.exports = {
    Pipeline,
    compose,
    when,
    errorMiddleware,
};
