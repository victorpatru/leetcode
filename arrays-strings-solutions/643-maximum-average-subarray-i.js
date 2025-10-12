/**
 * LeetCode #643: Maximum Average Subarray I
 * Difficulty: Easy
 * 
 * Problem: Given an integer array nums and an integer k, 
 * find the contiguous subarray of length k that has the maximum average value.
 * 
 * Pattern: Fixed Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function findMaxAverage(nums, k) {
    let curr = 0
    for (let i = 0; i < k; i++) {
        curr += nums[i]
    }


    let ans = curr / k

    for (let i = k; i < nums.length; i++) {
        curr += nums[i] - nums[i - k]
        ans = Math.max(ans, curr / k)
    }
    return ans
};

