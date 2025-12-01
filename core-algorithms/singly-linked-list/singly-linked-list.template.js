/**
 * Design Singly Linked List
 * 
 * Your LinkedList class should support the following operations:
 * 
 * - LinkedList() will initialize an empty linked list.
 * 
 * - int get(int i) will return the value of the ith node (0-indexed). If the index is out of bounds, return -1.
 * 
 * - void insertHead(int val) will insert a node with val at the head of the list.
 * 
 * - void insertTail(int val) will insert a node with val at the tail of the list.
 * 
 * - bool remove(int i) will remove the ith node (0-indexed). If the index is out of bounds, return false, otherwise return true.
 * 
 * - int[] getValues() return an array of all the values in the linked list, ordered from head to tail.
 * 
 * @example
 * // Example 1:
 * // Input: ["insertHead", 1, "insertTail", 2, "insertHead", 0, "remove", 1, "getValues"]
 * // Output: [null, null, null, true, [0, 2]]
 * 
 * @example
 * // Example 2:
 * // Input: ["insertHead", 1, "insertHead", 2, "get", 5]
 * // Output: [null, null, -1]
 * 
 * @note
 * The index int i provided to get(int i) and remove(int i) is guaranteed to be greater than or equal to 0.
 */
class ListNode {
    constructor(value, nextNode = null) {
        this.value = value
        // TODO: implement
    }
}

class LinkedList {
    constructor() {
        // TODO: implement
    }

    /**
     * @param {number} index
     * @return {number}
     */
    get(index) {
        // TODO: implement
    }

    /**
     * @param {number} value
     * @return {void}
     */
    insertHead(value) {
        // TODO: implement
    }

    /**
     * @param {number} value
     * @return {void}
     */
    insertTail(value) {
        // TODO: implement
    }

    /**
     * @param {number} index
     * @return {boolean}
     */
    remove(index) {
        // TODO: implement
    }

    /**
     * @return {number[]}
     */
    getValues() {
        // TODO: implement
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ListNode, LinkedList };
}

