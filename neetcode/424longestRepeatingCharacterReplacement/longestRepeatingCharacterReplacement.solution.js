class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {number}
     */
    characterReplacement(s, k) {
        const count = {};
        let res = 0;

        let l = 0;
        for (let r = 0; r < s.length; r++) {
            count[s[r]] = (count[s[r]] ?? 0) + 1;

            // Window is invalid if: windowSize - maxFreq > k
            // This means we need more than k replacements
            while ((r - l + 1) - Math.max(...Object.values(count)) > k) {
                count[s[l]] -= 1;
                l += 1;
            }

            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}

/**
 * Time Complexity: O(26 * n) = O(n) - where n is the length of the string
 *   - We iterate through the string once with the right pointer
 *   - At each step, we find the max count (up to 26 uppercase letters)
 *   - The left pointer moves at most n times total
 *
 * Space Complexity: O(26) = O(1) - constant space for the count object
 *   - At most 26 uppercase English letters
 */

const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

