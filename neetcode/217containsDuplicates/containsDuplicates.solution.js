// Solution 1: Using hash set iteratively
class SolutionHashSet {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        const seen = new Set();
        for (const num of nums) {
            if (seen.has(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}

// Solution 2: Using hash set length comparison
class SolutionHashSetLength {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        return new Set(nums).size < nums.length;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SolutionHashSet, SolutionHashSetLength };
}