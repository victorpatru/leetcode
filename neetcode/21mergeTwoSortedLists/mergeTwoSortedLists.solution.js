// Solution 1: Dummy node approach
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
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    mergeTwoLists(list1, list2) {
        const dummyHead = new ListNode()
        let tail = dummyHead

        while (list1 && list2) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next; // Move tail to the node we just added.
        }

        if (list1) {
            tail.next = list1;
        } else {
            tail.next = list2;
        }

        return dummyHead.next;
    }
}

/**
 * Time Complexity: O(n + m) where n and m are the lengths of list1 and list2.
 * Space Complexity: O(1) as we only use a constant amount of extra space.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n + m)',
    space: 'O(1)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, ListNode, SOLUTION_COMPLEXITY };
}

