// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./groupAnagrams.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(m*n)', // m = number of strings, n = length of longest string
        space: 'O(m*n)'  // m = number of strings, n = length of longest string
    }
};

// Test helper function
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // Sort each subarray and the main array for comparison
    const sorted1 = arr1.map(sub => [...sub].sort()).sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        return a.join('') < b.join('') ? -1 : 1;
    });
    const sorted2 = arr2.map(sub => [...sub].sort()).sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        return a.join('') < b.join('') ? -1 : 1;
    });

    for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i].length !== sorted2[i].length) return false;
        for (let j = 0; j < sorted1[i].length; j++) {
            if (sorted1[i][j] !== sorted2[i][j]) return false;
        }
    }
    return true;
}

function runTest(testName, strs, expected, solution) {
    let result, passed;
    let error = null;
    
    try {
        result = solution.groupAnagrams(strs);
        passed = arraysEqual(result, expected);
        
        if (!passed) {
            error = {
                Input: `strs = ${JSON.stringify(strs)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `strs = ${JSON.stringify(strs)}`,
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
        ["act", "pots", "tops", "cat", "stop", "hat"],
        [["hat"], ["act", "cat"], ["stop", "pots", "tops"]],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2 - single character',
        ["x"],
        [["x"]],
        solution
    ));

    // Test 3: Example 3 from problem description
    testResults.push(runTest(
        'Test 3: example 3 - empty string',
        [""],
        [[""]],
        solution
    ));

    // Test 4: Multiple groups
    testResults.push(runTest(
        'Test 4: multiple groups',
        ["eat", "tea", "tan", "ate", "nat", "bat"],
        [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
        solution
    ));

    // Test 5: All anagrams of each other
    testResults.push(runTest(
        'Test 5: all anagrams of each other',
        ["abc", "bca", "cab"],
        [["abc", "bca", "cab"]],
        solution
    ));

    // Test 6: No anagrams
    testResults.push(runTest(
        'Test 6: no anagrams',
        ["abc", "def", "ghi"],
        [["abc"], ["def"], ["ghi"]],
        solution
    ));

    // Test 7: Empty array
    testResults.push(runTest(
        'Test 7: empty array',
        [],
        [],
        solution
    ));

    // Test 8: Single character strings
    testResults.push(runTest(
        'Test 8: single character strings',
        ["a", "b", "c"],
        [["a"], ["b"], ["c"]],
        solution
    ));

    // Test 9: Repeated characters
    testResults.push(runTest(
        'Test 9: repeated characters',
        ["aab", "aba", "baa", "abb"],
        [["abb"], ["aab", "aba", "baa"]],
        solution
    ));

    // Test 10: Long strings
    testResults.push(runTest(
        'Test 10: long strings',
        ["listen", "silent", "enlist"],
        [["listen", "silent", "enlist"]],
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
        title: 'Running Group Anagrams Tests',
        subtitle: 'Testing Solution (character frequency counting approach)',
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

