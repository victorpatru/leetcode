// Solution 1: Iterative approach
/**
 * Definition for singly-linked list.
 */
class ListNode {
    constructor(val, next = null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

class Solution {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    reverseList(head) {
        let prev = null, curr = head;

        while (curr) {
            let temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }
        return prev;
    }
}

/**
 * Time Complexity: O(n) where n is the number of nodes in the linked list.
 * Space Complexity: O(1) as we only use a constant amount of extra space.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, ListNode, SOLUTION_COMPLEXITY };
}

