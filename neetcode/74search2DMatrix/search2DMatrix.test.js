// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./search2DMatrix.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(log(m*n))', // Binary search on rows then columns
        space: 'O(1)'  // constant extra space
    }
};

// Test helper function
function runTest(testName, matrix, target, expected, solution) {
    let passed;
    let error = null;

    try {
        const result = solution.searchMatrix(matrix, target);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `matrix = ${JSON.stringify(matrix)}, target = ${target}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `matrix = ${JSON.stringify(matrix)}, target = ${target}`,
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
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        10,
        true,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        15,
        false,
        solution
    ));

    // Test 3: Target in first row
    testResults.push(runTest(
        'Test 3: target in first row',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        4,
        true,
        solution
    ));

    // Test 4: Target in last row
    testResults.push(runTest(
        'Test 4: target in last row',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        30,
        true,
        solution
    ));

    // Test 5: Target smaller than all elements
    testResults.push(runTest(
        'Test 5: target smaller than all elements',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        0,
        false,
        solution
    ));

    // Test 6: Target larger than all elements
    testResults.push(runTest(
        'Test 6: target larger than all elements',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        50,
        false,
        solution
    ));

    // Test 7: Single row matrix
    testResults.push(runTest(
        'Test 7: single row matrix',
        [[1, 3, 5, 7]],
        3,
        true,
        solution
    ));

    // Test 8: Single column matrix
    testResults.push(runTest(
        'Test 8: single column matrix',
        [[1], [3], [5], [7]],
        5,
        true,
        solution
    ));

    // Test 9: Single element matrix - target found
    testResults.push(runTest(
        'Test 9: single element matrix - target found',
        [[5]],
        5,
        true,
        solution
    ));

    // Test 10: Single element matrix - target not found
    testResults.push(runTest(
        'Test 10: single element matrix - target not found',
        [[5]],
        3,
        false,
        solution
    ));

    // Test 11: Target at first position
    testResults.push(runTest(
        'Test 11: target at first position',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        1,
        true,
        solution
    ));

    // Test 12: Target at last position
    testResults.push(runTest(
        'Test 12: target at last position',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        40,
        true,
        solution
    ));

    // Test 13: Target between rows
    testResults.push(runTest(
        'Test 13: target between rows',
        [[1, 2, 4, 8], [10, 11, 12, 13], [14, 20, 30, 40]],
        9,
        false,
        solution
    ));

    // Test 14: Minimum constraints (1x1 matrix)
    testResults.push(runTest(
        'Test 14: minimum constraints (1x1 matrix)',
        [[1]],
        1,
        true,
        solution
    ));

    // Test 15: Maximum constraints (100x100 matrix) - target found
    const maxMatrix = [];
    for (let i = 0; i < 100; i++) {
        const row = [];
        for (let j = 0; j < 100; j++) {
            row.push(i * 100 + j);
        }
        maxMatrix.push(row);
    }
    testResults.push(runTest(
        'Test 15: maximum constraints (100x100 matrix) - target found',
        maxMatrix,
        5000,
        true,
        solution
    ));

    // Test 16: Maximum constraints (100x100 matrix) - target not found
    testResults.push(runTest(
        'Test 16: maximum constraints (100x100 matrix) - target not found',
        maxMatrix,
        10000,
        false,
        solution
    ));

    // Test 17: Negative numbers
    testResults.push(runTest(
        'Test 17: negative numbers',
        [[-10, -5, 0, 5], [-1, 1, 2, 3], [4, 5, 6, 7]],
        -5,
        true,
        solution
    ));

    // Test 18: Negative target not found
    testResults.push(runTest(
        'Test 18: negative target not found',
        [[-10, -5, 0, 5], [-1, 1, 2, 3], [4, 5, 6, 7]],
        -15,
        false,
        solution
    ));

    // Test 19: Minimum value constraint
    testResults.push(runTest(
        'Test 19: minimum value constraint',
        [[-10000, -9999, -9998], [-9997, -9996, -9995]],
        -10000,
        true,
        solution
    ));

    // Test 20: Maximum value constraint
    testResults.push(runTest(
        'Test 20: maximum value constraint',
        [[9997, 9998, 9999], [10000]],
        10000,
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
        title: 'Running Search a 2D Matrix Tests',
        subtitle: 'Testing Solution (binary search on rows then columns)',
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
