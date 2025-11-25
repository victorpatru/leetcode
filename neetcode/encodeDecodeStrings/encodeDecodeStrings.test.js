// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./encodeDecodeStrings.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // m = sum of lengths of all strings
        space: 'O(n+m)' // m = sum of lengths, n = number of strings
    }
};

// Test helper function
function arraysEqual(arr1, arr2) {
    if (arr1 == null || arr2 == null) return arr1 === arr2;
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function runTest(testName, input, expected, solution) {
    let encoded, decoded, passed;
    let error = null;

    try {
        encoded = solution.encode(input);
        decoded = solution.decode(encoded);
        passed = arraysEqual(decoded, expected);

        if (!passed) {
            error = {
                Input: JSON.stringify(input),
                Expected: JSON.stringify(expected),
                Got: decoded === undefined || decoded === null ? 'undefined' : JSON.stringify(decoded),
                Encoded: encoded === undefined || encoded === null ? 'undefined' : JSON.stringify(encoded)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: JSON.stringify(input),
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
        ["neet", "code", "love", "you"],
        ["neet", "code", "love", "you"],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        ["we", "say", ":", "yes"],
        ["we", "say", ":", "yes"],
        solution
    ));

    // Test 3: Empty array
    testResults.push(runTest(
        'Test 3: empty array',
        [],
        [],
        solution
    ));

    // Test 4: Single string
    testResults.push(runTest(
        'Test 4: single string',
        ["hello"],
        ["hello"],
        solution
    ));

    // Test 5: Empty strings
    testResults.push(runTest(
        'Test 5: empty strings',
        ["", "", ""],
        ["", "", ""],
        solution
    ));

    // Test 6: Strings with special characters
    testResults.push(runTest(
        'Test 6: strings with special characters',
        ["a#b", "c#d#e", "f##g"],
        ["a#b", "c#d#e", "f##g"],
        solution
    ));

    // Test 7: Strings with numbers
    testResults.push(runTest(
        'Test 7: strings with numbers',
        ["123", "456", "789"],
        ["123", "456", "789"],
        solution
    ));

    // Test 8: Mixed content
    testResults.push(runTest(
        'Test 8: mixed content',
        ["hello", "", "world", "!", "test"],
        ["hello", "", "world", "!", "test"],
        solution
    ));

    // Test 9: Long strings
    testResults.push(runTest(
        'Test 9: long strings',
        ["a".repeat(100), "b".repeat(50), "c".repeat(25)],
        ["a".repeat(100), "b".repeat(50), "c".repeat(25)],
        solution
    ));

    // Test 10: Single character strings
    testResults.push(runTest(
        'Test 10: single character strings',
        ["a", "b", "c", "d"],
        ["a", "b", "c", "d"],
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
        title: 'Running Encode and Decode Strings Tests',
        subtitle: 'Testing Solution (length prefix with delimiter approach)',
        tests: testResults,
        complexity: {
            validations: complexityValidations,
            passed: complexityPassed,
            total: complexityTotal
        }
    });

    // Exit with appropriate code
    const passed = testResults.filter(t => t.passed).length;
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

