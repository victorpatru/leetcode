/**
 * Reverse Linked List
 *
 * Given the beginning of a singly linked list head, reverse the list,
 * and return the new beginning of the list.
 *
 * @example
 * // Example 1:
 * // Input: head = [0,1,2,3]
 * // Output: [3,2,1,0]
 *
 * // Example 2:
 * // Input: head = []
 * // Output: []
 *
 * @constraints
 * - 0 <= The length of the list <= 1000
 * 
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
     * @return {ListNode}
     */
    reverseList(head) {
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

