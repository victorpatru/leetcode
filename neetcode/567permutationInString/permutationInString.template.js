/**
 * Permutation in String
 *
 * You are given two strings s1 and s2.
 *
 * Return true if s2 contains a permutation of s1, or false otherwise. 
 * That means if a permutation of s1 exists as a substring of s2, then return true.
 *
 * Both strings only contain lowercase letters.
 *
 * @example
 * // Example 1:
 * // Input: s1 = "abc", s2 = "lecabee"
 * // Output: true
 * // Explanation: The substring "cab" is a permutation of "abc" and is present in "lecabee".
 *
 * @example
 * // Example 2:
 * // Input: s1 = "abc", s2 = "lecaabee"
 * // Output: false
 *
 * @constraints
 * - 1 <= s1.length, s2.length <= 1000
 */
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        // TODO: Implement
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
