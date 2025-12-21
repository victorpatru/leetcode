/**
 * Longest Repeating Character Replacement
 *
 * You are given a string s consisting of only uppercase english characters and
 * an integer k. You can choose up to k characters of the string and replace
 * them with any other uppercase English character.
 *
 * After performing at most k replacements, return the length of the longest
 * substring which contains only one distinct character.
 *
 * @example
 * // Example 1:
 * // Input: s = "XYYX", k = 2
 * // Output: 4
 * // Explanation: Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's.
 *
 * @example
 * // Example 2:
 * // Input: s = "AAABABB", k = 1
 * // Output: 5
 *
 * @constraints
 * - 1 <= s.length <= 1000
 * - "s" consists of only uppercase English letters
 * - 0 <= k <= s.length
 */
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
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

