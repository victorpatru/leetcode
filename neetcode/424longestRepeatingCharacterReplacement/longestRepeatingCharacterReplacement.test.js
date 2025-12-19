// Import the solution
const { Solution, SOLUTION_COMPLEXITY } = require('./longestRepeatingCharacterReplacement.template.js');

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
function runTest(testName, s, k, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.characterReplacement(s, k);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: { s: s, k: k },
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: { s: s, k: k },
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
        'Test 1: s="XYYX", k=2',
        "XYYX",
        2,
        4,
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: s="AAABABB", k=1',
        "AAABABB",
        1,
        5,
        solution
    ));

    // Test 3: All same characters
    testResults.push(runTest(
        'Test 3: all same characters',
        "AAAA",
        2,
        4,
        solution
    ));

    // Test 4: k = 0 (no replacements allowed)
    testResults.push(runTest(
        'Test 4: k=0 (no replacements)',
        "AABABBA",
        0,
        2,
        solution
    ));

    // Test 5: k = 0 with longer sequence
    testResults.push(runTest(
        'Test 5: k=0 with AAA',
        "ABAAAB",
        0,
        3,
        solution
    ));

    // Test 6: Single character
    testResults.push(runTest(
        'Test 6: single character',
        "A",
        0,
        1,
        solution
    ));

    // Test 7: k equals string length
    testResults.push(runTest(
        'Test 7: k equals string length',
        "ABCD",
        4,
        4,
        solution
    ));

    // Test 8: k greater than needed
    testResults.push(runTest(
        'Test 8: k greater than needed',
        "AABA",
        3,
        4,
        solution
    ));

    // Test 9: Alternating characters
    testResults.push(runTest(
        'Test 9: alternating characters',
        "ABABBA",
        2,
        5,
        solution
    ));

    // Test 10: Long sequence with k=1
    testResults.push(runTest(
        'Test 10: ABAB with k=1',
        "ABAB",
        1,
        3,
        solution
    ));

    // Test 11: Complex case
    testResults.push(runTest(
        'Test 11: complex case',
        "AABABBA",
        1,
        4,
        solution
    ));

    // Test 12: Multiple different characters
    testResults.push(runTest(
        'Test 12: ABCDE with k=2',
        "ABCDE",
        2,
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
        title: 'Running Longest Repeating Character Replacement Tests',
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

