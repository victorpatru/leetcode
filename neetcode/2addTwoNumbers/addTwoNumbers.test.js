// Import the solutions
const { ListNode, Solution, SOLUTION_COMPLEXITY } = require('./addTwoNumbers.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n + m)', // m = length of l1, n = length of l2
        space: 'O(max(m, n))'  // result list has max(m, n) + 1 nodes
    }
};

// Helper function to create a linked list from array
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;

    const dummy = new ListNode();
    let cur = dummy;

    for (const val of arr) {
        cur.next = new ListNode(val);
        cur = cur.next;
    }

    return dummy.next;
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let cur = head;

    while (cur) {
        result.push(cur.val);
        cur = cur.next;
    }

    return result;
}

// Test helper function
function runTest(testName, l1Arr, l2Arr, expected, solution) {
    let result, passed;
    let error = null;

    try {
        const l1 = createLinkedList(l1Arr);
        const l2 = createLinkedList(l2Arr);
        const resultHead = solution.addTwoNumbers(l1, l2);
        result = linkedListToArray(resultHead);

        passed = JSON.stringify(result) === JSON.stringify(expected);

        if (!passed) {
            error = {
                Input: `l1 = ${JSON.stringify(l1Arr)}, l2 = ${JSON.stringify(l2Arr)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `l1 = ${JSON.stringify(l1Arr)}, l2 = ${JSON.stringify(l2Arr)}`,
            Expected: JSON.stringify(expected),
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
        'Test 1: example 1 (321 + 654 = 975)',
        [1, 2, 3],
        [4, 5, 6],
        [5, 7, 9],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 (9 + 9 = 18)',
        [9],
        [9],
        [8, 1],
        solution
    ));

    // Test 3: Different lengths with carry
    testResults.push(runTest(
        'Test 3: different lengths with carry (99 + 1 = 100)',
        [9, 9],
        [1],
        [0, 0, 1],
        solution
    ));

    // Test 4: No carry
    testResults.push(runTest(
        'Test 4: no carry (123 + 456 = 579)',
        [3, 2, 1],
        [6, 5, 4],
        [9, 7, 5],
        solution
    ));

    // Test 5: One list longer than the other
    testResults.push(runTest(
        'Test 5: one list longer (9999 + 1 = 10000)',
        [9, 9, 9, 9],
        [1],
        [0, 0, 0, 0, 1],
        solution
    ));

    // Test 6: Both single digit, no carry
    testResults.push(runTest(
        'Test 6: both single digit, no carry (2 + 3 = 5)',
        [2],
        [3],
        [5],
        solution
    ));

    // Test 7: Adding zero
    testResults.push(runTest(
        'Test 7: adding zero (123 + 0 = 123)',
        [3, 2, 1],
        [0],
        [3, 2, 1],
        solution
    ));

    // Test 8: Both zeros
    testResults.push(runTest(
        'Test 8: both zeros (0 + 0 = 0)',
        [0],
        [0],
        [0],
        solution
    ));

    // Test 9: Multiple carries
    testResults.push(runTest(
        'Test 9: multiple carries (999 + 999 = 1998)',
        [9, 9, 9],
        [9, 9, 9],
        [8, 9, 9, 1],
        solution
    ));

    // Test 10: Large numbers
    testResults.push(runTest(
        'Test 10: large numbers (987654321 + 123456789 = 1111111110)',
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [9, 8, 7, 6, 5, 4, 3, 2, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        solution
    ));

    // Test 11: First list longer, no final carry
    testResults.push(runTest(
        'Test 11: first list longer (12345 + 67 = 12412)',
        [5, 4, 3, 2, 1],
        [7, 6],
        [2, 1, 4, 2, 1],
        solution
    ));

    // Test 12: Second list longer, no final carry
    testResults.push(runTest(
        'Test 12: second list longer (67 + 12345 = 12412)',
        [7, 6],
        [5, 4, 3, 2, 1],
        [2, 1, 4, 2, 1],
        solution
    ));

    // Test 13: Carry propagates to the end
    testResults.push(runTest(
        'Test 13: carry propagates to the end (99999 + 1 = 100000)',
        [9, 9, 9, 9, 9],
        [1],
        [0, 0, 0, 0, 0, 1],
        solution
    ));

    // Test 14: Maximum constraint length
    testResults.push(runTest(
        'Test 14: alternating digits (505 + 505 = 1010)',
        [5, 0, 5],
        [5, 0, 5],
        [0, 1, 0, 1],
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
        title: 'Running Add Two Numbers Tests',
        subtitle: 'Testing Solution (digit-by-digit addition with carry)',
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


