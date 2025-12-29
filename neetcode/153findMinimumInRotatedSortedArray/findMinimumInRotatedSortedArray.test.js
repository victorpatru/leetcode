// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./findMinimumInRotatedSortedArray.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(logn)', // Binary search eliminates half the search space each iteration
        space: 'O(1)'  // constant extra space
    }
};

// Test helper function
function runTest(testName, nums, expected, solution) {
    let passed;
    let error = null;

    try {
        const result = solution.findMin(nums);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `nums = ${JSON.stringify(nums)}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `nums = ${JSON.stringify(nums)}`,
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
        [3, 4, 5, 6, 1, 2],
        1,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [4, 5, 0, 1, 2, 3],
        0,
        solution
    ));

    // Test 3: Example 3 from problem description
    testResults.push(runTest(
        'Test 3: example 3',
        [4, 5, 6, 7],
        4,
        solution
    ));

    // Test 4: Single element
    testResults.push(runTest(
        'Test 4: single element',
        [1],
        1,
        solution
    ));

    // Test 5: Two elements - rotated
    testResults.push(runTest(
        'Test 5: two elements rotated',
        [2, 1],
        1,
        solution
    ));

    // Test 6: Two elements - not rotated
    testResults.push(runTest(
        'Test 6: two elements not rotated',
        [1, 2],
        1,
        solution
    ));

    // Test 7: Minimum at beginning after rotation
    testResults.push(runTest(
        'Test 7: minimum at beginning after rotation',
        [1, 2, 3, 4, 5],
        1,
        solution
    ));

    // Test 8: Minimum at end
    testResults.push(runTest(
        'Test 8: minimum at end',
        [2, 3, 4, 5, 1],
        1,
        solution
    ));

    // Test 9: Minimum in middle
    testResults.push(runTest(
        'Test 9: minimum in middle',
        [5, 6, 1, 2, 3, 4],
        1,
        solution
    ));

    // Test 10: Negative numbers
    testResults.push(runTest(
        'Test 10: negative numbers',
        [3, 4, 5, 1, 2],
        1,
        solution
    ));

    // Test 11: All negative numbers
    testResults.push(runTest(
        'Test 11: all negative numbers',
        [-2, -1, -5, -4, -3],
        -5,
        solution
    ));

    // Test 12: Mixed positive and negative
    testResults.push(runTest(
        'Test 12: mixed positive and negative',
        [4, 5, 6, 7, 0, 1, 2],
        0,
        solution
    ));

    // Test 13: Large rotation
    testResults.push(runTest(
        'Test 13: large rotation',
        [11, 13, 15, 17],
        11,
        solution
    ));

    // Test 14: Minimum constraint value
    testResults.push(runTest(
        'Test 14: minimum constraint value',
        [-1000],
        -1000,
        solution
    ));

    // Test 15: Maximum constraint value
    testResults.push(runTest(
        'Test 15: maximum constraint value',
        [1000],
        1000,
        solution
    ));

    // Test 16: Rotated with minimum at index 0
    testResults.push(runTest(
        'Test 16: rotated with minimum at index 0',
        [1, 2, 3, 4, 5, 6],
        1,
        solution
    ));

    // Test 17: Rotated exactly once
    testResults.push(runTest(
        'Test 17: rotated exactly once',
        [6, 1, 2, 3, 4, 5],
        1,
        solution
    ));

    // Test 18: Three elements rotated
    testResults.push(runTest(
        'Test 18: three elements rotated',
        [2, 3, 1],
        1,
        solution
    ));

    // Test 19: Three elements not rotated
    testResults.push(runTest(
        'Test 19: three elements not rotated',
        [1, 2, 3],
        1,
        solution
    ));

    // Test 20: Large array
    const largeArray = [];
    for (let i = 500; i <= 1000; i++) largeArray.push(i);
    for (let i = 1; i < 500; i++) largeArray.push(i);
    testResults.push(runTest(
        'Test 20: large array',
        largeArray,
        1,
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
        title: 'Running Find Minimum in Rotated Sorted Array Tests',
        subtitle: 'Testing Solution (binary search)',
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
