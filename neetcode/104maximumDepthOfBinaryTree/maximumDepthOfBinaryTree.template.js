/**
 * Maximum Depth of Binary Tree
 *
 * Given the root of a binary tree, return its depth.
 *
 * The depth of a binary tree is defined as the number of nodes along the longest path
 * from the root node down to the farthest leaf node.
 *
 * @example
 * // Example 1:
 * // Input: root = [1,2,3,null,null,4]
 * // Output: 3
 * //
 * //     1
 * //   /   \
 * //  2     3
 * //         \
 * //          4
 * // Depth: 3 (path: 1 -> 3 -> 4)
 *
 * @example
 * // Example 2:
 * // Input: root = []
 * // Output: 0
 *
 * @constraints
 * - 0 <= The number of nodes in the tree <= 100
 * - -100 <= Node.val <= 100
 * 
 */

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
        // TODO: Implement
    }
}

/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_COMPLEXITY = {
    time: '',
    space: ''
};

// Solution 2: Iterative
class SolutionIterative {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        // TODO: implement
    }
}

/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_ITERATIVE_COMPLEXITY = {
    time: '',
    space: ''
};

// Solution 3: BFS 
class SolutionBFS {
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    maxDepth(root) {
        // TODO: implement
    }
}

/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_BFS_COMPLEXITY = {
    time: '',
    space: ''
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
