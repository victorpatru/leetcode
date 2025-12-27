/**
 * Valid Parentheses
 *
 * You are given a string s consisting of the following characters: '(', ')', '{', '}', '[' and ']'.
 *
 * The input string s is valid if and only if:
 * - Every open bracket is closed by the same type of close bracket.
 * - Open brackets are closed in the correct order.
 * - Every close bracket has a corresponding open bracket of the same type.
 *
 * Return true if s is a valid string, and false otherwise.
 *
 * @example
 * // Example 1:
 * // Input: s = "[]"
 * // Output: true
 *
 * @example
 * // Example 2:
 * // Input: s = "([{}])"
 * // Output: true
 *
 * @example
 * // Example 3:
 * // Input: s = "[(])"
 * // Output: false
 * // Explanation: The brackets are not closed in the correct order.
 *
 * @constraints
 * - 1 <= s.length <= 1000
 * 
 */

class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isValid(s) {
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

