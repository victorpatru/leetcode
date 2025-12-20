class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        if (s1.length > s2.length) {
            return false;
        }

        let s1Count = new Array(26).fill(0);
        let s2Count = new Array(26).fill(0);
        for (let i = 0; i < s1.length; i++) {
            s1Count[s1.charCodeAt(i) - "a".charCodeAt(0)]++;
            s2Count[s2.charCodeAt(i) - "a".charCodeAt(0)]++;
        }

        let matches = 0;
        for (let i = 0; i < 26; i++) {
            if (s1Count[i] === s2Count[i]) {
                matches++;
            }
        }

        let l = 0;
        for (let r = s1.length; r < s2.length; r++) {
            if (matches === 26) {
                return true;
            }

            // Add the new right character and update matches
            const rightIndex = s2.charCodeAt(r) - "a".charCodeAt(0);
            s2Count[rightIndex]++;
            if (s2Count[rightIndex] === s1Count[rightIndex]) {
                matches++;
            } else if (s2Count[rightIndex] === s1Count[rightIndex] + 1) {
                matches--;
            }

            // Remove the left character and update matches
            const leftIndex = s2.charCodeAt(l) - "a".charCodeAt(0);
            s2Count[leftIndex]--;
            if (s2Count[leftIndex] === s1Count[leftIndex]) {
                matches++;
            } else if (s2Count[leftIndex] === s1Count[leftIndex] - 1) {
                matches--;
            }
            l++;
        }
        return matches === 26;
    }
}

/**
 * Time Complexity: O(n) - where n is the length of s2
 *   - We initialize two frequency arrays: O(26) for s1Count, O(s1.length) for initial window
 *   - We count initial matches: O(26)
 *   - We slide the window through s2: O(s2.length - s1.length)
 *   - Each operation in the window is O(1)
 *   - Overall: O(s1.length + 26 + s2.length) = O(n)
 *
 * Space Complexity: O(1) - constant space
 *   - We use two arrays of size 26 (fixed for lowercase letters)
 *   - A few variables (matches, l, r, index)
 *   - Overall: O(26) = O(1)
 */

const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

