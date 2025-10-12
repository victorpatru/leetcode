/**
 * LeetCode #1004: Max Consecutive Ones III
 * Difficulty: Medium
 * 
 * Problem: Given a binary array nums and an integer k, 
 * return the maximum number of consecutive 1's in the array 
 * if you can flip at most k 0's.
 * 
 * Pattern: Variable Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function longestOnes(nums, k) {
    let left = 0
    let right = 0
    let curr = 0
    let ans = 0

    for (right; right < nums.length; right++) {
        if (nums[right] == "0") {
            curr++
        }

        while (curr > k) {
            if (nums[left] == "0") {
                curr--
            }
            left++
        }

        ans = Math.max(ans, curr)
    }

    return ans
};

