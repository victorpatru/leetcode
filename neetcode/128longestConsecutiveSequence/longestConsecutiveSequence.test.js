// Import the solution
const { Solution, SOLUTION_COMPLEXITY } = require('./longestConsecutiveSequence.template.js');

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
function runTest(testName, nums, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.longestConsecutive(nums);
        passed = result === expected;
        
        if (!passed) {
            error = {
                Input: `nums = ${JSON.stringify(nums)}`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `nums = ${JSON.stringify(nums)}`,
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
        'Test 1: example 1 - sequence [2,3,4,5]',
        [2, 20, 4, 10, 3, 4, 5],
        4,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - sequence [0,1,2,3,4,5,6]',
        [0, 3, 2, 5, 4, 6, 1, 1],
        7,
        solution
    ));

    // Test 3: Empty array
    testResults.push(runTest(
        'Test 3: empty array',
        [],
        0,
        solution
    ));

    // Test 4: Single element
    testResults.push(runTest(
        'Test 4: single element',
        [1],
        1,
        solution
    ));

    // Test 5: No consecutive sequence (all unique, no consecutive)
    testResults.push(runTest(
        'Test 5: no consecutive sequence',
        [1, 3, 5, 7, 9],
        1,
        solution
    ));

    // Test 6: All duplicates
    testResults.push(runTest(
        'Test 6: all duplicates',
        [5, 5, 5, 5],
        1,
        solution
    ));

    // Test 7: Negative numbers
    testResults.push(runTest(
        'Test 7: negative numbers',
        [-2, -1, 0, 1, 2],
        5,
        solution
    ));

    // Test 8: Mixed positive and negative
    testResults.push(runTest(
        'Test 8: mixed positive and negative',
        [-1, 0, 1, 2, -2],
        5,
        solution
    ));

    // Test 9: Sequence starting from negative
    testResults.push(runTest(
        'Test 9: sequence starting from negative',
        [-5, -4, -3, 10, 11],
        3,
        solution
    ));

    // Test 10: Multiple sequences, longest at end
    testResults.push(runTest(
        'Test 10: multiple sequences, longest at end',
        [1, 2, 100, 101, 102, 103],
        4,
        solution
    ));

    // Test 11: Multiple sequences, longest in middle
    testResults.push(runTest(
        'Test 11: multiple sequences, longest in middle',
        [1, 2, 10, 11, 12, 13, 14, 20, 21],
        5,
        solution
    ));

    // Test 12: Large gap between sequences
    testResults.push(runTest(
        'Test 12: large gap between sequences',
        [1, 2, 3, 1000, 1001],
        3,
        solution
    ));

    // Test 13: Sequence with duplicates
    testResults.push(runTest(
        'Test 13: sequence with duplicates',
        [1, 2, 2, 3, 3, 4, 5],
        5,
        solution
    ));

    // Test 14: Single long sequence
    testResults.push(runTest(
        'Test 14: single long sequence',
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        10,
        solution
    ));

    // Test 15: Zero included
    testResults.push(runTest(
        'Test 15: zero included',
        [-1, 0, 1],
        3,
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
        title: 'Running Longest Consecutive Sequence Tests',
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

