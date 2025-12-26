// Solution: HashMap + Doubly Linked List
class Node {
    /**
     * @param {number} key
     * @param {number} val
     */
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key -> Node

        // Dummy head and tail for easier list manipulation
        this.left = new Node(0, 0);  // LRU side
        this.right = new Node(0, 0); // Most recent side
        this.left.next = this.right;
        this.right.prev = this.left;
    }

    /**
     * Remove node from list
     * @param {Node} node
     */
    remove(node) {
        const prevNode = node.prev;
        const nextNode = node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
    }

    /**
     * Insert node at right (most recently used)
     * @param {Node} node
     */
    insert(node) {
        const prevNode = this.right.prev;
        prevNode.next = node;
        node.prev = prevNode;
        node.next = this.right;
        this.right.prev = node;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            // Move to most recently used
            this.remove(node);
            this.insert(node);
            return node.val;
        }
        return -1;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            // Remove old node
            this.remove(this.cache.get(key));
        }

        // Insert new node
        const newNode = new Node(key, value);
        this.cache.set(key, newNode);
        this.insert(newNode);

        // Check capacity and evict LRU if needed
        if (this.cache.size > this.capacity) {
            const lru = this.left.next;
            this.remove(lru);
            this.cache.delete(lru.key);
        }
    }
}

/**
 * Time Complexity: O(1) for both get() and put() operations
 * 
 * get(key):
 * - HashMap lookup: O(1) average case
 * - remove() operation: O(1) - we have direct reference to the node
 * - insert() operation: O(1) - we insert at a fixed position (before right dummy)
 * - Total: O(1)
 * 
 * put(key, value):
 * - HashMap lookup (if key exists): O(1) average case
 * - remove() operation (if updating): O(1) - direct node reference
 * - HashMap set: O(1) average case
 * - insert() operation: O(1) - insert at fixed position
 * - Eviction check and removal (if over capacity): O(1) - remove from fixed position (left.next)
 * - Total: O(1)
 * 
 * Space Complexity: O(n) where n is the capacity
 * - HashMap stores at most n key-value pairs: O(n)
 * - Doubly linked list stores at most n nodes: O(n)
 * - Two dummy nodes (left, right): O(1)
 * - Total: O(n)
 */
const SOLUTION_COMPLEXITY = {
    overall: {
        time: 'O(1)',  // Per operation
        space: 'O(n)'  // Total space for the data structure
    },
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Node, LRUCache, SOLUTION_COMPLEXITY };
}


