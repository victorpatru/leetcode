/**
 * 217. Contains Duplicate
 *
 * Given an integer array nums, return true if any value appears at least twice
 * in the array, and return false if every element is distinct.
 *
 * @example
 * // Example 1:
 * // Input: nums = [1,2,3,1]
 * // Output: true
 * // Explanation: The element 1 occurs at the indices 0 and 3.
 *
 * @example
 * // Example 2:
 * // Input: nums = [1,2,3,4]
 * // Output: false
 * // Explanation: All elements are distinct.
 *
 * @example
 * // Example 3:
 * // Input: nums = [1,1,1,3,3,4,3,2,4,2]
 * // Output: true
 *
 * @constraints
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 *
 * Solution 1: Using hash set iteratively
 */
class SolutionHashSet {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        // TODO: implement
    }
}
/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_HASH_SET_COMPLEXITY = {
    time: '',
    space: ''
};

/**
 * Solution 2: Using hash set length comparison
 */
class SolutionHashSetLength {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        // TODO: implement
    }
}

/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_HASH_SET_LENGTH_COMPLEXITY = {
    time: '',
    space: ''
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SolutionHashSet,
        SolutionHashSetLength,
        SOLUTION_HASH_SET_COMPLEXITY,
        SOLUTION_HASH_SET_LENGTH_COMPLEXITY
    };
}

