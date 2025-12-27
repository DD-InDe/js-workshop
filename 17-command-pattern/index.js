/**
 * Command Pattern Implementation
 */

/**
 * Command Manager
 *
 * Manages command execution with undo/redo support.
 */
class CommandManager {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    /**
     * Execute a command
     * @param {Object} command - Command with execute() method
     */
    execute(command) {
        command.execute()
        this.undoStack.push(command);
        this.redoStack = [];
    }

    /**
     * Undo the last command
     * @returns {boolean} Whether undo was performed
     */
    undo() {
        if (this.undoStack.length === 0) return false;

        const command = this.undoStack.pop();
        command.undo();
        this.redoStack.push(command);

        return true;
    }

    /**
     * Redo the last undone command
     * @returns {boolean} Whether redo was performed
     */
    redo() {
        if (this.redoStack.length === 0) return false;

        const command = this.redoStack.pop();
        command.execute();
        this.undoStack.push(command);

        return true;
    }

    /**
     * Check if undo is available
     * @returns {boolean}
     */
    canUndo() {
        return this.undoStack.length !== 0;
    }

    /**
     * Check if redo is available
     * @returns {boolean}
     */
    canRedo() {
        return this.redoStack.length !== 0;
    }

    /**
     * Get command history (executed commands)
     * @returns {Object[]}
     */
    get history() {
        return Array.of(...this.undoStack);
    }

    /**
     * Clear all history
     */
    clear() {
        this.undoStack = [];
        this.redoStack = [];
    }
}

/**
 * Add Command
 */
class AddCommand {
    constructor(calculator, value) {
        this.calculator = calculator;
        this.value = value;
        this.description = `Add ${value}`;
    }

    execute() {
        this.calculator.value += this.value;
    }

    undo() {
        this.calculator.value -= this.value;
    }
}

/**
 * Subtract Command
 */
class SubtractCommand {
    constructor(calculator, value) {
        this.calculator = calculator;
        this.value = value;
        this.description = `Subtract ${value}`;
    }

    execute() {
        this.calculator.value -= this.value;
    }

    undo() {
        this.calculator.value += this.value;
    }
}

/**
 * Multiply Command
 */
class MultiplyCommand {
    constructor(calculator, value) {
        this.calculator = calculator;
        this.value = value;
        this.description = `Multiply by ${value}`;
    }

    execute() {
        this.previousValue = this.calculator.value;
        this.calculator.value *= this.value;
    }

    undo() {
        this.calculator.value = this.previousValue;
    }
}

/**
 * Divide Command
 */
class DivideCommand {
    constructor(calculator, value) {
        this.calculator = calculator;
        this.value = value;
        this.description = `Divide by ${value}`;
    }

    execute() {
        this.previousValue = this.calculator.value;
        this.calculator.value /= this.value;
    }

    undo() {
        this.calculator.value = this.previousValue;
    }
}

/**
 * Macro Command (Composite)
 *
 * Groups multiple commands into one.
 */
class MacroCommand {
    constructor(commands = []) {
        this.commands = commands;
        this.description = "Macro";
    }

    /**
     * Add a command to the macro
     * @param {Object} command
     */
    add(command) {
        this.commands.push(command);
    }

    execute() {
        this.commands.map(command => command.execute());
    }

    undo() {
        this.commands.toReversed().map(command => command.undo());
    }
}

/**
 * Set Value Command
 *
 * Sets calculator to specific value (useful for testing).
 */
class SetValueCommand {
    constructor(calculator, value) {
        this.calculator = calculator;
        this.value = value;
        this.description = `Set to ${value}`;
    }

    execute() {
        this.previousValue = this.calculator.value;
        this.calculator.value = this.value;
    }

    undo() {
        this.calculator.value = this.previousValue;
    }
}

module.exports = {
    CommandManager,
    AddCommand,
    SubtractCommand,
    MultiplyCommand,
    DivideCommand,
    MacroCommand,
    SetValueCommand,
};
