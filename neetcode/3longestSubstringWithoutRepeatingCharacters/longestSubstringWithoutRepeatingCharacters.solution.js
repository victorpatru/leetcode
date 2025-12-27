// Solution: Sliding Window approach
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLongestSubstring(s) {
        const charSet = new Set();
        let l = 0;
        let res = 0;

        for (let r = 0; r < s.length; r++) {
            while (charSet.has(s[r])) {
                charSet.delete(s[l]);
                l++;
            }
            charSet.add(s[r]);
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}

/**
 * Time Complexity: O(n)
 * Space Complexity: O(min(n,m))
 * Where n is the length of the string and m is the size of the character set (e.g., 26 for lowercase letters, ~128 for ASCII, ~65k+ for Unicode)
 */

const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(min(n,charset))'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

