/**
 * Strategy Pattern Implementation
 */

// ============================================
// SORTING STRATEGIES
// ============================================

/**
 * Sort Context
 *
 * Delegates sorting to a strategy.
 */
class SortContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    sort(array) {
        const arrayCopy = [...array];
        return this.strategy.sort(arrayCopy);
    }
}

/**
 * Bubble Sort Strategy
 */
class BubbleSort {
    sort(array) {
        for (let i = 0; i < array.length; i++) {
            let completed = 0;

            for (let j = 0; j < array.length - 1; j++) {
                if (array[j] > array[j + 1]) {
                    const temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                    completed++;
                }
            }

            if (completed === 0) break;
        }

        return array;
    }
}

/**
 * Quick Sort Strategy
 */
class QuickSort {
    sort(array) {
        if (array.length <= 1) return array;

        const pivot = array[0];
        const less = [];
        const greater = [];

        for (let i = 1; i < array.length; i++) {
            const element = array[i];
            if (pivot > element) less.push(element)
            else greater.push(element)
        }

        return [...this.sort(less), pivot, ...this.sort(greater)]
    }
}

/**
 * Merge Sort Strategy
 */
class MergeSort {
    sort(array) {
        if (array.length <= 1) return array;

        const mid = Math.floor(array.length / 2);
        const left = array.slice(0, mid);
        const right = array.slice(mid);

        const sortedLeft = this.sort(left);
        const sortedRight = this.sort(right);

        return merge(sortedLeft, sortedRight);

        function merge(left, right) {
            const result = [];

            while (left.length !== 0 && right.length !== 0) {
                if (left[0] <= right[0]) {
                    result.push(left[0]);
                    left.splice(0, 1);
                } else {
                    result.push(right[0]);
                    right.splice(0, 1);
                }
            }

            return result.concat(left, right);
        }
    }
}

// ============================================
// PRICING STRATEGIES
// ============================================

/**
 * Pricing Context
 *
 * Calculates prices using a strategy.
 */
class PricingContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    calculateTotal(items) {
        return this.strategy.calculate(items);
    }
}

/**
 * Regular Pricing (no discount)
 */
class RegularPricing {
    calculate(items) {
        return items.reduce((a, item) => a + item.price, 0);
    }
}

/**
 * Percentage Discount
 */
class PercentageDiscount {
    constructor(percentage) {
        this.percentage = percentage;
    }

    calculate(items) {
        return items.reduce((a, item) => a + item.price, 0) * (1 - this.percentage / 100);
    }
}

/**
 * Fixed Discount
 */
class FixedDiscount {
    constructor(amount) {
        this.amount = amount;
    }

    calculate(items) {
        const total = items.reduce((a, item) => a + item.price, 0);
        return Math.max(total - this.amount, 0);
    }
}

/**
 * Buy One Get One Free
 */
class BuyOneGetOneFree {
    calculate(items) {
        const newItems = [...items].sort((a, b) => b.price - a.price);
        return newItems.reduce((acc, item, index) => {
            if ((index + 1) % 2 !== 0) {
                return acc + item.price
            }

            return acc;
        }, 0)
    }
}

/**
 * Tiered Discount
 *
 * Different discount based on total.
 */
class TieredDiscount {
    constructor(tiers) {
        this.tiers = tiers;
    }

    calculate(items) {
        const subtotal = items.reduce((acc, item) => acc + item.price, 0);
        let tier = this.tiers.findLast(t => t.threshold <= subtotal);

        if (tier == null) return subtotal;

        return subtotal * (1 - tier.discount / 100)
    }
}

// ============================================
// VALIDATION STRATEGIES
// ============================================

/**
 * Validation Context
 */
class ValidationContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    validate(data) {
        return this.strategy.validate(data);
    }
}

/**
 * Strict Validation
 *
 * Requires all three fields to be present and valid:
 * - name: must be a non-empty string
 * - email: must be a non-empty string (no regex validation required)
 * - age: must be a number (any number is valid, no range check required)
 */
class StrictValidation {
    validate(data) {
        let valid = true;
        let errors = [];

        if (!data.name) {
            valid = false;
            errors.push("Name is required")
        }

        if (!data.email) {
            valid = false;
            errors.push("Email is required")
        }

        if (!data.age) {
            valid = false;
            errors.push("Age is required")
        }

        return {valid: valid, errors: errors}
    }
}

/**
 * Lenient Validation
 *
 * Accepts any data, including empty objects.
 * No validation rules - always passes.
 */
class LenientValidation {
    validate(data) {
        return {valid: true, errors: []};
    }
}

// ============================================
// STRATEGY REGISTRY
// ============================================

/**
 * Strategy Registry
 *
 * Register and retrieve strategies by name.
 */
class StrategyRegistry {
    constructor() {
        this.strategies = new Map();
    }

    register(name, strategy) {
        this.strategies.set(name, strategy);
    }

    get(name) {
        return this.strategies.get(name) || null;
    }

    has(name) {
        return this.strategies.has(name);
    }
}

module.exports = {
    // Sorting
    SortContext,
    BubbleSort,
    QuickSort,
    MergeSort,
    // Pricing
    PricingContext,
    RegularPricing,
    PercentageDiscount,
    FixedDiscount,
    BuyOneGetOneFree,
    TieredDiscount,
    // Validation
    ValidationContext,
    StrictValidation,
    LenientValidation,
    // Registry
    StrategyRegistry,
};
