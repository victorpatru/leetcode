/**
 * Practice Problem: Longest Subarray with Ones (at most one 0)
 * 
 * Problem: Given a binary array, find the length of the longest 
 * subarray containing only 1's with at most one 0 allowed.
 * 
 * Pattern: Variable Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function atMostOneZero(nums) {
    let left = 0
    let right = 0
    let ans = 0
    let curr = 0
    for (right; right < nums.length; right++) {
        if (nums[right] == "0") {
            curr++
        }

        while (curr > 1) {
            if (nums[left] == "0") {
                curr--
            }

            left--
        }

        ans = Math.max(ans, right - left + 1)
    }

    return ans
}

