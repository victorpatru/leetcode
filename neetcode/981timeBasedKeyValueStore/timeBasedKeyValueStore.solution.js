// Solution: Using Map with arrays and binary search
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([value, timestamp]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const values = this.keyStore.get(key) || [];
        let left = 0;
        let right = values.length - 1;
        let result = '';

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][1] <= timestamp) {
                result = values[mid][0];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}

/**
 * Time Complexity: O(1) for set() on average, O(log n) for get() where n is the number of timestamps for a key.
 * Space Complexity: O(m * n) where m is the number of unique keys and n is the average number of timestamps per key.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(logn)', // O(1) for set(), O(log n) for get() where n is number of timestamps per key
    space: 'O(m*n)'  // m = number of keys, n = average number of timestamps per key
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TimeMap, SOLUTION_COMPLEXITY };
}
