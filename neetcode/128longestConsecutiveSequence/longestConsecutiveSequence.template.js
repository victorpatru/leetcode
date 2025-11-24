/**
 * Longest Consecutive Sequence
 *
 * Given an array of integers nums, return the length of the longest consecutive
 * sequence of elements that can be formed.
 *
 * A consecutive sequence is a sequence of elements in which each element is
 * exactly 1 greater than the previous element. The elements do not have to be
 * consecutive in the original array.
 *
 * You must write an algorithm that runs in O(n) time.
 *
 * @example
 * // Example 1:
 * // Input: nums = [2,20,4,10,3,4,5]
 * // Output: 4
 * // Explanation: The longest consecutive sequence is [2, 3, 4, 5].
 *
 * @example
 * // Example 2:
 * // Input: nums = [0,3,2,5,4,6,1,1]
 * // Output: 7
 * // Explanation: The longest consecutive sequence is [0, 1, 2, 3, 4, 5, 6].
 *
 * @constraints
 * - 0 <= nums.length <= 1000
 * - -10^9 <= nums[i] <= 10^9
 *
 * Solution: Using hash set to find sequence starts
 */
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        // TODO: Implement
    }
}

/**
 * Time Complexity: TODO:
 * Space Complexity: TODO:
 */

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution };
}

