/**
 * Largest Rectangle In Histogram
 *
 * You are given an array of integers heights where heights[i] represents the height of a bar.
 * The width of each bar is 1.
 *
 * Return the area of the largest rectangle that can be formed among the bars.
 *
 * Note: This chart is known as a histogram.
 *
 * @example
 * // Example 1:
 * // Input: heights = [7,1,7,2,2,4]
 * // Output: 8
 *
 * // Example 2:
 * // Input: heights = [1,3,7]
 * // Output: 7
 *
 * @constraints
 * - 1 <= heights.length <= 1000
 * - 0 <= heights[i] <= 1000
 * 
 * Solution Using stack approach
 * Hint: Use a stack to track indices and heights. When encountering a bar shorter than the top
 * of the stack, calculate the area of rectangles ending at that position.
 */

class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
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

