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
        this.cap = capacity;
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
        const prev = node.prev;
        const nxt = node.next;
        prev.next = nxt;
        nxt.prev = prev;
    }

    /**
     * Insert node at right (most recently used)
     * @param {Node} node
     */
    insert(node) {
        const prev = this.right.prev;
        prev.next = node;
        node.prev = prev;
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
        if (this.cache.size > this.cap) {
            const lru = this.left.next;
            this.remove(lru);
            this.cache.delete(lru.key);
        }
    }
}

/**
 * Time Complexity: 
 * - get: O(1) - HashMap lookup and list operations are O(1)
 * - put: O(1) - HashMap operations and list operations are O(1)
 * 
 * Space Complexity: O(capacity) - storing at most capacity nodes in HashMap and list
 */
const SOLUTION_COMPLEXITY = {
    get: {
        time: 'O(1)',
        space: 'O(1)'
    },
    put: {
        time: 'O(1)',
        space: 'O(1)'
    }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Node, LRUCache, SOLUTION_COMPLEXITY };
}


