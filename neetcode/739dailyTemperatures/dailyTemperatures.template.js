/**
 * Daily Temperatures
 *
 * You are given an array of integers temperatures where temperatures[i] represents the daily
 * temperatures on the ith day.
 *
 * Return an array result where result[i] is the number of days after the ith day before a
 * warmer temperature appears on a future day. If there is no day in the future where a warmer
 * temperature will appear for the ith day, set result[i] to 0 instead.
 *
 * @example
 * // Example 1:
 * // Input: temperatures = [30,38,30,36,35,40,28]
 * // Output: [1,4,1,2,1,0,0]
 *
 * @example
 * // Example 2:
 * // Input: temperatures = [22,21,20]
 * // Output: [0,0,0]
 *
 * @constraints
 * - 1 <= temperatures.length <= 1000
 * - 1 <= temperatures[i] <= 100
 * 
 * Solution Using stack approach
 */

class Solution {
    /**
     * @param {number[]} temps
     * @return {number[]}
     */
    dailyTemperatures(temps) {
        // TODO: implement
    }
}

/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_COMPLEXITY = {
    time: '',
    space: ''
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

