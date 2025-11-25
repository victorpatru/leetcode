// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./topKFrequent.template.js');

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
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // Sort arrays for comparison (order doesn't matter for this problem)
    const sorted1 = [...arr1].sort((a, b) => a - b);
    const sorted2 = [...arr2].sort((a, b) => a - b);

    for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i] !== sorted2[i]) return false;
    }
    return true;
}

function runTest(testName, nums, k, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.topKFrequent(nums, k);
        
        if (result === undefined) {
            passed = false;
            error = {
                Input: `nums = ${JSON.stringify(nums)}, k = ${k}`,
                Expected: JSON.stringify(expected),
                Got: 'undefined'
            };
        } else {
            passed = arraysEqual(result, expected);
            if (!passed) {
                error = {
                    Input: `nums = ${JSON.stringify(nums)}, k = ${k}`,
                    Expected: JSON.stringify(expected),
                    Got: JSON.stringify(result)
                };
            }
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `nums = ${JSON.stringify(nums)}, k = ${k}`,
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
        [1, 1, 1, 2, 2, 3],
        2,
        [1, 2],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - single element',
        [1],
        1,
        [1],
        solution
    ));

    // Test 3: All same elements
    testResults.push(runTest(
        'Test 3: all same elements',
        [1, 1, 1, 1],
        1,
        [1],
        solution
    ));

    // Test 4: k equals array length
    testResults.push(runTest(
        'Test 4: k equals array length',
        [1, 2, 3],
        3,
        [1, 2, 3],
        solution
    ));

    // Test 5: Multiple elements with same frequency
    testResults.push(runTest(
        'Test 5: multiple elements with same frequency',
        [1, 1, 2, 2, 3, 3],
        2,
        [1, 2],
        solution
    ));

    // Test 6: Negative numbers
    testResults.push(runTest(
        'Test 6: negative numbers',
        [-1, -1, -2, -2, -3],
        2,
        [-1, -2],
        solution
    ));

    // Test 7: Mixed positive and negative
    testResults.push(runTest(
        'Test 7: mixed positive and negative',
        [1, -1, 1, -1, 2],
        2,
        [1, -1],
        solution
    ));

    // Test 8: Large array
    testResults.push(runTest(
        'Test 8: large array',
        [1, 1, 1, 2, 2, 2, 3, 3, 4],
        3,
        [1, 2, 3],
        solution
    ));

    // Test 9: Single frequency for all
    testResults.push(runTest(
        'Test 9: single frequency for all',
        [1, 2, 3, 4, 5],
        3,
        [1, 2, 3],
        solution
    ));

    // Test 10: k = 1
    testResults.push(runTest(
        'Test 10: k = 1',
        [1, 1, 1, 2, 2, 3],
        1,
        [1],
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
        title: 'Running Top K Frequent Elements Tests',
        subtitle: 'Testing Solution (bucket sort approach)',
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

