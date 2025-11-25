// Import the solutions
const { 
    SolutionHashSet, 
    SolutionHashSetLength,
    SOLUTION_HASH_SET_COMPLEXITY,
    SOLUTION_HASH_SET_LENGTH_COMPLEXITY
} = require('./containsDuplicates.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    hashSet: {
        time: 'O(n)',
        space: 'O(n)'
    },
    hashSetLength: {
        time: 'O(n)',
        space: 'O(n)'
    }
};

// Test helper function
function runTest(testName, input, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.hasDuplicate(input);
        passed = result === expected;
        
        if (!passed) {
            error = {
                Input: JSON.stringify(input),
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: JSON.stringify(input),
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
    const solutionHashSet = new SolutionHashSet();
    const solutionHashSetLength = new SolutionHashSetLength();
    const testResults = [];

    // Test SolutionHashSet
    testResults.push(runTest('SolutionHashSet - Test 1: example 1 - array with duplicate', [1, 2, 3, 3], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 2: example 2 - array without duplicate', [1, 2, 3, 4], false, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 3: single element array', [1], false, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 4: empty array', [], false, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 5: all elements are duplicates', [1, 1, 1, 1], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 6: duplicate at the beginning', [1, 1, 2, 3], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 7: duplicate at the end', [1, 2, 3, 3], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 8: multiple duplicates', [1, 1, 2, 2, 3], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 9: large array without duplicates', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], false, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 10: large array with duplicates', [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 11: array with negative numbers', [-1, 2, -1, 4], true, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 12: negative numbers without duplicates', [-1, -2, -3, -4], false, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 13: mixed positive and negative numbers', [1, -1, 2, -2, 3], false, solutionHashSet));
    testResults.push(runTest('SolutionHashSet - Test 14: duplicate zero', [0, 1, 2, 0], true, solutionHashSet));

    // Test SolutionHashSetLength
    testResults.push(runTest('SolutionHashSetLength - Test 1: example 1 - array with duplicate', [1, 2, 3, 3], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 2: example 2 - array without duplicate', [1, 2, 3, 4], false, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 3: single element array', [1], false, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 4: empty array', [], false, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 5: all elements are duplicates', [1, 1, 1, 1], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 6: duplicate at the beginning', [1, 1, 2, 3], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 7: duplicate at the end', [1, 2, 3, 3], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 8: multiple duplicates', [1, 1, 2, 2, 3], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 9: large array without duplicates', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], false, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 10: large array with duplicates', [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 11: array with negative numbers', [-1, 2, -1, 4], true, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 12: negative numbers without duplicates', [-1, -2, -3, -4], false, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 13: mixed positive and negative numbers', [1, -1, 2, -2, 3], false, solutionHashSetLength));
    testResults.push(runTest('SolutionHashSetLength - Test 14: duplicate zero', [0, 1, 2, 0], true, solutionHashSetLength));

    // Big O Complexity Validation
    const complexityValidations = [];
    
    complexityValidations.push(validateComplexityResult(
        'SolutionHashSet',
        SOLUTION_HASH_SET_COMPLEXITY.time,
        CORRECT_COMPLEXITY.hashSet.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionHashSet',
        SOLUTION_HASH_SET_COMPLEXITY.space,
        CORRECT_COMPLEXITY.hashSet.space,
        'Space'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionHashSetLength',
        SOLUTION_HASH_SET_LENGTH_COMPLEXITY.time,
        CORRECT_COMPLEXITY.hashSetLength.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionHashSetLength',
        SOLUTION_HASH_SET_LENGTH_COMPLEXITY.space,
        CORRECT_COMPLEXITY.hashSetLength.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running Contains Duplicate Tests',
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

