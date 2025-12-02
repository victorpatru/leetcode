// Import the solutions
const { Solution, ListNode, SOLUTION_COMPLEXITY } = require('./linkedListCycle.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // n = number of nodes
        space: 'O(1)'  // constant extra space
    }
};

// Helper function to create a linked list from an array with optional cycle
// If cycleIndex >= 0, creates a cycle where tail points to node at cycleIndex
// If cycleIndex === -1, no cycle (tail points to null)
function arrayToListWithCycle(arr, cycleIndex) {
    if (arr.length === 0) return null;

    const nodes = [];
    const head = new ListNode(arr[0]);
    nodes.push(head);
    let curr = head;

    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
        nodes.push(curr);
    }

    // Create cycle if cycleIndex is valid
    if (cycleIndex >= 0 && cycleIndex < nodes.length) {
        curr.next = nodes[cycleIndex];
    }

    return head;
}

// Test helper function
function runTest(testName, inputArr, cycleIndex, expected, solution) {
    let result, passed;
    let error = null;

    try {
        const head = arrayToListWithCycle(inputArr, cycleIndex);
        result = solution.hasCycle(head);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `head = ${JSON.stringify(inputArr)}, index = ${cycleIndex}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `head = ${JSON.stringify(inputArr)}, index = ${cycleIndex}`,
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

// Run all tests
async function main() {
    const solution = new Solution();
    const testResults = [];

    // Test 1: Example 1 from problem description
    testResults.push(runTest(
        'Test 1: example 1',
        [1, 2, 3, 4],
        1,
        true,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [1, 2],
        -1,
        false,
        solution
    ));

    // Test 3: Single node, no cycle
    testResults.push(runTest(
        'Test 3: single node, no cycle',
        [1],
        -1,
        false,
        solution
    ));

    // Test 4: Single node with self-cycle
    testResults.push(runTest(
        'Test 4: single node with self-cycle',
        [1],
        0,
        true,
        solution
    ));

    // Test 5: Two nodes, no cycle
    testResults.push(runTest(
        'Test 5: two nodes, no cycle',
        [1, 2],
        -1,
        false,
        solution
    ));

    // Test 6: Two nodes with cycle
    testResults.push(runTest(
        'Test 6: two nodes with cycle',
        [1, 2],
        0,
        true,
        solution
    ));

    // Test 7: Cycle at head (tail points to head)
    testResults.push(runTest(
        'Test 7: cycle at head (tail points to head)',
        [1, 2, 3],
        0,
        true,
        solution
    ));

    // Test 8: Cycle at tail (self-loop)
    testResults.push(runTest(
        'Test 8: cycle at tail (self-loop)',
        [1, 2, 3],
        2,
        true,
        solution
    ));

    // Test 9: Cycle in middle
    testResults.push(runTest(
        'Test 9: cycle in middle',
        [1, 2, 3, 4, 5],
        2,
        true,
        solution
    ));

    // Test 10: Longer list, no cycle
    testResults.push(runTest(
        'Test 10: longer list, no cycle',
        [1, 2, 3, 4, 5, 6, 7, 8],
        -1,
        false,
        solution
    ));

    // Test 11: Longer list with cycle
    testResults.push(runTest(
        'Test 11: longer list with cycle',
        [1, 2, 3, 4, 5, 6, 7, 8],
        3,
        true,
        solution
    ));

    // Test 12: Minimum constraints (single node, no cycle)
    testResults.push(runTest(
        'Test 12: minimum constraints (single node, no cycle)',
        [1],
        -1,
        false,
        solution
    ));

    // Test 13: Maximum length, no cycle
    testResults.push(runTest(
        'Test 13: maximum length, no cycle',
        Array.from({ length: 1000 }, (_, i) => i),
        -1,
        false,
        solution
    ));

    // Test 14: Maximum length with cycle
    testResults.push(runTest(
        'Test 14: maximum length with cycle',
        Array.from({ length: 1000 }, (_, i) => i),
        500,
        true,
        solution
    ));

    // Test 15: Negative values, no cycle
    testResults.push(runTest(
        'Test 15: negative values, no cycle',
        [-1000, -500, 0, 500, 1000],
        -1,
        false,
        solution
    ));

    // Test 16: Negative values with cycle
    testResults.push(runTest(
        'Test 16: negative values with cycle',
        [-1000, -500, 0, 500, 1000],
        1,
        true,
        solution
    ));

    // Test 17: All same values, no cycle
    testResults.push(runTest(
        'Test 17: all same values, no cycle',
        [5, 5, 5, 5],
        -1,
        false,
        solution
    ));

    // Test 18: All same values with cycle
    testResults.push(runTest(
        'Test 18: all same values with cycle',
        [5, 5, 5, 5],
        2,
        true,
        solution
    ));

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
        title: 'Running Linked List Cycle Detection Tests',
        subtitle: 'Testing Solution (Floyd\'s cycle detection algorithm)',
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

