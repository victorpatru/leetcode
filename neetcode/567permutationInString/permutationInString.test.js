// Import the solution
const { Solution, SOLUTION_COMPLEXITY } = require('./permutationInString.template.js');

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
function runTest(testName, s1, s2, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.checkInclusion(s1, s2);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: { s1: s1, s2: s2 },
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: { s1: s1, s2: s2 },
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
        'Test 1: s1="abc", s2="lecabee"',
        "abc",
        "lecabee",
        true,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: s1="abc", s2="lecaabee"',
        "abc",
        "lecaabee",
        false,
        solution
    ));

    // Test 3: Exact match
    testResults.push(runTest(
        'Test 3: exact match',
        "ab",
        "ab",
        true,
        solution
    ));

    // Test 4: s1 longer than s2
    testResults.push(runTest(
        'Test 4: s1 longer than s2',
        "hello",
        "hi",
        false,
        solution
    ));

    // Test 5: Permutation at the end
    testResults.push(runTest(
        'Test 5: permutation at end',
        "ab",
        "eidba",
        true,
        solution
    ));

    // Test 6: No permutation
    testResults.push(runTest(
        'Test 6: no permutation',
        "ab",
        "eidboaoo",
        false,
        solution
    ));

    // Test 7: Permutation in middle
    testResults.push(runTest(
        'Test 7: permutation in middle',
        "abc",
        "ccccbbbbaaaa",
        false,
        solution
    ));

    // Test 8: Single character
    testResults.push(runTest(
        'Test 8: single character match',
        "a",
        "ab",
        true,
        solution
    ));

    // Test 9: Single character no match
    testResults.push(runTest(
        'Test 9: single character no match',
        "a",
        "b",
        false,
        solution
    ));

    // Test 10: Repeated characters
    testResults.push(runTest(
        'Test 10: repeated characters',
        "aaa",
        "aaacb",
        true,
        solution
    ));

    // Test 11: Permutation with duplicates
    testResults.push(runTest(
        'Test 11: permutation with duplicates',
        "aab",
        "cbaab",
        true,
        solution
    ));

    // Test 12: Long strings
    testResults.push(runTest(
        'Test 12: longer test case',
        "abcd",
        "xyzabcdwmnopqrst",
        true,
        solution
    ));

    // Test 13: All same characters in s1
    testResults.push(runTest(
        'Test 13: all same characters',
        "aaa",
        "bbbaaaccc",
        true,
        solution
    ));

    // Test 14: Almost matching but not quite
    testResults.push(runTest(
        'Test 14: almost matching',
        "abc",
        "aabbcc",
        false,
        solution
    ));

    // Test 15: Permutation at start
    testResults.push(runTest(
        'Test 15: permutation at start',
        "ab",
        "ba",
        true,
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
        title: 'Running Permutation in String Tests',
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

