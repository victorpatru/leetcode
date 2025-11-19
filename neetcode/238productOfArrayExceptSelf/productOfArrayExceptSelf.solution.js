// Solution 1: Using prefix and postfix products
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const res = new Array(nums.length);

        // 1) Left products (prefix)
        let left = 1;
        for (let i = 0; i < res.length; i++) {
            res[i] = left;      // everything to the LEFT of i
            left *= nums[i];
        }

        // 2) Right products (postfix)
        let right = 1;
        for (let i = res.length - 1; i >= 0; i--) {
            res[i] *= right;    // left * right of i
            right *= nums[i];
        }

        return res;
    }
}

/**
 * Time Complexity: O(n) where n is the length of nums.
 * Space Complexity: O(1) extra space (output array doesn't count).
 */

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution };
}

