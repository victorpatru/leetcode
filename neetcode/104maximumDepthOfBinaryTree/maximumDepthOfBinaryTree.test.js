// Import the solutions
const {
    Solution,
    SolutionIterative,
    SolutionBFS,
    TreeNode,
    SOLUTION_COMPLEXITY,
    SOLUTION_ITERATIVE_COMPLEXITY,
    SOLUTION_BFS_COMPLEXITY
} = require('./maximumDepthOfBinaryTree.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)',
        space: 'O(h)'  // h is the height of the tree
    },
    solutionIterative: {
        time: 'O(n)',
        space: 'O(n)'
    },
    solutionBFS: {
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

// Test helper function
function runTest(testName, inputArr, expected, solution) {
    let result, passed;
    let error = null;

    try {
        const root = buildTree(inputArr);
        result = solution.maxDepth(root);

        passed = result === expected;

        if (!passed) {
            error = {
                Input: `root = ${JSON.stringify(inputArr)}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `root = ${JSON.stringify(inputArr)}`,
            Expected: expected,
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

// Test cases definition (shared across all solutions)
const TEST_CASES = [
    { name: 'Test 1: example 1', input: [1, 2, 3, null, null, 4], expected: 3 },
    { name: 'Test 2: example 2 - empty tree', input: [], expected: 0 },
    { name: 'Test 3: single node', input: [1], expected: 1 },
    { name: 'Test 4: two levels', input: [1, 2, 3], expected: 2 },
    { name: 'Test 5: three levels', input: [1, 2, 3, 4, 5, 6, 7], expected: 3 },
    { name: 'Test 6: left-skewed tree', input: [1, 2, null, 3], expected: 3 },
    { name: 'Test 7: right-skewed tree', input: [1, null, 2, null, 3], expected: 3 },
    { name: 'Test 8: unbalanced tree', input: [1, 2, 3, null, null, 4, 5], expected: 3 },
    { name: 'Test 9: tree with negative values', input: [-1, -2, -3], expected: 2 },
    { name: 'Test 10: tree with zero', input: [0, 1, 2], expected: 2 },
    { name: 'Test 11: maximum depth on right side', input: [1, null, 2, null, 3, null, 4], expected: 4 },
    { name: 'Test 12: maximum depth on left side', input: [1, 2, 3, 4, null, null, null, 5, null, null, null, null, null, null, null, 6], expected: 4 },
    { name: 'Test 13: deep tree (5 levels)', input: [1, 2, null, 3, null, 4, null, 5], expected: 5 }
];

// Run tests for a specific solution class
function runTestsForSolution(solutionClass, solutionName) {
    const solution = new solutionClass();
    const testResults = [];

    for (const testCase of TEST_CASES) {
        testResults.push(runTest(
            `${testCase.name} (${solutionName})`,
            testCase.input,
            testCase.expected,
            solution
        ));
    }

    return testResults;
}

// Parse command-line arguments to filter solutions
function parseSolutionFilter() {
    const args = process.argv.slice(2);
    const solutionFilter = new Set();

    for (const arg of args) {
        if (arg.startsWith('--solution=') || arg.startsWith('--only=')) {
            const solutions = arg.split('=')[1].split(',').map(s => s.trim().toLowerCase());
            solutions.forEach(s => solutionFilter.add(s));
        } else if (arg === '--recursive' || arg === '--dfs-recursive') {
            solutionFilter.add('recursive');
        } else if (arg === '--iterative' || arg === '--dfs-iterative') {
            solutionFilter.add('iterative');
        } else if (arg === '--bfs') {
            solutionFilter.add('bfs');
        }
    }

    // If no filter specified, test all solutions
    return solutionFilter.size > 0 ? solutionFilter : null;
}

// Run all tests
async function main() {
    const solutionFilter = parseSolutionFilter();
    const allTestResults = [];

    // Test Solution (Recursive DFS)
    if (!solutionFilter || solutionFilter.has('recursive') || solutionFilter.has('dfs-recursive')) {
        allTestResults.push(...runTestsForSolution(Solution, 'Recursive DFS'));
    }

    // Test SolutionIterative (Iterative DFS) if available
    if (SolutionIterative && (!solutionFilter || solutionFilter.has('iterative') || solutionFilter.has('dfs-iterative'))) {
        allTestResults.push(...runTestsForSolution(SolutionIterative, 'Iterative DFS'));
    }

    // Test SolutionBFS (BFS) if available
    if (SolutionBFS && (!solutionFilter || solutionFilter.has('bfs'))) {
        allTestResults.push(...runTestsForSolution(SolutionBFS, 'BFS'));
    }

    // Big O Complexity Validation
    const complexityValidations = [];

    // Validate Solution (Recursive DFS) complexity
    if (!solutionFilter || solutionFilter.has('recursive') || solutionFilter.has('dfs-recursive')) {
        complexityValidations.push(validateComplexityResult(
            'Solution (Recursive DFS)',
            SOLUTION_COMPLEXITY.time,
            CORRECT_COMPLEXITY.solution.time,
            'Time'
        ));

        complexityValidations.push(validateComplexityResult(
            'Solution (Recursive DFS)',
            SOLUTION_COMPLEXITY.space,
            CORRECT_COMPLEXITY.solution.space,
            'Space'
        ));
    }

    // Validate SolutionIterative complexity
    if (!solutionFilter || solutionFilter.has('iterative') || solutionFilter.has('dfs-iterative')) {
        complexityValidations.push(validateComplexityResult(
            'Solution (Iterative DFS)',
            SOLUTION_ITERATIVE_COMPLEXITY.time,
            CORRECT_COMPLEXITY.solutionIterative.time,
            'Time'
        ));

        complexityValidations.push(validateComplexityResult(
            'Solution (Iterative DFS)',
            SOLUTION_ITERATIVE_COMPLEXITY.space,
            CORRECT_COMPLEXITY.solutionIterative.space,
            'Space'
        ));
    }

    // Validate SolutionBFS complexity
    if (!solutionFilter || solutionFilter.has('bfs')) {
        complexityValidations.push(validateComplexityResult(
            'Solution (BFS)',
            SOLUTION_BFS_COMPLEXITY.time,
            CORRECT_COMPLEXITY.solutionBFS.time,
            'Time'
        ));

        complexityValidations.push(validateComplexityResult(
            'Solution (BFS)',
            SOLUTION_BFS_COMPLEXITY.space,
            CORRECT_COMPLEXITY.solutionBFS.space,
            'Space'
        ));
    }

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Determine subtitle based on filter
    const solutionNames = [];
    if (!solutionFilter || solutionFilter.has('recursive') || solutionFilter.has('dfs-recursive')) {
        solutionNames.push('Recursive DFS');
    }
    if (!solutionFilter || solutionFilter.has('iterative') || solutionFilter.has('dfs-iterative')) {
        solutionNames.push('Iterative DFS');
    }
    if (!solutionFilter || solutionFilter.has('bfs')) {
        solutionNames.push('BFS');
    }
    const subtitle = solutionNames.length > 0 ? `Testing ${solutionNames.join(', ')}` : 'No solutions selected';

    // Render results with Ink
    await renderTestResults({
        title: 'Running Maximum Depth of Binary Tree Tests',
        subtitle: subtitle,
        tests: allTestResults,
        complexity: {
            validations: complexityValidations,
            passed: complexityPassed,
            total: complexityTotal
        }
    });

    // Exit with appropriate code
    const failed = allTestResults.filter(t => !t.passed).length;
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
