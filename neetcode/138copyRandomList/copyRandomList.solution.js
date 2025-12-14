// Solution: HashMap approach
class Node {
    constructor(val, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

class Solution {
    /**
     * @param {Node} head
     * @return {Node}
     */
    copyRandomList(head) {
        const oldToCopy = new Map();
        oldToCopy.set(null, null);

        let curr = head;
        while (curr) {
            oldToCopy.set(curr, new Node(curr.val));
            curr = curr.next;
        }

        curr = head;
        while (curr) {
            const copy = oldToCopy.get(curr);
            copy.next = oldToCopy.get(curr.next);
            copy.random = oldToCopy.get(curr.random);
            curr = curr.next;
        }

        return oldToCopy.get(head);
    }
}

/**
 * Time Complexity: O(n) where n is the number of nodes in the linked list.
 * Space Complexity: O(n) as we use a HashMap to store n nodes.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Node, Solution, SOLUTION_COMPLEXITY };
}


