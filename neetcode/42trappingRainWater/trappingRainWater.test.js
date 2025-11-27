// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./trappingRainWater.solution.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // n = length of height array
        space: 'O(1)'  // constant extra space
    }
};

// Test helper function
function runTest(testName, height, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.trap(height);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `height = ${JSON.stringify(height)}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `height = ${JSON.stringify(height)}`,
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
        [0, 2, 0, 3, 1, 0, 1, 3, 2, 1],
        9,
        solution
    ));

    // Test 2: Simple case with two bars
    testResults.push(runTest(
        'Test 2: two bars - no water',
        [2, 1],
        0,
        solution
    ));

    // Test 3: Simple case with water trapped
    testResults.push(runTest(
        'Test 3: simple trap',
        [3, 0, 2],
        2,
        solution
    ));

    // Test 4: Classic example
    testResults.push(runTest(
        'Test 4: classic example',
        [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        6,
        solution
    ));

    // Test 5: No water can be trapped
    testResults.push(runTest(
        'Test 5: no water trapped - ascending',
        [1, 2, 3, 4, 5],
        0,
        solution
    ));

    // Test 6: No water can be trapped - descending
    testResults.push(runTest(
        'Test 6: no water trapped - descending',
        [5, 4, 3, 2, 1],
        0,
        solution
    ));

    // Test 7: Single bar
    testResults.push(runTest(
        'Test 7: single bar',
        [1],
        0,
        solution
    ));

    // Test 8: Empty array
    testResults.push(runTest(
        'Test 8: empty array',
        [],
        0,
        solution
    ));

    // Test 9: All same height
    testResults.push(runTest(
        'Test 9: all same height',
        [3, 3, 3, 3],
        0,
        solution
    ));

    // Test 10: Large trap
    testResults.push(runTest(
        'Test 10: large trap',
        [4, 2, 0, 3, 2, 5],
        9,
        solution
    ));

    // Test 11: Multiple peaks
    testResults.push(runTest(
        'Test 11: multiple peaks',
        [1, 0, 2, 0, 3, 0, 2, 0, 1],
        6,
        solution
    ));

    // Test 12: Edge case - two high bars
    testResults.push(runTest(
        'Test 12: two high bars',
        [5, 0, 0, 0, 5],
        15,
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
        title: 'Running Trapping Rain Water Tests',
        subtitle: 'Testing Solution (two-pointer approach)',
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

