// Solution: Digit-by-digit addition with carry
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
        const dummy = new ListNode();
        let curr = dummy;

        let carry = 0;
        while (l1 || l2 || carry) {
            const v1 = l1 ? l1.val : 0;
            const v2 = l2 ? l2.val : 0;

            let val = v1 + v2 + carry;
            carry = Math.floor(val / 10);
            val = val % 10;
            curr.next = new ListNode(val);

            curr = curr.next;
            l1 = l1 ? l1.next : null;
            l2 = l2 ? l2.next : null;
        }

        return dummy.next;
    }
}

/**
 * Time Complexity: O(n + m) where m and n are the lengths of l1 and l2.
 * Space Complexity: O(max(m, n)) for the result linked list.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n + m)',
    space: 'O(max(n, m))'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ListNode, Solution, SOLUTION_COMPLEXITY };
}


