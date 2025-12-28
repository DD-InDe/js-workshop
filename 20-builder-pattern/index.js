/**
 * Builder Pattern Implementation
 */

/**
 * Query Builder
 *
 * Builds SQL-like query strings.
 */
class QueryBuilder {
    constructor() {
        this.selectCols = [];
        this.fromTable = null;
        this.whereClauses = [];
        this.orderByClauses = [];
        this.limitCount = null;
    }

    /**
     * Select columns
     * @param {...string} columns - Column names
     * @returns {QueryBuilder} this
     */
    select(...columns) {
        this.selectCols.push(...columns)
        return this;
    }

    /**
     * From table
     * @param {string} table - Table name
     * @returns {QueryBuilder} this
     */
    from(table) {
        this.fromTable = table;
        return this;
    }

    /**
     * Add where clause
     * @param {string} column - Column name
     * @param {string} operator - Comparison operator
     * @param {*} value - Value to compare
     * @returns {QueryBuilder} this
     */
    where(column, operator, value) {
        this.whereClauses.push({column: column, operator: operator, value: value});
        return this;
    }

    /**
     * Add order by clause
     * @param {string} column - Column to order by
     * @param {string} [direction='ASC'] - ASC or DESC
     * @returns {QueryBuilder} this
     */
    orderBy(column, direction = "ASC") {
        this.orderByClauses.push({column: column, direction: direction})
        return this;
    }

    /**
     * Set limit
     * @param {number} count - Maximum rows
     * @returns {QueryBuilder} this
     */
    limit(count) {
        this.limitCount = count;
        return this;
    }

    /**
     * Build the query string
     * @returns {string} SQL query string
     */
    build() {
        let query = "SELECT ";

        query += this.selectCols.length !== 0 ? this.selectCols.join(', ') : "* ";

        query += ` FROM ${this.fromTable}`;

        if (this.whereClauses.length !== 0) {
            const wherePart = this.whereClauses
                .map(w => `${w.column} ${w.operator} ${formatValue(w.value)}`)
                .join(" AND ");
            query += ` WHERE ${wherePart}`;
        }

        if (this.orderByClauses.length !== 0) {
            const orderPart = this.orderByClauses
                .map(o => `${o.column} ${o.direction}`)
                .join(", ");
            query += ` ORDER BY ${orderPart}`;
        }

        if (this.limitCount !== null) {
            query += ` LIMIT ${this.limitCount}`;
        }

        return query;

        function formatValue(val) {
            return typeof val === 'string' ? `'${val}'` : val;
        }
    }

    /**
     * Reset builder state
     * @returns {QueryBuilder} this
     */
    reset() {
        this.selectCols.length = 0;
        this.fromTable = null;
        this.whereClauses.length = 0;
        this.orderByClauses.length = 0;
        this.limitCount = null;

        return this;
    }
}

/**
 * HTML Builder
 *
 * Builds HTML element strings.
 */
class HTMLBuilder {
    constructor() {
        this.tagName = 'div';
        this.idAttr = null;
        this.classes = [];
        this.attributes = {};
        this.innerContent = '';
        this.children = [];
    }

    /**
     * Set tag name
     * @param {string} name - HTML tag name
     * @returns {HTMLBuilder} this
     */
    tag(name) {
        this.tagName = name;
        return this;
    }

    /**
     * Set id attribute
     * @param {string} id - Element ID
     * @returns {HTMLBuilder} this
     */
    id(id) {
        this.idAttr = id;
        return this;
    }

    /**
     * Add classes
     * @param {...string} classNames - Class names to add
     * @returns {HTMLBuilder} this
     */
    class(...classNames) {
        this.classes.push(...classNames)
        return this;
    }

    /**
     * Add attribute
     * @param {string} name - Attribute name
     * @param {string} value - Attribute value
     * @returns {HTMLBuilder} this
     */
    attr(name, value) {
        this.attributes[name] = value;
        return this;
    }

    /**
     * Set inner content
     * @param {string} content - Text content
     * @returns {HTMLBuilder} this
     */
    content(content) {
        this.innerContent = content;
        return this;
    }

    /**
     * Add child element
     * @param {string} childHtml - Child HTML string
     * @returns {HTMLBuilder} this
     */
    child(childHtml) {
        this.children.push(childHtml);
        return this;
    }

