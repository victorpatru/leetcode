/**
 * Copy List with Random Pointer
 *
 * You are given the head of a linked list of length n. Unlike a singly linked list, each node
 * contains an additional pointer random, which may point to any node in the list, or null.
 *
 * Create a deep copy of the list.
 *
 * The deep copy should consist of exactly n new nodes, each including:
 * - The value of its corresponding original node
 * - A next pointer to the new node corresponding to the next node of the original node, or null
 * - A random pointer to the new node corresponding to the random node of the original node, or null
 *
 * Note: None of the pointers in the new list should point to nodes in the original list.
 *
 * Return the head of the copied linked list.
 *
 * @example
 * // Example 1:
 * // Input: head = [[3,null],[7,3],[4,0],[5,1]]
 * // Output: [[3,null],[7,3],[4,0],[5,1]]
 *
 * // Example 2:
 * // Input: head = [[1,null],[2,2],[3,2]]
 * // Output: [[1,null],[2,2],[3,2]]
 *
 * @constraints
 * - 0 <= n <= 100
 * - -100 <= Node.val <= 100
 * - random is null or is pointing to some node in the linked list
 *
 */

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
    module.exports = { Node, Solution, SOLUTION_COMPLEXITY };
}


