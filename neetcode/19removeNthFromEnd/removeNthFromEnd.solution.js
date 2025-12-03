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
     * @param {number} n
     * @return {ListNode}
     */
    removeNthFromEnd(head, n) {
        const dummyHead = new ListNode(-1, head);
        let slow = dummyHead;
        let fast = head;

        // move fast n steps ahead
        while (n > 0) {
            fast = fast.next;
            n--;
        }

        // move both pointers until fast hits end
        while (fast) {
            slow = slow.next;
            fast = fast.next;
        }

        slow.next = slow.next.next;
        return dummyHead.next;
    }
}

/**
 * Time Complexity: O(n) where n is the number of nodes in the linked list.
 * We traverse the list once with two pointers, which takes O(n) time.
 * Space Complexity: O(1) as we only use a constant amount of extra space for pointers.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, ListNode, SOLUTION_COMPLEXITY };
}

