// Solution 1: Stack approach
class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        let pair = position.map((p, i) => [p, speed[i]]);
        pair.sort((a, b) => b[0] - a[0]);
        let stack = [];

        for (let [p, s] of pair) {
            stack.push((target - p) / s);
            if (
                stack.length >= 2 &&
                stack.at(-1) <= stack.at(-2)
            ) {
                stack.pop();
            }
        }

        return stack.length;
    }
}

/**
 * Time Complexity: O(n log n) where n is the number of cars.
 * Sorting the pairs takes O(n log n) time. The loop processes each car once, O(n).
 * Space Complexity: O(n) for the pair array and stack.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n log n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

