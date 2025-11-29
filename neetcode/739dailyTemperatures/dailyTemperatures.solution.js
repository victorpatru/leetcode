// Solution 1: Stack approach
class Solution {
    /**
     * @param {number[]} temps
     * @return {number[]}
     */
    dailyTemperatures(temps) {
        const n = temps.length;
        const res = Array(n).fill(0);
        const stack = []; // stack of indices

        for (let i = 0; i < n; i++) {
            while (stack.length && temps[i] > temps[stack.at(-1)]) {
                const j = stack.pop();
                res[j] = i - j;
            }
            stack.push(i);
        }

        return res;
    }
}

/**
 * Time Complexity: O(n) where n is the length of the temperatures array.
 * Each element is pushed and popped from the stack at most once.
 * Space Complexity: O(n) as we use a stack that can grow up to n elements in the worst case.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

