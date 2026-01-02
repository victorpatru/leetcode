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
        if (root === null) {
            return 0;
        }

        return (
            1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right))
        );
    }
}

// Solution 2: Iterative DFS approach (using stack)
class SolutionIterative {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        const stack = [[root, 1]];
        let res = 0;

        while (stack.length > 0) {
            const current = stack.pop();
            const node = current[0];
            const depth = current[1];

            if (node !== null) {
                res = Math.max(res, depth);
                stack.push([node.left, depth + 1]);
                stack.push([node.right, depth + 1]);
            }
        }
        return res;
    }
}

// Solution 3: BFS approach (using queue)
class SolutionBFS {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        const q = [];
        if (root !== null) {
            q.push(root);
        }

        let level = 0;
        while (q.length > 0) {
            const size = q.length;
            for (let i = 0; i < size; i++) {
                const node = q.shift();
                if (node.left !== null) {
                    q.push(node.left);
                }
                if (node.right !== null) {
                    q.push(node.right);
                }
            }
            level++;
        }
        return level;
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
