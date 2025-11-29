// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./dailyTemperatures.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // n = length of temperatures array
        space: 'O(n)'  // stack can grow up to n elements
    }
};

// Test helper function
function runTest(testName, temperatures, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.dailyTemperatures(temperatures);
        passed = JSON.stringify(result) === JSON.stringify(expected);

        if (!passed) {
            error = {
                Input: `temperatures = ${JSON.stringify(temperatures)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `temperatures = ${JSON.stringify(temperatures)}`,
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
        'Test 1: example 1',
        [30, 38, 30, 36, 35, 40, 28],
        [1, 4, 1, 2, 1, 0, 0],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - decreasing temperatures',
        [22, 21, 20],
        [0, 0, 0],
        solution
    ));

    // Test 3: Single element
    testResults.push(runTest(
        'Test 3: single element',
        [30],
        [0],
        solution
    ));

    // Test 4: Two elements - increasing
    testResults.push(runTest(
        'Test 4: two elements - increasing',
        [30, 40],
        [1, 0],
        solution
    ));

    // Test 5: Two elements - decreasing
    testResults.push(runTest(
        'Test 5: two elements - decreasing',
        [40, 30],
        [0, 0],
        solution
    ));

    // Test 6: All same temperature
    testResults.push(runTest(
        'Test 6: all same temperature',
        [30, 30, 30, 30],
        [0, 0, 0, 0],
        solution
    ));

    // Test 7: Increasing temperatures
    testResults.push(runTest(
        'Test 7: increasing temperatures',
        [30, 31, 32, 33, 34],
        [1, 1, 1, 1, 0],
        solution
    ));

    // Test 8: Decreasing temperatures
    testResults.push(runTest(
        'Test 8: decreasing temperatures',
        [34, 33, 32, 31, 30],
        [0, 0, 0, 0, 0],
        solution
    ));

    // Test 9: Mixed pattern
    testResults.push(runTest(
        'Test 9: mixed pattern',
        [73, 74, 75, 71, 69, 72, 76, 73],
        [1, 1, 4, 2, 1, 1, 0, 0],
        solution
    ));

    // Test 10: Minimum constraints
    testResults.push(runTest(
        'Test 10: minimum constraints',
        [1, 2],
        [1, 0],
        solution
    ));

    // Test 11: Maximum temperature at end
    testResults.push(runTest(
        'Test 11: maximum temperature at end',
        [30, 25, 20, 15, 100],
        [4, 3, 2, 1, 0],
        solution
    ));

    // Test 12: Maximum temperature at start
    testResults.push(runTest(
        'Test 12: maximum temperature at start',
        [100, 30, 25, 20, 15],
        [0, 0, 0, 0, 0],
        solution
    ));

    // Test 13: Alternating pattern
    testResults.push(runTest(
        'Test 13: alternating pattern',
        [30, 40, 30, 40, 30],
        [1, 0, 1, 0, 0],
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
        title: 'Running Daily Temperatures Tests',
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

