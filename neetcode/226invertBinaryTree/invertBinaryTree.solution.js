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

// Solution: Recursive DFS approach
class Solution {
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    invertTree(root) {
        if (!root) return null;

        const tmp = root.left
        root.left = root.right
        root.right = tmp

        this.invertTree(root.left);
        this.invertTree(root.right);

        return root;
    }
}

/**
 * Time Complexity: O(n) where n is the number of nodes in the tree.
 * Space Complexity: O(n) for the recursion stack in the worst case (skewed tree).
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, TreeNode, SOLUTION_COMPLEXITY };
}
