// Import the solution
const { Solution, SOLUTION_COMPLEXITY } = require('./twoSumII.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)',
        space: 'O(1)'
    }
};

// Test helper function
function runTest(testName, numbers, target, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.twoSum(numbers, target);
        passed = JSON.stringify(result) === JSON.stringify(expected);
        
        if (!passed) {
            error = {
                Input: `numbers = ${JSON.stringify(numbers)}, target = ${target}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `numbers = ${JSON.stringify(numbers)}, target = ${target}`,
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
        'Test 1: example 1 - [1,2,3,4], target = 3',
        [1, 2, 3, 4],
        3,
        [1, 2],
        solution
    ));

    // Test 2: Simple case - first two elements
    testResults.push(runTest(
        'Test 2: first two elements',
        [2, 7, 11, 15],
        9,
        [1, 2],
        solution
    ));

    // Test 3: Last two elements
    testResults.push(runTest(
        'Test 3: last two elements',
        [2, 7, 11, 15],
        26,
        [3, 4],
        solution
    ));

    // Test 4: Middle elements
    testResults.push(runTest(
        'Test 4: middle elements',
        [2, 7, 11, 15],
        18,
        [2, 3],
        solution
    ));

    // Test 5: Negative numbers
    testResults.push(runTest(
        'Test 5: negative numbers',
        [-1, 0],
        -1,
        [1, 2],
        solution
    ));

    // Test 6: Mixed positive and negative
    testResults.push(runTest(
        'Test 6: mixed positive and negative',
        [-5, -3, -1, 0, 2, 4],
        -1,
        [1, 6],
        solution
    ));

    // Test 7: Target is zero
    testResults.push(runTest(
        'Test 7: target is zero',
        [-2, -1, 0, 1, 2],
        0,
        [1, 5],
        solution
    ));

    // Test 8: Duplicate numbers
    testResults.push(runTest(
        'Test 8: duplicate numbers',
        [1, 2, 2, 3],
        4,
        [1, 4],
        solution
    ));

    // Test 9: Small array
    testResults.push(runTest(
        'Test 9: small array',
        [1, 2],
        3,
        [1, 2],
        solution
    ));

    // Test 10: Large numbers
    testResults.push(runTest(
        'Test 10: large numbers',
        [100, 200, 300, 400],
        500,
        [1, 4],
        solution
    ));

    // Test 11: All same numbers
    testResults.push(runTest(
        'Test 11: all same numbers',
        [5, 5, 5, 5],
        10,
        [1, 4],
        solution
    ));

    // Test 12: Sequential numbers
    testResults.push(runTest(
        'Test 12: sequential numbers',
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        17,
        [7, 10],
        solution
    ));

    // Test 13: Solution at beginning
    testResults.push(runTest(
        'Test 13: solution at beginning',
        [1, 2, 3, 4, 5],
        3,
        [1, 2],
        solution
    ));

    // Test 14: Solution at end
    testResults.push(runTest(
        'Test 14: solution at end',
        [1, 2, 3, 4, 5],
        9,
        [4, 5],
        solution
    ));

    // Test 15: Large array
    testResults.push(runTest(
        'Test 15: large array',
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        29,
        [14, 15],
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
        title: 'Running Two Sum II Tests',
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

