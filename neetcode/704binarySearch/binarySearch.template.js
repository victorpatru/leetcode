/**
 * Binary Search
 *
 * You are given an array of distinct integers nums, sorted in ascending order, and an integer target.
 *
 * Implement a function to search for target within nums. If it exists, then return its index, 
 * otherwise, return -1.
 *
 * Your solution must run in O(log n) time.
 *
 * @example
 * // Example 1:
 * // Input: nums = [-1,0,2,4,6,8], target = 4
 * // Output: 3
 *
 * // Example 2:
 * // Input: nums = [-1,0,2,4,6,8], target = 3
 * // Output: -1
 *
 * @constraints
 * - 1 <= nums.length <= 10000
 * - -10000 < nums[i], target < 10000
 * - All the integers in nums are unique
 * - nums is sorted in ascending order
 *
 */

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
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

