# JavaScript Workshop - Advanced Assignments

Master JavaScript through hands-on coding challenges with automated tests.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation
```bash
npm install
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests for a specific assignment
npm run test:01  # Deep Clone
npm run test:02  # Debounce/Throttle
# ... etc

# Run tests in watch mode
npm test:watch

# Run with coverage report
npm test:coverage
```

## Assignments

### Core JavaScript Mastery
| # | Assignment | Difficulty | Topics |
|---|------------|------------|--------|
| 01 | [Deep Clone](./01-deep-clone) | Medium | Recursion, Type checking |
| 02 | [Debounce & Throttle](./02-debounce-throttle) | Medium | Closures, Timing |
| 03 | [Custom Bind](./03-custom-bind) | Hard | `this` context, Prototypes |
| 04 | [Memoization](./04-memoization) | Medium | Closures, Caching |

### Async Patterns
| # | Assignment | Difficulty | Topics |
|---|------------|------------|--------|
| 05 | [Promise Utilities](./05-promise-utilities) | Hard | Promises, Async |
| 06 | [Async Queue](./06-async-queue) | Hard | Concurrency, Promises |
| 07 | [Retry with Backoff](./07-retry-with-backoff) | Medium | Error handling, Async |

### Design Patterns
| # | Assignment | Difficulty | Topics |
|---|------------|------------|--------|
| 08 | [Event Emitter](./08-event-emitter) | Medium | Pub/Sub, Callbacks |
| 09 | [Observable](./09-observable) | Hard | Reactive patterns |
| 10 | [LRU Cache](./10-lru-cache) | Hard | Data structures |
| 11 | [Singleton](./11-singleton) | Easy | Creational patterns |
| 12 | [Factory Pattern](./12-factory-pattern) | Medium | Creational patterns |
| 13 | [Decorator Pattern](./13-decorator-pattern) | Medium | Structural patterns |
| 14 | [Middleware Pipeline](./14-middleware-pipeline) | Hard | Behavioral patterns |
| 15 | [Dependency Injection](./15-dependency-injection) | Hard | IoC, SOLID |
| 16 | [State Machine](./16-state-machine) | Hard | Behavioral patterns |
| 17 | [Command Pattern](./17-command-pattern) | Medium | Behavioral patterns |
| 18 | [Strategy Pattern](./18-strategy-pattern) | Medium | Behavioral patterns |
| 19 | [Proxy Pattern](./19-proxy-pattern) | Medium | Structural patterns |
| 20 | [Builder Pattern](./20-builder-pattern) | Medium | Creational patterns |

## How to Submit (PR Workflow)

1. **Fork** this repository
2. **Create a branch** for your assignment:
   ```bash
   git checkout -b assignment-01-deep-clone
   ```
3. **Implement** your solution in the assignment's `index.js`
4. **Test** your solution:
   ```bash
   npm run test:01
   ```
5. **Commit** your changes:
   ```bash
   git add .
   git commit -m "Complete assignment 01: Deep Clone"
   ```
6. **Push** and create a **Pull Request**
   ```bash
   git push origin assignment-01-deep-clone
   ```

## Assignment Structure

Each assignment folder contains:
- `README.md` - Assignment description and requirements
- `index.js` - Starter code with TODO markers
- `index.test.js` - Jest tests to verify your solution

## Tips for Success

1. **Read the README** carefully before starting
2. **Run the tests first** to see what's expected
3. **Implement incrementally** - get one test passing at a time
4. **Check edge cases** - tests cover many scenarios
5. **Don't modify test files** - only edit `index.js`

## License

MIT
