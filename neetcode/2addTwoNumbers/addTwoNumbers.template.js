/**
 * Add Two Numbers
 *
 * You are given two non-empty linked lists, l1 and l2, where each represents a non-negative integer.
 *
 * The digits are stored in reverse order, e.g. the number 321 is represented as 1 -> 2 -> 3 -> in the linked list.
 *
 * Each of the nodes contains a single digit. You may assume the two numbers do not contain any leading zero,
 * except the number 0 itself.
 *
 * Return the sum of the two numbers as a linked list.
 *
 * @example
 * // Example 1:
 * // Input: l1 = [1,2,3], l2 = [4,5,6]
 * // Output: [5,7,9]
 * // Explanation: 321 + 654 = 975.
 *
 * // Example 2:
 * // Input: l1 = [9], l2 = [9]
 * // Output: [8,1]
 *
 * @constraints
 * - 1 <= l1.length, l2.length <= 100
 * - 0 <= Node.val <= 9
 *
 */

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class Solution {
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    addTwoNumbers(l1, l2) {

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
    module.exports = { ListNode, Solution, SOLUTION_COMPLEXITY };
}


