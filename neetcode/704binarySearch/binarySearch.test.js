// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./binarySearch.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(logn)',
        space: 'O(1)'
    }
};

// Test helper function
function runTest(testName, nums, target, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.search(nums, target);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `nums = ${JSON.stringify(nums)}, target = ${target}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `nums = ${JSON.stringify(nums)}, target = ${target}`,
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
        'Test 1: example 1 (target exists)',
        [-1, 0, 2, 4, 6, 8],
        4,
        3,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 (target does not exist)',
        [-1, 0, 2, 4, 6, 8],
        3,
        -1,
        solution
    ));

    // Test 3: Single element array, target exists
    testResults.push(runTest(
        'Test 3: single element array (target exists)',
        [5],
        5,
        0,
        solution
    ));

    // Test 4: Single element array, target does not exist
    testResults.push(runTest(
        'Test 4: single element array (target does not exist)',
        [5],
        3,
        -1,
        solution
    ));

    // Test 5: Target is first element
    testResults.push(runTest(
        'Test 5: target is first element',
        [1, 2, 3, 4, 5],
        1,
        0,
        solution
    ));

    // Test 6: Target is last element
    testResults.push(runTest(
        'Test 6: target is last element',
        [1, 2, 3, 4, 5],
        5,
        4,
        solution
    ));

    // Test 7: Target is middle element
    testResults.push(runTest(
        'Test 7: target is middle element',
        [1, 2, 3, 4, 5],
        3,
        2,
        solution
    ));

    // Test 8: Target less than all elements
    testResults.push(runTest(
        'Test 8: target less than all elements',
        [10, 20, 30, 40, 50],
        5,
        -1,
        solution
    ));

    // Test 9: Target greater than all elements
    testResults.push(runTest(
        'Test 9: target greater than all elements',
        [10, 20, 30, 40, 50],
        100,
        -1,
        solution
    ));

    // Test 10: Two element array, target is first
    testResults.push(runTest(
        'Test 10: two element array (target is first)',
        [1, 3],
        1,
        0,
        solution
    ));

    // Test 11: Two element array, target is second
    testResults.push(runTest(
        'Test 11: two element array (target is second)',
        [1, 3],
        3,
        1,
        solution
    ));

    // Test 12: Two element array, target does not exist
    testResults.push(runTest(
        'Test 12: two element array (target does not exist)',
        [1, 3],
        2,
        -1,
        solution
    ));

    // Test 13: Large array with negative numbers
    testResults.push(runTest(
        'Test 13: large array with negative numbers',
        [-1000, -500, -100, -50, -10, 0, 10, 50, 100, 500, 1000],
        50,
        7,
        solution
    ));

    // Test 14: Target between elements
    testResults.push(runTest(
        'Test 14: target between elements',
        [1, 3, 5, 7, 9],
        6,
        -1,
        solution
    ));

    // Test 15: Large array, target exists
    testResults.push(runTest(
        'Test 15: large array (target exists)',
        Array.from({ length: 1000 }, (_, i) => i * 2),
        500,
        250,
        solution
    ));

    // Test 16: Large array, target does not exist
    testResults.push(runTest(
        'Test 16: large array (target does not exist)',
        Array.from({ length: 1000 }, (_, i) => i * 2),
        501,
        -1,
        solution
    ));

    // Test 17: All negative numbers
    testResults.push(runTest(
        'Test 17: all negative numbers',
        [-50, -40, -30, -20, -10],
        -30,
        2,
        solution
    ));

    // Test 18: Maximum constraint test
    testResults.push(runTest(
        'Test 18: boundary values',
        [-9999, -5000, 0, 5000, 9999],
        9999,
        4,
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
        title: 'Running Binary Search Tests',
        subtitle: 'Testing Solution (binary search algorithm)',
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


