/**
 * Trapping Rain Water
 *
 * You are given an array of non-negative integers height which represent an elevation map.
 * Each value height[i] represents the height of a bar, which has a width of 1.
 *
 * Return the maximum area of water that can be trapped between the bars.
 *
 * @example
 * // Example 1:
 * // Input: height = [0,2,0,3,1,0,1,3,2,1]
 * // Output: 9
 *
 * @constraints
 * - 1 <= height.length <= 1000
 * - 0 <= height[i] <= 1000
 * 
 * Solution Using two-pointer approach
 * Hint: Use two pointers from both ends, track the maximum height on each side
 */

class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (!height || height.length === 0) {
            return 0;
        }
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

