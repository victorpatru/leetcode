/**
 * Top K Frequent Elements
 * 
 * Given an integer array nums and an integer k, return the k most frequent elements within the array.
 * 
 * The test cases are generated such that the answer is always unique.
 * 
 * You may return the output in any order.
 * 
 * @example
 * // Example 1:
 * // Input: nums = [1,2,2,3,3,3], k = 2
 * // Output: [2,3]
 * 
 * @example
 * // Example 2:
 * // Input: nums = [7,7], k = 1
 * // Output: [7]
 * 
 * @constraints
 * - 1 <= nums.length <= 10^4
 * - -1000 <= nums[i] <= 1000
 * - 1 <= k <= number of distinct elements in nums
 */

/**
 * Solution 1: Using bucket sort approach
 */
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        //#region Hints (click to expand)
        // 1. Count how many times each number appears

        // 2. Create bucket array where index = frequency

        // 3. Put each number into the bucket matching its frequency

        // 4. Traverse buckets from highest frequency downward and collect k most frequent numbers
        //#endregion
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

