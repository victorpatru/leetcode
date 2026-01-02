/**
 * Invert Binary Tree
 *
 * You are given the root of a binary tree root. Invert the binary tree and return its root.
 *
 * @example
 * // Example 1:
 * // Input: root = [1,2,3,4,5,6,7]
 * // Output: [1,3,2,7,6,5,4]
 * //
 * //     1               1
 * //   /   \    ->     /   \
 * //  2     3         3     2
 * // / \   / \      / \   / \
 * //4  5  6   7    7  6  5   4
 *
 * @example
 * // Example 2:
 * // Input: root = [3,2,1]
 * // Output: [3,1,2]
 * //
 * //   3         3
 * //  / \   ->  / \
 * // 2   1     1   2
 *
 * @example
 * // Example 3:
 * // Input: root = []
 * // Output: []
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

class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        // TODO: implement
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
    module.exports = { Solution, TreeNode, SOLUTION_COMPLEXITY };
}
