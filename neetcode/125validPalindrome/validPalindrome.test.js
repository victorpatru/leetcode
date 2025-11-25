// Import the solutions
const {
    SolutionReverseString,
    SolutionTwoPointers,
    SOLUTION_REVERSE_STRING_COMPLEXITY,
    SOLUTION_TWO_POINTERS_COMPLEXITY
} = require('./validPalindrome.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    reverseString: {
        time: 'O(n)', // Due to string concatenation in loop
        space: 'O(n)'   // For the new string
    },
    twoPointers: {
        time: 'O(n)',   // Single pass through string
        space: 'O(1)'   // Only using pointers
    }
};

// Test helper function
function runTest(testName, s, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.isPalindrome(s);
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
    const solutionReverseString = new SolutionReverseString();
    const solutionTwoPointers = new SolutionTwoPointers();
    const testResults = [];

    // Test SolutionReverseString
    testResults.push(runTest('SolutionReverseString - Test 1: example 1 - "Was it a car or a cat I saw?"', 'Was it a car or a cat I saw?', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 2: example 2 - "tab a cat"', 'tab a cat', false, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 3: simple palindrome', 'racecar', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 4: not a palindrome', 'hello', false, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 5: single character', 'a', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 6: two characters - palindrome', 'aa', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 7: two characters - not palindrome', 'ab', false, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 8: palindrome with numbers', 'a1b2b1a', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 9: not palindrome with numbers', 'a1b2c3', false, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 10: palindrome with spaces and punctuation', 'A man, a plan, a canal: Panama', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 11: case insensitive', 'RaceCar', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 12: only numbers - palindrome', '12321', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 13: only numbers - not palindrome', '12345', false, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 14: mixed alphanumeric with special characters', 'Madam, I\'m Adam', true, solutionReverseString));
    testResults.push(runTest('SolutionReverseString - Test 15: all special characters', '!@#$%^&*()', true, solutionReverseString));

    // Test SolutionTwoPointers
    testResults.push(runTest('SolutionTwoPointers - Test 1: example 1 - "Was it a car or a cat I saw?"', 'Was it a car or a cat I saw?', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 2: example 2 - "tab a cat"', 'tab a cat', false, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 3: simple palindrome', 'racecar', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 4: not a palindrome', 'hello', false, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 5: single character', 'a', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 6: two characters - palindrome', 'aa', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 7: two characters - not palindrome', 'ab', false, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 8: palindrome with numbers', 'a1b2b1a', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 9: not palindrome with numbers', 'a1b2c3', false, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 10: palindrome with spaces and punctuation', 'A man, a plan, a canal: Panama', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 11: case insensitive', 'RaceCar', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 12: only numbers - palindrome', '12321', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 13: only numbers - not palindrome', '12345', false, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 14: mixed alphanumeric with special characters', 'Madam, I\'m Adam', true, solutionTwoPointers));
    testResults.push(runTest('SolutionTwoPointers - Test 15: all special characters', '!@#$%^&*()', true, solutionTwoPointers));

    // Big O Complexity Validation
    const complexityValidations = [];

    complexityValidations.push(validateComplexityResult(
        'SolutionReverseString',
        SOLUTION_REVERSE_STRING_COMPLEXITY.time,
        CORRECT_COMPLEXITY.reverseString.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionReverseString',
        SOLUTION_REVERSE_STRING_COMPLEXITY.space,
        CORRECT_COMPLEXITY.reverseString.space,
        'Space'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionTwoPointers',
        SOLUTION_TWO_POINTERS_COMPLEXITY.time,
        CORRECT_COMPLEXITY.twoPointers.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionTwoPointers',
        SOLUTION_TWO_POINTERS_COMPLEXITY.space,
        CORRECT_COMPLEXITY.twoPointers.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running Valid Palindrome Tests',
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

