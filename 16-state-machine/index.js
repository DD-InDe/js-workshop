/**
 * State Machine Implementation
 */
class StateMachine {
    /**
     * Create a state machine
     * @param {Object} config - Machine configuration
     * @param {string} config.initial - Initial state
     * @param {Object} config.states - State definitions
     * @param {Object} [config.context] - Initial context data
     */
    constructor(config) {
        if (!config) throw new Error()
        if (!config.initial) throw new Error()
        if (!config.states) throw new Error()
        if (!config.states[config.initial]) throw new Error();

        this.config = config;
        this.currentState = config.initial;
        this.context = config.context || {};

    }

    /**
     * Get current state
     * @returns {string}
     */
    get state() {
        return this.currentState;
    }

    /**
     * Attempt a state transition
     * @param {string} event - Event name
     * @param {Object} [payload] - Optional data for the transition
     * @returns {boolean} Whether transition was successful
     */
    transition(event, payload) {
        const currentStateConfig = this.config.states[this.currentState];
        const transition = currentStateConfig.on;

        if (!transition) return false;
        if (!transition[event]) return false;

        const rule = transition[event];

        let target, guard, action;

        if (typeof rule === 'string')
            target = rule;
        else {
            target = rule.target;
            guard = rule.guard;
            action = rule.action;
        }

        if (guard) {
            if (!guard(this.context, payload)) return false;
        }

        this.currentState = target;

        if (action) action(this.context, payload)

        return true;
    }

    /**
     * Check if a transition is possible
     * @param {string} event - Event name
     * @returns {boolean}
     */
    can(event) {
        const currentStateConfig = this.config.states[this.currentState];
        const transition = currentStateConfig.on;

        if (!transition) return false;
        if (!transition[event]) return false;

        const rule = transition[event];

        if (typeof rule === 'string') return true;

        const guard = rule.guard;

        if (guard) return true;

        return guard(this.context, {})
    }

    /**
     * Get available transitions from current state
     * @returns {string[]} Array of event names
     */
    getAvailableTransitions() {
        const currentContextState = this.config.states[this.currentState];

        if (!currentContextState.on) return []

        return Object.keys(currentContextState.on)
    }

    /**
     * Get the context data
     * @returns {Object}
     */
    getContext() {
        return this.context;
    }

    /**
     * Update context data
     * @param {Object|Function} updater - New context or updater function
     */
    updateContext(updater) {
        if (typeof updater === "function") {
            this.context = updater(this.context);
            return;
        }

        this.context = {...this.context, ...updater};
    }

    /**
     * Check if machine is in a final state (no transitions out)
     * @returns {boolean}
     */
    isFinal() {
        const currentSateConfig = this.config.states[this.currentState];
        return (!currentSateConfig.on || Object.keys(currentSateConfig.on).length === 0)
    }

    /**
     * Reset machine to initial state
     * @param {Object} [newContext] - Optional new context
     */
    reset(newContext) {
        this.context = newContext;
        this.currentState = this.config.initial;
    }
}

/**
 * Create a state machine factory
 *
 * @param {Object} config - Machine configuration
 * @returns {Function} Factory function that creates machines
 */
function createMachine(config) {
    return () => new StateMachine(config);
}

module.exports = {StateMachine, createMachine};
