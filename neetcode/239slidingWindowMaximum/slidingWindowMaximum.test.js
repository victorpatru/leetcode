// Import the solution
const { Solution, SOLUTION_COMPLEXITY } = require('./slidingWindowMaximum.template.js');

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

// Test helper function
function runTest(testName, nums, k, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.maxSlidingWindow(nums, k);
        passed = arraysEqual(result, expected);

        if (!passed) {
            error = {
                Input: { nums: nums, k: k },
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: { nums: nums, k: k },
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

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Run all tests
async function main() {
    const solution = new Solution();
    const testResults = [];

    // Test 1: Example from problem description
    testResults.push(runTest(
        'Test 1: nums=[1,2,1,0,4,2,6], k=3',
        [1, 2, 1, 0, 4, 2, 6],
        3,
        [2, 2, 4, 4, 6],
        solution
    ));

    // Test 2: Single element window
    testResults.push(runTest(
        'Test 2: k=1 (each element is max)',
        [1, 3, 5, 2, 4],
        1,
        [1, 3, 5, 2, 4],
        solution
    ));

    // Test 3: Window size equals array length
    testResults.push(runTest(
        'Test 3: k equals array length',
        [1, 3, -1, -3, 5, 3, 6, 7],
        8,
        [7],
        solution
    ));

    // Test 4: Increasing array
    testResults.push(runTest(
        'Test 4: increasing array',
        [1, 2, 3, 4, 5],
        3,
        [3, 4, 5],
        solution
    ));

    // Test 5: Decreasing array
    testResults.push(runTest(
        'Test 5: decreasing array',
        [5, 4, 3, 2, 1],
        3,
        [5, 4, 3],
        solution
    ));

    // Test 6: All same elements
    testResults.push(runTest(
        'Test 6: all same elements',
        [7, 7, 7, 7, 7],
        2,
        [7, 7, 7, 7],
        solution
    ));

    // Test 7: Negative numbers
    testResults.push(runTest(
        'Test 7: negative numbers',
        [-1, -3, -5, -2, -4],
        2,
        [-1, -3, -2, -2],
        solution
    ));

    // Test 8: Mix of positive and negative
    testResults.push(runTest(
        'Test 8: mix of positive and negative',
        [1, -1, 3, -3, 5, -5],
        3,
        [3, 3, 5, 5],
        solution
    ));

    // Test 9: Single element array
    testResults.push(runTest(
        'Test 9: single element array',
        [5],
        1,
        [5],
        solution
    ));

    // Test 10: Two elements
    testResults.push(runTest(
        'Test 10: two elements, k=2',
        [1, 3],
        2,
        [3],
        solution
    ));

    // Test 11: Large window size
    testResults.push(runTest(
        'Test 11: larger window',
        [1, 3, -1, -3, 5, 3, 6, 7],
        3,
        [3, 3, 5, 5, 6, 7],
        solution
    ));

    // Test 12: Max at beginning of window
    testResults.push(runTest(
        'Test 12: max at beginning',
        [9, 7, 5, 3, 1],
        3,
        [9, 7, 5],
        solution
    ));

    // Test 13: Max at end of window
    testResults.push(runTest(
        'Test 13: max at end',
        [1, 3, 9, 2, 4, 10],
        3,
        [9, 9, 9, 10],
        solution
    ));

    // Test 14: Zigzag pattern
    testResults.push(runTest(
        'Test 14: zigzag pattern',
        [1, 5, 2, 6, 3, 7, 4, 8],
        4,
        [6, 6, 7, 7, 8],
        solution
    ));

    // Test 15: Large numbers
    testResults.push(runTest(
        'Test 15: large numbers',
        [10000, -10000, 10000, -10000, 10000],
        2,
        [10000, 10000, 10000, 10000],
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
        title: 'Running Sliding Window Maximum Tests',
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

