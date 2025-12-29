class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        let l = 1, r = Math.max(...piles);
        let res = r;

        while (l <= r) {
            const k = l + Math.floor((r - l) / 2);

            let hours = 0;
            for (const p of piles) {
                hours += Math.ceil(p / k);
            }
            if (hours <= h) {
                res = Math.min(res, k);
                r = k - 1;
            } else {
                l = k + 1;
            }
        }
        return res;
    }
}

/**
 * Time Complexity: O(n * log(m)) where n is the length of the input array piles and m is the maximum
 * number of bananas in a pile. We perform binary search on the possible eating rates (O(log m)), and
 * for each rate, we iterate through all piles to calculate the total time (O(n)).
 * Space Complexity: O(1) as we only use a constant amount of extra space for variables.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(nlog(m))',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}
