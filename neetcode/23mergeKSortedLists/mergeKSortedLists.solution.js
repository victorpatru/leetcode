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
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {
        if (!lists || lists.length === 0) {
            return null;
        }

        // Merge lists in pairs until only one list remains
        while (lists.length > 1) {
            const mergedLists = [];
            for (let i = 0; i < lists.length; i += 2) {
                const l1 = lists[i];
                const l2 = lists[i + 1] ?? null;
                mergedLists.push(this.mergeList(l1, l2));
            }
            lists = mergedLists;
        }
        return lists[0];
    }

    /**
     * Helper function to merge two sorted linked lists
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    mergeList(l1, l2) {
        const dummyHead = new ListNode(0);
        let curr = dummyHead;

        while (l1 && l2) {
            if (l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }

        curr.next = l1 ?? l2;
        return dummyHead.next;
    }
}

/**
 * Time Complexity: O(n * log k) where n is the total number of nodes and k is the number of lists.
 * 
 * Analysis:
 * - In each round of merging, we process all n nodes
 * - The number of rounds is log k (we halve the number of lists each round)
 * - Round 1: merge k lists into k/2 lists - processes all n nodes
 * - Round 2: merge k/2 lists into k/4 lists - processes all n nodes
 * - ...continues until we have 1 list
 * - Total rounds: log k
 * - Total time: O(n * log k)
 * 
 * mergeList() operation:
 * - Merging two lists of total size m takes O(m) time
 * - In each round, we merge all nodes once, so O(n) per round
 * 
 * Space Complexity: O(k)
 * - We create a new array 'mergedLists' in each round to store the merged lists
 * - The maximum size of this array is k/2 (in the first round)
 * - We don't count the output list or input lists as extra space
 * - Auxiliary space for the merging process: O(1) per merge (just dummy node and pointers)
 * - Space for the mergedLists array: O(k)
 * - Total: O(k)
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(nlogk)',
    space: 'O(k)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, ListNode, SOLUTION_COMPLEXITY };
}

