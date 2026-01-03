const { Deque } = require('../../helpers/Deque.js');

/**
 * Definition for a binary tree node.
 */
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Solution 1: Recursive DFS approach
class Solution {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        return root ? 1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) : 0
    }
}

// Solution 2: Iterative DFS approach (using stack)
class SolutionIterative {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        if (!root) return 0;

        const stack = [[root, 1]];
        let max = 0;

        while (stack.length > 0) {
            const [node, depth] = stack.pop();

            max = Math.max(max, depth);

            if (node.left) stack.push([node.left, depth + 1]);
            if (node.right) stack.push([node.right, depth + 1]);
        }

        return max;
    }
}

// Solution 3: BFS approach (using queue)
class SolutionBFS {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        if (!root) return 0;

        const stack = new Deque();
        stack.pushBack([root, 1]); // [node, depth]

        let max = 0;

        while (!stack.isEmpty()) {
            const [node, depth] = stack.popBack();

            max = Math.max(max, depth);

            const { left, right } = node;

            // push children (right first so left is processed first, if you care)
            if (right) stack.pushBack([right, depth + 1]);
            if (left) stack.pushBack([left, depth + 1]);
        }

        return max;
    }
}

/**
 * Time Complexity: O(n) where n is the number of nodes in the tree.
 * Space Complexity: O(h) where h is the height of the tree
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(h)'
};

/**
 * Iterative DFS Complexity:
 * Time Complexity: O(n) where n is the number of nodes in the tree.
 * Space Complexity: O(n)
 */
const SOLUTION_ITERATIVE_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

/**
 * BFS Complexity:
 * Time Complexity: O(n) where n is the number of nodes in the tree.
 * Space Complexity: O(n) - depends on maximum width of tree
 */
const SOLUTION_BFS_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Solution,
        SolutionIterative,
        SolutionBFS,
        TreeNode,
        SOLUTION_COMPLEXITY,
        SOLUTION_ITERATIVE_COMPLEXITY,
        SOLUTION_BFS_COMPLEXITY
    };
}
