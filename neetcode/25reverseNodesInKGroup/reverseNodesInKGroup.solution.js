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
     * @param {number} k
     * @return {ListNode}
     */
    reverseKGroup(head, k) {
        const dummyHead = new ListNode(0, head);
        let groupPrev = dummyHead;

        while (true) {
            const kth = this.getKth(groupPrev, k);
            if (!kth) {
                break;
            }
            const groupNext = kth.next;

            // Reverse group
            let prev = groupNext;
            let curr = groupPrev.next;
            while (curr !== groupNext) {
                const tmp = curr.next;
                curr.next = prev;
                prev = curr;
                curr = tmp;
            }

            // Connect reversed group back to list and move groupPrev to end of reversed group
            const tmp = groupPrev.next;
            groupPrev.next = kth;
            groupPrev = tmp;
        }
        return dummyHead.next;
    }

    /**
     * Helper function to get the kth node from current position
     * @param {ListNode} curr
     * @param {number} k
     * @return {ListNode}
     */
    getKth(curr, k) {
        while (curr && k > 0) {
            curr = curr.next;
            k--;
        }
        return curr;
    }
}

/**
 * Time Complexity: O(n) - We visit each node once
 * Space Complexity: O(1) - Only using constant extra space
 */

const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, ListNode, SOLUTION_COMPLEXITY };
}

