// Solution: Using hash map (one-pass approach)
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const prevMap = new Map();

        for (let i = 0; i < nums.length; i++) {
            const diff = target - nums[i];

            if (prevMap.has(diff)) {
                return [prevMap.get(diff), i];
            }

            prevMap.set(nums[i], i);
        }

        return [];
    }
}

/**
 * Time Complexity: O(n) where n is the length of the array.
 * - Single pass through the array
 * - Hash map operations (get, has, set) are O(1) on average
 * 
 * Space Complexity: O(n) for the hash map.
 * - In the worst case, we store all n elements in the map
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

