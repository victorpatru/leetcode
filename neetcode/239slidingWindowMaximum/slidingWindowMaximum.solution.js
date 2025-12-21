const { Deque } = require('../../helpers/Deque.js');

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const n = nums.length;
        const output = new Array(n - k + 1);
        const q = new Deque();
        let l = 0, r = 0;

        while (r < n) {
            // Remove smaller values from the back
            while (q.size() && nums[q.back()] < nums[r]) {
                q.popBack();
            }
            q.pushBack(r);

            // Remove elements outside the window (left of the window)
            while (q.size() && q.front() < r - k + 1) {
                q.popFront();
            }

            // Once window size is reached, record the max
            if (r + 1 >= k) {
                output[l] = nums[q.front()];
                l++;
            }
            r++;
        }

        return output;
    }
}

/**
 * Time Complexity: O(n) - where n is the length of nums
 *   - Each element is added to the deque exactly once: O(n)
 *   - Each element is removed from the deque at most once: O(n)
 *   - Although there's a nested while loop, the total number of operations
 *     across all iterations is O(n) because each index can only be popped once
 *   - Overall: O(n)
 *
 * Space Complexity: O(n)
 *   - The output array stores n - k + 1 elements: O(n)
 *   - The deque can store at most k elements at any time: O(k)
 *   - In the worst case, k can be equal to n
 *   - Overall: O(n)
 */

const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

