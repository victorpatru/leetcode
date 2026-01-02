// Import the solutions
const { Solution, TreeNode, SOLUTION_COMPLEXITY } = require('./invertBinaryTree.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)',
        space: 'O(n)'
    }
};

// Helper function to build a binary tree from level-order array representation
function buildTree(arr) {
    if (!arr || arr.length === 0) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();

        // Left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;

        // Right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }

    return root;
}

// Helper function to convert binary tree to level-order array representation
function treeToArray(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let levelHasValue = false;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node) {
                result.push(node.val);
                queue.push(node.left || null);
                queue.push(node.right || null);
                if (node.left || node.right) {
                    levelHasValue = true;
                }
            } else {
                result.push(null);
                // Don't add children for null nodes
            }
        }

        // Stop if this level had no actual nodes (all were null)
        if (!levelHasValue) {
            break;
        }
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}

// Test helper function
function runTest(testName, inputArr, expectedArr, solution) {
    let result, passed;
    let error = null;

    try {
        const root = buildTree(inputArr);
        const invertedRoot = solution.invertTree(root);
        result = treeToArray(invertedRoot);

        passed = JSON.stringify(result) === JSON.stringify(expectedArr);

        if (!passed) {
            error = {
                Input: `root = ${JSON.stringify(inputArr)}`,
                Expected: JSON.stringify(expectedArr),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `root = ${JSON.stringify(inputArr)}`,
            Expected: JSON.stringify(expectedArr),
            Error: e.message,
            Stack: e.stack
        };
    }

    return {
        name: testName,
        passed,
        error
    };
}

// Run all tests
async function main() {
    const solution = new Solution();
    const testResults = [];

    // Test 1: Example 1 from problem description
    testResults.push(runTest(
        'Test 1: example 1',
        [1, 2, 3, 4, 5, 6, 7],
        [1, 3, 2, 7, 6, 5, 4],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [3, 2, 1],
        [3, 1, 2],
        solution
    ));

    // Test 3: Example 3 from problem description - empty tree
    testResults.push(runTest(
        'Test 3: example 3 - empty tree',
        [],
        [],
        solution
    ));

    // Test 4: Single node
    testResults.push(runTest(
        'Test 4: single node',
        [1],
        [1],
        solution
    ));

    // Test 5: Two nodes
    testResults.push(runTest(
        'Test 5: two nodes',
        [1, 2],
        [1, null, 2],
        solution
    ));

    // Test 6: Left-skewed tree
    testResults.push(runTest(
        'Test 6: left-skewed tree',
        [1, 2, null, 3],
        [1, null, 2, null, 3],
        solution
    ));

    // Test 7: Right-skewed tree
    testResults.push(runTest(
        'Test 7: right-skewed tree',
        [1, null, 2, null, 3],
        [1, 2, null, 3],
        solution
    ));

    // Test 8: Tree with negative values
    testResults.push(runTest(
        'Test 8: tree with negative values',
        [-1, -2, -3],
        [-1, -3, -2],
        solution
    ));

    // Test 9: Tree with zero
    testResults.push(runTest(
        'Test 9: tree with zero',
        [0, 1, 2],
        [0, 2, 1],
        solution
    ));

    // Test 10: Larger tree
    testResults.push(runTest(
        'Test 10: larger tree',
        [4, 2, 7, 1, 3, 6, 9],
        [4, 7, 2, 9, 6, 3, 1],
        solution
    ));

    // Test 11: Tree with missing nodes
    testResults.push(runTest(
        'Test 11: tree with missing nodes',
        [1, 2, 3, null, 4, null, 5],
        [1, 3, 2, 5, null, 4],
        solution
    ));

    // Test 12: Inverting twice should return original (not tested directly, but verifies correctness)
    // This is implicitly tested by the other tests

    // Big O Complexity Validation
    const complexityValidations = [];

    complexityValidations.push(validateComplexityResult(
        'Solution',
        SOLUTION_COMPLEXITY.time,
        CORRECT_COMPLEXITY.solution.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'Solution',
        SOLUTION_COMPLEXITY.space,
        CORRECT_COMPLEXITY.solution.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running Invert Binary Tree Tests',
        subtitle: 'Testing Solution (recursive DFS approach)',
        tests: testResults,
        complexity: {
            validations: complexityValidations,
            passed: complexityPassed,
            total: complexityTotal
        }
    });

    // Exit with appropriate code
    const failed = testResults.filter(t => !t.passed).length;
    const allTestsPassed = failed === 0;
    const allComplexityCorrect = complexityPassed === complexityTotal;

    if (allTestsPassed && allComplexityCorrect) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

// Run the tests
main().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
