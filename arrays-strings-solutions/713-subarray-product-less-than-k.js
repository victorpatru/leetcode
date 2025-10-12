/**
 * LeetCode #713: Subarray Product Less Than K
 * Difficulty: Medium
 * 
 * Problem: Given an array of integers nums and an integer k, 
 * return the number of contiguous subarrays where the product 
 * of all the elements in the subarray is strictly less than k.
 * 
 * Pattern: Variable Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function slidingWindowProduct(nums, k) {
    let left = 0
    let right = 0
    let ans = 0
    let curr = 0
    for (right; right < nums.length; right++) {
        curr *= nums[right]

        while (curr > k) {
            curr /= nums[left]
            left++
        }

        ans = Math.max(ans, right - left + 1)

    }
    return ans
}

