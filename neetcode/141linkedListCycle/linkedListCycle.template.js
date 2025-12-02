/**
 * Linked List Cycle Detection
 *
 * Given the beginning of a linked list head, return true if there is a cycle in the linked list.
 * Otherwise, return false.
 *
 * There is a cycle in a linked list if at least one node in the list can be visited again
 * by following the next pointer.
 *
 * Internally, index determines the index of the beginning of the cycle, if it exists.
 * The tail node of the list will set it's next pointer to the index-th node.
 * If index = -1, then the tail node points to null and no cycle exists.
 *
 * Note: index is not given to you as a parameter.
 *
 * @example
 * // Example 1:
 * // Input: head = [1,2,3,4], index = 1
 * // Output: true
 * // Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
 *
 * // Example 2:
 * // Input: head = [1,2], index = -1
 * // Output: false
 *
 * @constraints
 * - 1 <= Length of the list <= 1000
 * - -1000 <= Node.val <= 1000
 * - index is -1 or a valid index in the linked list
 * 
 * Solution Using Floyd's cycle detection algorithm (tortoise and hare)
 * Hint: Use two pointers moving at different speeds - if there's a cycle, they will eventually meet
 */

/**
 * Definition for singly-linked list.
 */
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class Solution {
    /**
     * @param {ListNode} head
     * @return {boolean}
     */
    hasCycle(head) {
        // TODO: implement
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
    module.exports = { Solution, ListNode, SOLUTION_COMPLEXITY };
}

