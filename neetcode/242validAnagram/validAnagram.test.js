// Import the solutions
const { SolutionFrequencyMap, SOLUTION_FREQUENCY_MAP_COMPLEXITY } = require('./validAnagram.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    frequencyMap: {
        time: 'O(n)',
        space: 'O(n)'
    }
};

// Test helper function
function runTest(testName, s, t, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.isAnagram(s, t);
        passed = result === expected;
        
        if (!passed) {
            error = {
                Input: `s = "${s}", t = "${t}"`,
                Expected: expected,
                Got: result
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `s = "${s}", t = "${t}"`,
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
    const solutionFrequencyMap = new SolutionFrequencyMap();
    const testResults = [];

    // Test 1: Example 1 from problem description
    testResults.push(runTest(
        'Test 1: example 1 - valid anagram',
        'racecar',
        'carrace',
        true,
        solutionFrequencyMap
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - not an anagram',
        'jar',
        'jam',
        false,
        solutionFrequencyMap
    ));

    // Test 3: Single character - same
    testResults.push(runTest(
        'Test 3: single character - same',
        'a',
        'a',
        true,
        solutionFrequencyMap
    ));

    // Test 4: Single character - different
    testResults.push(runTest(
        'Test 4: single character - different',
        'a',
        'b',
        false,
        solutionFrequencyMap
    ));

    // Test 5: Empty strings
    testResults.push(runTest(
        'Test 5: empty strings',
        '',
        '',
        true,
        solutionFrequencyMap
    ));

    // Test 6: Different lengths
    testResults.push(runTest(
        'Test 6: different lengths',
        'abc',
        'ab',
        false,
        solutionFrequencyMap
    ));

    // Test 7: Same characters, different order
    testResults.push(runTest(
        'Test 7: same characters, different order',
        'listen',
        'silent',
        true,
        solutionFrequencyMap
    ));

    // Test 8: Not an anagram - extra character
    testResults.push(runTest(
        'Test 8: not an anagram - extra character',
        'abc',
        'abcd',
        false,
        solutionFrequencyMap
    ));

    // Test 9: Not an anagram - missing character
    testResults.push(runTest(
        'Test 9: not an anagram - missing character',
        'abc',
        'ab',
        false,
        solutionFrequencyMap
    ));

    // Test 10: Same string
    testResults.push(runTest(
        'Test 10: same string',
        'anagram',
        'anagram',
        true,
        solutionFrequencyMap
    ));

    // Test 11: Anagram with repeated characters
    testResults.push(runTest(
        'Test 11: anagram with repeated characters',
        'aabbcc',
        'ccbbaa',
        true,
        solutionFrequencyMap
    ));

    // Test 12: Not anagram - different character counts
    testResults.push(runTest(
        'Test 12: not anagram - different character counts',
        'aab',
        'abb',
        false,
        solutionFrequencyMap
    ));

    // Test 13: Long strings - anagram
    testResults.push(runTest(
        'Test 13: long strings - anagram',
        'anagram',
        'nagaram',
        true,
        solutionFrequencyMap
    ));

    // Test 14: Long strings - not anagram
    testResults.push(runTest(
        'Test 14: long strings - not anagram',
        'anagram',
        'anagramx',
        false,
        solutionFrequencyMap
    ));

    // Big O Complexity Validation
    const complexityValidations = [];
    
    complexityValidations.push(validateComplexityResult(
        'SolutionFrequencyMap',
        SOLUTION_FREQUENCY_MAP_COMPLEXITY.time,
        CORRECT_COMPLEXITY.frequencyMap.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'SolutionFrequencyMap',
        SOLUTION_FREQUENCY_MAP_COMPLEXITY.space,
        CORRECT_COMPLEXITY.frequencyMap.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running Valid Anagram Tests',
        subtitle: 'Testing SolutionFrequencyMap (character frequency counting approach)',
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