    /**
     * Build HTML string
     * @returns {string} HTML element string
     */
    build() {
        let html = `<${this.tagName}`

        if (this.idAttr != null)
            html += ` id="${this.idAttr}"`;

        if (this.classes.length !== 0)
            html += ` class="${this.classes.join(' ')}"`;

        if (Object.entries(this.attributes).length !== 0) {
            const attr = Object.entries(this.attributes)
                .map(([name, value]) => `${name}="${value}"`)
                .join(' ');
            html += ` ${attr}`;
        }

        html += `>${this.innerContent}`;
        if (this.children.length !== 0) {
            const childrenHtml = this.children.join("");
            html += childrenHtml;
        }

        return `${html}</${this.tagName}>`;
    }

    /**
     * Reset builder state
     * @returns {HTMLBuilder} this
     */
    reset() {
        this.tagName = 'div';
        this.idAttr = null;
        this.classes = [];
        this.attributes = {};
        this.innerContent = '';
        this.children = [];

        return this;
    }
}

/**
 * Config Builder
 *
 * Builds configuration objects.
 */
class ConfigBuilder {
    constructor() {
        this.config = {
            environment: 'development',
            database: null,
            features: [],
            logLevel: 'info'
        };
    }

    /**
     * Set environment
     * @param {string} env - Environment name
     * @returns {ConfigBuilder} this
     */
    setEnvironment(env) {
        this.config.environment = env;
        return this;
    }

    /**
     * Set database configuration
     * @param {Object} dbConfig - Database config object
     * @returns {ConfigBuilder} this
     */
    setDatabase(dbConfig) {
        this.config.database = dbConfig;
        return this;
    }

    /**
     * Enable a feature
     * @param {string} feature - Feature name
     * @returns {ConfigBuilder} this
     */
    enableFeature(feature) {
        this.config.features.push(feature);
        return this;
    }

    /**
     * Disable a feature
     * @param {string} feature - Feature name
     * @returns {ConfigBuilder} this
     */
    disableFeature(feature) {
        const index = this.config.features.indexOf(feature);
        if (index != null)
            this.config.features.splice(index, 1);
        return this;
    }

    /**
     * Set log level
     * @param {string} level - Log level
     * @returns {ConfigBuilder} this
     */
    setLogLevel(level) {
        this.config.logLevel = level;
        return this;
    }

    /**
     * Build configuration object
     * @returns {Object} Configuration object
     */
    build() {
        return {...this.config};
    }
}

/**
 * Request Builder
 *
 * Builds HTTP request configurations.
 */
class RequestBuilder {
    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
        this.queryParams = new Map();
        this.headerParams = new Map();
        this.pathStr = "";
        this.methodStr = "GET";
        this.bodyStr = null;
    }

    /**
     * Set HTTP method
     * @param {string} method - GET, POST, PUT, DELETE, etc.
     * @returns {RequestBuilder} this
     */
    method(method) {
        this.methodStr = method;
        return this;
    }

    /**
     * Set URL path
     * @param {string} path - URL path
     * @returns {RequestBuilder} this
     */
    path(path) {
        this.pathStr = path;
        return this;
    }

    /**
     * Add query parameter
     * @param {string} key - Parameter name
     * @param {string} value - Parameter value
     * @returns {RequestBuilder} this
     */
    query(key, value) {
        this.queryParams.set(key, value);
        return this;
    }

    /**
     * Add header
     * @param {string} key - Header name
     * @param {string} value - Header value
     * @returns {RequestBuilder} this
     */
    header(key, value) {
        this.headerParams.set(key, value);
        return this;
    }

    /**
     * Set request body
     * @param {*} body - Request body
     * @returns {RequestBuilder} this
     */
    body(body) {
        this.bodyStr = body;
        return this;
    }

    /**
     * Build request configuration
     * @returns {Object} Request config for fetch
     */
    build() {
        let url = this.baseUrl + this.pathStr;

        let query;
        if (this.queryParams.size !== 0) {
            const params = [];

            for (const [key, value] of this.queryParams)
                params.push(`${key}=${value}`);

            query = params.join('&');
        }

        if (query) {
            url += `?${query}`;
        }

        const headers = [];
        if (this.headerParams.size !== 0) {
            for (const [key, value] of this.headerParams) {
                headers[key] = value;
            }
        }
        
        return {url: url, method: this.methodStr, headers: headers, body: this.bodyStr}
    }

}

module.exports = {
    QueryBuilder,
    HTMLBuilder,
    ConfigBuilder,
    RequestBuilder,
};
