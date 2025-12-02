// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./largestRectangleInHistogram.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // n = length of heights array
        space: 'O(n)'  // stack can grow up to n elements
    }
};

// Test helper function
function runTest(testName, heights, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.largestRectangleArea(heights);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `heights = ${JSON.stringify(heights)}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `heights = ${JSON.stringify(heights)}`,
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
        [7, 1, 7, 2, 2, 4],
        8,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [1, 3, 7],
        7,
        solution
    ));

    // Test 3: Single bar
    testResults.push(runTest(
        'Test 3: single bar',
        [5],
        5,
        solution
    ));

    // Test 4: All bars same height
    testResults.push(runTest(
        'Test 4: all bars same height',
        [3, 3, 3, 3],
        12,
        solution
    ));

    // Test 5: Increasing heights
    testResults.push(runTest(
        'Test 5: increasing heights',
        [1, 2, 3, 4, 5],
        9,
        solution
    ));

    // Test 6: Decreasing heights
    testResults.push(runTest(
        'Test 6: decreasing heights',
        [5, 4, 3, 2, 1],
        9,
        solution
    ));

    // Test 7: Minimum constraints
    testResults.push(runTest(
        'Test 7: minimum constraints',
        [1],
        1,
        solution
    ));

    // Test 8: Zero height bars
    testResults.push(runTest(
        'Test 8: zero height bars',
        [2, 0, 2],
        2,
        solution
    ));

    // Test 9: Large rectangle in middle
    testResults.push(runTest(
        'Test 9: large rectangle in middle',
        [2, 1, 5, 6, 2, 3],
        10,
        solution
    ));

    // Test 10: Tall bar at end
    testResults.push(runTest(
        'Test 10: tall bar at end',
        [1, 2, 3, 4, 5, 6],
        12,
        solution
    ));

    // Test 11: Tall bar at start
    testResults.push(runTest(
        'Test 11: tall bar at start',
        [6, 5, 4, 3, 2, 1],
        12,
        solution
    ));

    // Test 12: Multiple peaks
    testResults.push(runTest(
        'Test 12: multiple peaks',
        [1, 3, 2, 1, 3, 2, 1],
        7,
        solution
    ));

    // Test 13: Maximum height constraint
    testResults.push(runTest(
        'Test 13: maximum height constraint',
        [1000],
        1000,
        solution
    ));

    // Test 14: Complex case
    testResults.push(runTest(
        'Test 14: complex case',
        [6, 2, 5, 4, 5, 1, 6],
        12,
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
        title: 'Running Largest Rectangle In Histogram Tests',
        subtitle: 'Testing Solution (stack approach)',
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

