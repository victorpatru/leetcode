// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./productOfArrayExceptSelf.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)',
        space: 'O(1)' // O(1) extra space (excluding output array)
    }
};

// Test helper function
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function runTest(testName, nums, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.productExceptSelf(nums);
        
        if (result === undefined) {
            passed = false;
            error = {
                Input: `nums = ${JSON.stringify(nums)}`,
                Expected: JSON.stringify(expected),
                Got: 'undefined'
            };
        } else {
            passed = arraysEqual(result, expected);
            if (!passed) {
                error = {
                    Input: `nums = ${JSON.stringify(nums)}`,
                    Expected: JSON.stringify(expected),
                    Got: JSON.stringify(result)
                };
            }
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `nums = ${JSON.stringify(nums)}`,
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
        [1, 2, 3, 4],
        [24, 12, 8, 6],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - with zero',
        [-1, 1, 0, -3, 3],
        [0, 0, 9, 0, 0],
        solution
    ));

    // Test 3: Two elements
    testResults.push(runTest(
        'Test 3: two elements',
        [2, 3],
        [3, 2],
        solution
    ));

    // Test 4: All positive numbers
    testResults.push(runTest(
        'Test 4: all positive numbers',
        [1, 2, 3],
        [6, 3, 2],
        solution
    ));

    // Test 5: With negative numbers
    testResults.push(runTest(
        'Test 5: with negative numbers',
        [-1, -2, -3],
        [6, 3, 2],
        solution
    ));

    // Test 6: Mixed positive and negative
    testResults.push(runTest(
        'Test 6: mixed positive and negative',
        [-1, 2, -3, 4],
        [-24, 12, -8, 6],
        solution
    ));

    // Test 7: Single zero
    testResults.push(runTest(
        'Test 7: single zero',
        [1, 0, 3, 4],
        [0, 12, 0, 0],
        solution
    ));

    // Test 8: Multiple zeros
    testResults.push(runTest(
        'Test 8: multiple zeros',
        [0, 0, 2, 3],
        [0, 0, 0, 0],
        solution
    ));

    // Test 9: All ones
    testResults.push(runTest(
        'Test 9: all ones',
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        solution
    ));

    // Test 10: Large values
    testResults.push(runTest(
        'Test 10: larger array',
        [1, 2, 3, 4, 5],
        [120, 60, 40, 30, 24],
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
        title: 'Running Product of Array Except Self Tests',
        subtitle: 'Testing Solution (prefix and postfix approach)',
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

