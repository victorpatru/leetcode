// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./evalRPN.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // n = length of tokens array
        space: 'O(n)'  // stack can grow up to n elements
    }
};

// Test helper function
function runTest(testName, tokens, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.evalRPN(tokens);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `tokens = ${JSON.stringify(tokens)}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `tokens = ${JSON.stringify(tokens)}`,
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
        ["1", "2", "+", "3", "*", "4", "-"],
        5,
        solution
    ));

    // Test 2: Simple addition
    testResults.push(runTest(
        'Test 2: simple addition',
        ["2", "3", "+"],
        5,
        solution
    ));

    // Test 3: Simple subtraction
    testResults.push(runTest(
        'Test 3: simple subtraction',
        ["10", "3", "-"],
        7,
        solution
    ));

    // Test 4: Simple multiplication
    testResults.push(runTest(
        'Test 4: simple multiplication',
        ["4", "5", "*"],
        20,
        solution
    ));

    // Test 5: Simple division
    testResults.push(runTest(
        'Test 5: simple division',
        ["10", "3", "/"],
        3,
        solution
    ));

    // Test 6: Division truncates toward zero
    testResults.push(runTest(
        'Test 6: division truncates toward zero (negative)',
        ["-10", "3", "/"],
        -3,
        solution
    ));

    // Test 7: Multiple operations
    testResults.push(runTest(
        'Test 7: multiple operations',
        ["4", "13", "5", "/", "+"],
        6,
        solution
    ));

    // Test 8: Complex expression
    testResults.push(runTest(
        'Test 8: complex expression',
        ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
        22,
        solution
    ));

    // Test 9: Single number
    testResults.push(runTest(
        'Test 9: single number',
        ["42"],
        42,
        solution
    ));

    // Test 10: Negative numbers
    testResults.push(runTest(
        'Test 10: negative numbers',
        ["-2", "-3", "+"],
        -5,
        solution
    ));

    // Test 11: Minimum constraints
    testResults.push(runTest(
        'Test 11: minimum constraints',
        ["1", "2", "+"],
        3,
        solution
    ));

    // Test 12: Division with zero result
    testResults.push(runTest(
        'Test 12: division with zero result',
        ["0", "5", "/"],
        0,
        solution
    ));

    // Test 13: Large numbers
    testResults.push(runTest(
        'Test 13: large numbers',
        ["100", "100", "*"],
        10000,
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
        title: 'Running Evaluate Reverse Polish Notation Tests',
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

