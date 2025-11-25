// Import the solution
const { SolutionHashMap, SOLUTION_HASH_MAP_COMPLEXITY } = require('./twoSum.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    hashMap: {
        time: 'O(n)',
        space: 'O(n)'
    }
};

// Test helper function
function runTest(testName, nums, target, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.twoSum(nums, target);
        passed = JSON.stringify(result) === JSON.stringify(expected);
        
        if (!passed) {
            error = {
                Input: `nums = ${JSON.stringify(nums)}, target = ${target}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `nums = ${JSON.stringify(nums)}, target = ${target}`,
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
    const solutionHashMap = new SolutionHashMap();
    const testResults = [];

    // Test 1: Example 1 from problem description
    testResults.push(runTest(
        'Test 1: example 1 - basic case',
        [3, 4, 5, 6],
        7,
        [0, 1],
        solutionHashMap
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - indices not adjacent',
        [4, 5, 6],
        10,
        [0, 2],
        solutionHashMap
    ));

    // Test 3: Example 3 from problem description
    testResults.push(runTest(
        'Test 3: example 3 - same numbers',
        [5, 5],
        10,
        [0, 1],
        solutionHashMap
    ));

    // Test 4: Small array
    testResults.push(runTest(
        'Test 4: small array',
        [2, 7],
        9,
        [0, 1],
        solutionHashMap
    ));

    // Test 5: Negative numbers
    testResults.push(runTest(
        'Test 5: negative numbers',
        [-1, -2, -3, -4, -5],
        -8,
        [2, 4],
        solutionHashMap
    ));

    // Test 6: Mixed positive and negative
    testResults.push(runTest(
        'Test 6: mixed positive and negative',
        [-1, 2, 3, 4, 5],
        1,
        [0, 1],
        solutionHashMap
    ));

    // Test 7: Zero in array
    testResults.push(runTest(
        'Test 7: zero in array',
        [0, 4, 3, 0],
        0,
        [0, 3],
        solutionHashMap
    ));

    // Test 8: Target is zero
    testResults.push(runTest(
        'Test 8: target is zero',
        [-3, 4, 3, 90],
        0,
        [0, 2],
        solutionHashMap
    ));

    // Test 9: Large numbers
    testResults.push(runTest(
        'Test 9: large numbers',
        [1000000, 2000000, 3000000],
        5000000,
        [1, 2],
        solutionHashMap
    ));

    // Test 10: Solution at end of array
    testResults.push(runTest(
        'Test 10: solution at end of array',
        [1, 2, 3, 4, 5],
        9,
        [3, 4],
        solutionHashMap
    ));

    // Test 11: Solution at beginning of array
    testResults.push(runTest(
        'Test 11: solution at beginning of array',
        [1, 2, 3, 4, 5],
        3,
        [0, 1],
        solutionHashMap
    ));

    // Test 12: Multiple pairs exist (hash map returns first found pair)
    testResults.push(runTest(
        'Test 12: multiple pairs exist',
        [1, 2, 3, 4, 5],
        6,
        [1, 3],
        solutionHashMap
    ));

    // Test 13: Duplicate values (different indices)
    testResults.push(runTest(
        'Test 13: duplicate values',
        [3, 3, 3],
        6,
        [0, 1],
        solutionHashMap
    ));

    // Test 14: Larger array
    testResults.push(runTest(
        'Test 14: larger array',
        [2, 7, 11, 15, 3, 6, 8, 9],
        9,
        [0, 1],
        solutionHashMap
    ));

    // Big O Complexity Validation
    const complexityValidations = [];
    
    complexityValidations.push(validateComplexityResult(
        'SolutionHashMap',
        SOLUTION_HASH_MAP_COMPLEXITY.time,
        CORRECT_COMPLEXITY.hashMap.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionHashMap',
        SOLUTION_HASH_MAP_COMPLEXITY.space,
        CORRECT_COMPLEXITY.hashMap.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running Two Sum Tests',
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

