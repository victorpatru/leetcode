// Import the solutions
const {
    Solution,
    SOLUTION_COMPLEXITY
} = require('./longestSubstringWithoutRepeatingCharacters.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(min(n,charset))'
};

// Test helper function
function runTest(testName, s, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.lengthOfLongestSubstring(s);
        passed = result === expected;

        if (!passed) {
            error = {
                Input: `s = "${s}"`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `s = "${s}"`,
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

    // Test Solution
    testResults.push(runTest('Solution - Test 1: example 1 - "zxyzxyz"', 'zxyzxyz', 3, solution));
    testResults.push(runTest('Solution - Test 2: example 2 - "xxxx"', 'xxxx', 1, solution));
    testResults.push(runTest('Solution - Test 3: empty string', '', 0, solution));
    testResults.push(runTest('Solution - Test 4: single character', 'a', 1, solution));
    testResults.push(runTest('Solution - Test 5: all unique characters', 'abcdef', 6, solution));
    testResults.push(runTest('Solution - Test 6: "abcabcbb"', 'abcabcbb', 3, solution));
    testResults.push(runTest('Solution - Test 7: "bbbbb"', 'bbbbb', 1, solution));
    testResults.push(runTest('Solution - Test 8: "pwwkew"', 'pwwkew', 3, solution));
    testResults.push(runTest('Solution - Test 9: with spaces " "', ' ', 1, solution));
    testResults.push(runTest('Solution - Test 10: "dvdf"', 'dvdf', 3, solution));
    testResults.push(runTest('Solution - Test 11: "anviaj"', 'anviaj', 5, solution));
    testResults.push(runTest('Solution - Test 12: "tmmzuxt"', 'tmmzuxt', 5, solution));
    testResults.push(runTest('Solution - Test 13: with numbers "a1b2c3"', 'a1b2c3', 6, solution));
    testResults.push(runTest('Solution - Test 14: with special chars "!@#$%"', '!@#$%', 5, solution));
    testResults.push(runTest('Solution - Test 15: mixed "ab!@ab"', 'ab!@ab', 4, solution));
    testResults.push(runTest('Solution - Test 16: "qrsvbspk"', 'qrsvbspk', 5, solution));

    // Big O Complexity Validation
    const complexityValidations = [];

    complexityValidations.push(validateComplexityResult(
        'Solution',
        SOLUTION_COMPLEXITY.time,
        CORRECT_COMPLEXITY.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'Solution',
        SOLUTION_COMPLEXITY.space,
        CORRECT_COMPLEXITY.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running Longest Substring Without Repeating Characters Tests',
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

