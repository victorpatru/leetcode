// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./kokoEatingBananas.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(nlogm)', // Binary search on eating rates O(log m), iterate through piles O(n)
        space: 'O(1)'  // constant extra space
    }
};

// Test helper function
function runTest(testName, piles, h, expected, solution) {
    let passed;
    let error = null;

    try {
        const result = solution.minEatingSpeed(piles, h);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `piles = ${JSON.stringify(piles)}, h = ${h}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `piles = ${JSON.stringify(piles)}, h = ${h}`,
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
        [1, 4, 3, 2],
        9,
        2,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [25, 10, 23, 4],
        4,
        25,
        solution
    ));

    // Test 3: Single pile
    testResults.push(runTest(
        'Test 3: single pile',
        [10],
        5,
        2,
        solution
    ));

    // Test 4: Single pile with exact hours
    testResults.push(runTest(
        'Test 4: single pile with exact hours',
        [10],
        10,
        1,
        solution
    ));

    // Test 5: All piles equal
    testResults.push(runTest(
        'Test 5: all piles equal',
        [5, 5, 5, 5],
        4,
        5,
        solution
    ));

    // Test 6: Minimum eating rate needed
    testResults.push(runTest(
        'Test 6: minimum eating rate needed',
        [3, 6, 7, 11],
        8,
        4,
        solution
    ));

    // Test 7: Large piles, many hours
    testResults.push(runTest(
        'Test 7: large piles, many hours',
        [30, 11, 23, 4, 20],
        5,
        30,
        solution
    ));

    // Test 8: Large piles, few hours
    testResults.push(runTest(
        'Test 8: large piles, few hours',
        [30, 11, 23, 4, 20],
        6,
        23,
        solution
    ));

    // Test 9: Minimum constraints
    testResults.push(runTest(
        'Test 9: minimum constraints',
        [1],
        1,
        1,
        solution
    ));

    // Test 10: Maximum pile value
    testResults.push(runTest(
        'Test 10: maximum pile value',
        [1000000000],
        1,
        1000000000,
        solution
    ));

    // Test 11: Many piles, minimum hours
    testResults.push(runTest(
        'Test 11: many piles, minimum hours',
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        10,
        1,
        solution
    ));

    // Test 12: Many piles, more hours than piles
    testResults.push(runTest(
        'Test 12: many piles, more hours than piles',
        [10, 10, 10, 10, 10],
        20,
        3,
        solution
    ));

    // Test 13: Increasing pile sizes
    testResults.push(runTest(
        'Test 13: increasing pile sizes',
        [1, 2, 3, 4, 5],
        5,
        5,
        solution
    ));

    // Test 14: Decreasing pile sizes
    testResults.push(runTest(
        'Test 14: decreasing pile sizes',
        [5, 4, 3, 2, 1],
        5,
        5,
        solution
    ));

    // Test 15: Mixed pile sizes
    testResults.push(runTest(
        'Test 15: mixed pile sizes',
        [8, 2, 15, 3, 7],
        10,
        4,
        solution
    ));

    // Test 16: Edge case - exactly enough hours
    testResults.push(runTest(
        'Test 16: edge case - exactly enough hours',
        [3, 6, 7, 11],
        4,
        11,
        solution
    ));

    // Test 17: Edge case - many more hours than needed
    testResults.push(runTest(
        'Test 17: edge case - many more hours than needed',
        [10, 20, 30],
        100,
        1,
        solution
    ));

    // Test 18: Large number of piles
    const largePiles = Array(1000).fill(1000);
    testResults.push(runTest(
        'Test 18: large number of piles',
        largePiles,
        1000,
        1000,
        solution
    ));

    // Test 19: Large number of piles with more hours
    testResults.push(runTest(
        'Test 19: large number of piles with more hours',
        largePiles,
        2000,
        500,
        solution
    ));

    // Test 20: Very large pile values
    testResults.push(runTest(
        'Test 20: very large pile values',
        [1000000000, 500000000, 250000000],
        3,
        1000000000,
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
        title: 'Running Koko Eating Bananas Tests',
        subtitle: 'Testing Solution (binary search on eating rates)',
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
