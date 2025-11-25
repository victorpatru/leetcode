// Import the solution
const { Solution, SOLUTION_COMPLEXITY } = require('./threeSum.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n^2)',
        space: 'O(1)' // O(1) extra space (excluding output)
    }
};

// Helper function to compare arrays of arrays (order-independent)
function arraysEqual(arr1, arr2) {
    if (!arr1 || !arr2) return arr1 === arr2;
    if (arr1.length !== arr2.length) return false;

    // Sort both arrays by their elements for comparison
    const sorted1 = arr1.map(triplet => [...triplet].sort((a, b) => a - b)).sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });

    const sorted2 = arr2.map(triplet => [...triplet].sort((a, b) => a - b)).sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });

    for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i].length !== sorted2[i].length) return false;
        for (let j = 0; j < sorted1[i].length; j++) {
            if (sorted1[i][j] !== sorted2[i][j]) return false;
        }
    }

    return true;
}

// Test helper function
function runTest(testName, nums, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.threeSum(nums);
        passed = arraysEqual(result, expected);
        
        if (!passed) {
            error = {
                Input: `nums = ${JSON.stringify(nums)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
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
        'Test 1: example 1 - [-1,0,1,2,-1,-4]',
        [-1, 0, 1, 2, -1, -4],
        [[-1, -1, 2], [-1, 0, 1]],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - [0,1,1]',
        [0, 1, 1],
        [],
        solution
    ));

    // Test 3: Example 3 from problem description
    testResults.push(runTest(
        'Test 3: example 3 - [0,0,0]',
        [0, 0, 0],
        [[0, 0, 0]],
        solution
    ));

    // Test 4: All positive numbers
    testResults.push(runTest(
        'Test 4: all positive numbers',
        [1, 2, 3, 4, 5],
        [],
        solution
    ));

    // Test 5: All negative numbers
    testResults.push(runTest(
        'Test 5: all negative numbers',
        [-1, -2, -3, -4, -5],
        [],
        solution
    ));

    // Test 6: Mixed with one solution
    testResults.push(runTest(
        'Test 6: mixed with one solution',
        [-1, 0, 1],
        [[-1, 0, 1]],
        solution
    ));

    // Test 7: Multiple duplicates
    testResults.push(runTest(
        'Test 7: multiple duplicates',
        [-1, -1, -1, 0, 1, 1, 1],
        [[-1, 0, 1]],
        solution
    ));

    // Test 8: No solution
    testResults.push(runTest(
        'Test 8: no solution',
        [1, 2, 3],
        [],
        solution
    ));

    // Test 9: Large array with multiple solutions
    testResults.push(runTest(
        'Test 9: large array with multiple solutions',
        [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6],
        [[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]],
        solution
    ));

    // Test 10: Three zeros
    testResults.push(runTest(
        'Test 10: three zeros',
        [0, 0, 0],
        [[0, 0, 0]],
        solution
    ));

    // Test 11: Two zeros and one number
    testResults.push(runTest(
        'Test 11: two zeros and one number',
        [0, 0, 1],
        [],
        solution
    ));

    // Test 12: Symmetric around zero
    testResults.push(runTest(
        'Test 12: symmetric around zero',
        [-2, -1, 0, 1, 2],
        [[-2, 0, 2], [-1, 0, 1]],
        solution
    ));

    // Test 13: All same number (non-zero)
    testResults.push(runTest(
        'Test 13: all same number (non-zero)',
        [1, 1, 1],
        [],
        solution
    ));

    // Test 14: Small array
    testResults.push(runTest(
        'Test 14: small array',
        [-1, 0, 1],
        [[-1, 0, 1]],
        solution
    ));

    // Test 15: Complex case with many duplicates
    testResults.push(runTest(
        'Test 15: complex case with many duplicates',
        [-2, 0, 1, 1, 2],
        [[-2, 0, 2], [-2, 1, 1]],
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
        title: 'Running 3Sum Tests',
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

