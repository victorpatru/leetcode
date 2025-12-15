// Import the solutions
const { Solution, ListNode, SOLUTION_COMPLEXITY } = require('./mergeKSortedLists.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(nlog(k))', // n = total nodes, k = number of lists
        space: 'O(k)'  // space for mergedLists array
    }
};

// Helper function to create a linked list from an array
function arrayToList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

// Helper function to convert a linked list to an array
function listToArray(head) {
    const arr = [];
    let curr = head;
    while (curr) {
        arr.push(curr.val);
        curr = curr.next;
    }
    return arr;
}

// Test helper function
function runTest(testName, inputArrays, expectedArray, solution) {
    let passed;
    let error = null;

    try {
        // Convert each array to a linked list
        const lists = inputArrays.map(arr => arrayToList(arr));
        const result = solution.mergeKLists(lists);
        const resultArr = listToArray(result);
        passed = JSON.stringify(resultArr) === JSON.stringify(expectedArray);

        if (!passed) {
            error = {
                Input: `lists = ${JSON.stringify(inputArrays)}`,
                Expected: JSON.stringify(expectedArray),
                Got: JSON.stringify(resultArr)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `lists = ${JSON.stringify(inputArrays)}`,
            Expected: JSON.stringify(expectedArray),
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
        [[1, 2, 4], [1, 3, 5], [3, 6]],
        [1, 1, 2, 3, 3, 4, 5, 6],
        solution
    ));

    // Test 2: Example 2 - empty array
    testResults.push(runTest(
        'Test 2: empty array',
        [],
        [],
        solution
    ));

    // Test 3: Example 3 - array with empty list
    testResults.push(runTest(
        'Test 3: array with empty list',
        [[]],
        [],
        solution
    ));

    // Test 4: Single list
    testResults.push(runTest(
        'Test 4: single list',
        [[1, 2, 3, 4]],
        [1, 2, 3, 4],
        solution
    ));

    // Test 5: Two lists of equal length
    testResults.push(runTest(
        'Test 5: two lists of equal length',
        [[1, 3, 5], [2, 4, 6]],
        [1, 2, 3, 4, 5, 6],
        solution
    ));

    // Test 6: Two lists of different lengths
    testResults.push(runTest(
        'Test 6: two lists of different lengths',
        [[1, 2, 3], [4, 5, 6, 7, 8]],
        [1, 2, 3, 4, 5, 6, 7, 8],
        solution
    ));

    // Test 7: Lists with negative numbers
    testResults.push(runTest(
        'Test 7: lists with negative numbers',
        [[-2, -1, 0], [-3, 1, 2]],
        [-3, -2, -1, 0, 1, 2],
        solution
    ));

    // Test 8: Lists with duplicate values
    testResults.push(runTest(
        'Test 8: lists with duplicate values',
        [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        solution
    ));

    // Test 9: Mix of empty and non-empty lists
    testResults.push(runTest(
        'Test 9: mix of empty and non-empty lists',
        [[], [1, 2], [], [3, 4], []],
        [1, 2, 3, 4],
        solution
    ));

    // Test 10: Single node lists
    testResults.push(runTest(
        'Test 10: single node lists',
        [[5], [3], [1], [4], [2]],
        [1, 2, 3, 4, 5],
        solution
    ));

    // Test 11: Lists in reverse order
    testResults.push(runTest(
        'Test 11: lists in reverse order',
        [[10, 20, 30], [5, 15, 25], [1, 2, 3]],
        [1, 2, 3, 5, 10, 15, 20, 25, 30],
        solution
    ));

    // Test 12: Minimum and maximum constraints
    testResults.push(runTest(
        'Test 12: minimum and maximum values',
        [[-1000, 0, 1000], [-500, 500]],
        [-1000, -500, 0, 500, 1000],
        solution
    ));

    // Test 13: Large number of lists (k lists)
    testResults.push(runTest(
        'Test 13: many lists',
        [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        solution
    ));

    // Test 14: Lists with varying lengths
    testResults.push(runTest(
        'Test 14: varying list lengths',
        [[1, 4, 5], [1, 3, 4], [2, 6]],
        [1, 1, 2, 3, 4, 4, 5, 6],
        solution
    ));

    // Test 15: One empty list with one non-empty list
    testResults.push(runTest(
        'Test 15: one empty and one non-empty list',
        [[], [1, 2, 3]],
        [1, 2, 3],
        solution
    ));

    // Test 16: Large lists
    const largeList1 = Array.from({ length: 100 }, (_, i) => i * 2);
    const largeList2 = Array.from({ length: 100 }, (_, i) => i * 2 + 1);
    const mergedLarge = Array.from({ length: 200 }, (_, i) => i);
    testResults.push(runTest(
        'Test 16: large lists',
        [largeList1, largeList2],
        mergedLarge,
        solution
    ));

    // Test 17: All null lists
    testResults.push(runTest(
        'Test 17: all empty lists',
        [[], [], []],
        [],
        solution
    ));

    // Test 18: Non-overlapping ranges
    testResults.push(runTest(
        'Test 18: non-overlapping ranges',
        [[1, 2, 3], [10, 20, 30], [100, 200, 300]],
        [1, 2, 3, 10, 20, 30, 100, 200, 300],
        solution
    ));

    // Test 19: Interleaved values
    testResults.push(runTest(
        'Test 19: interleaved values',
        [[1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12]],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        solution
    ));

    // Test 20: Two lists where one is subset range of other
    testResults.push(runTest(
        'Test 20: subset ranges',
        [[1, 10, 20], [2, 3, 4, 5, 6, 7, 8, 9]],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20],
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
        title: 'Running Merge K Sorted Lists Tests',
        subtitle: 'Testing Solution (divide-and-conquer merge pairs approach)',
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

