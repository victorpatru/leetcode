// Import the solutions
const { TimeMap, SOLUTION_COMPLEXITY } = require('./timeBasedKeyValueStore.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(logn)', // O(1) for set(), O(log n) for get() where n is number of timestamps per key
        space: 'O(m*n)'  // m = number of keys, n = average number of timestamps per key
    }
};

// Test helper function
function runTest(testName, operations, expected, TimeMapClass) {
    let result = [];
    let passed = true;
    let error = null;
    let timeMap;

    try {
        timeMap = new TimeMapClass();

        // First operation is always TimeMap constructor
        if (operations[0] === 'TimeMap') {
            result.push(null);
        }

        // Process remaining operations (alternating between operation name and args)
        for (let i = 1; i < operations.length; i += 2) {
            const op = operations[i];
            const args = operations[i + 1];

            if (op === 'set') {
                timeMap.set(args[0], args[1], args[2]);
                result.push(null);
            } else if (op === 'get') {
                const value = timeMap.get(args[0], args[1]);
                result.push(value);
            }
        }

        // Compare results
        if (result.length !== expected.length) {
            passed = false;
            error = {
                Input: `operations = ${JSON.stringify(operations)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result),
                Message: 'Result length mismatch'
            };
        } else {
            for (let i = 0; i < result.length; i++) {
                if (result[i] !== expected[i]) {
                    passed = false;
                    error = {
                        Input: `operations = ${JSON.stringify(operations)}`,
                        Expected: JSON.stringify(expected),
                        Got: JSON.stringify(result),
                        Message: `Mismatch at index ${i}: expected "${expected[i]}", got "${result[i]}"`
                    };
                    break;
                }
            }
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `operations = ${JSON.stringify(operations)}`,
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
    const testResults = [];

    // Test 1: Example 1 from problem description
    testResults.push(runTest(
        'Test 1: example 1',
        ['TimeMap', 'set', ['alice', 'happy', 1], 'get', ['alice', 1], 'get', ['alice', 2], 'set', ['alice', 'sad', 3], 'get', ['alice', 3]],
        [null, null, 'happy', 'happy', null, 'sad'],
        TimeMap
    ));

    // Test 2: Multiple keys
    testResults.push(runTest(
        'Test 2: multiple keys',
        ['TimeMap', 'set', ['foo', 'bar', 1], 'set', ['baz', 'qux', 2], 'get', ['foo', 1], 'get', ['baz', 2], 'get', ['foo', 2]],
        [null, null, null, 'bar', 'qux', 'bar'],
        TimeMap
    ));

    // Test 3: Get before any set
    testResults.push(runTest(
        'Test 3: get before any set',
        ['TimeMap', 'get', ['nonexistent', 1]],
        [null, ''],
        TimeMap
    ));

    // Test 4: Get with timestamp before first set
    testResults.push(runTest(
        'Test 4: get with timestamp before first set',
        ['TimeMap', 'set', ['key', 'value', 5], 'get', ['key', 3]],
        [null, null, ''],
        TimeMap
    ));

    // Test 5: Multiple sets for same key
    testResults.push(runTest(
        'Test 5: multiple sets for same key',
        ['TimeMap', 'set', ['key', 'value1', 1], 'set', ['key', 'value2', 2], 'set', ['key', 'value3', 3], 'get', ['key', 1], 'get', ['key', 2], 'get', ['key', 3], 'get', ['key', 4]],
        [null, null, null, null, 'value1', 'value2', 'value3', 'value3'],
        TimeMap
    ));

    // Test 6: Get exact timestamp
    testResults.push(runTest(
        'Test 6: get exact timestamp',
        ['TimeMap', 'set', ['key', 'value', 10], 'get', ['key', 10]],
        [null, null, 'value'],
        TimeMap
    ));

    // Test 7: Get with timestamp between sets
    testResults.push(runTest(
        'Test 7: get with timestamp between sets',
        ['TimeMap', 'set', ['key', 'value1', 1], 'set', ['key', 'value2', 5], 'get', ['key', 3]],
        [null, null, null, 'value1'],
        TimeMap
    ));

    // Test 8: Large timestamps
    testResults.push(runTest(
        'Test 8: large timestamps',
        ['TimeMap', 'set', ['key', 'value', 1000000], 'get', ['key', 1000000], 'get', ['key', 2000000]],
        [null, null, 'value', 'value'],
        TimeMap
    ));

    // Test 9: Empty string values
    testResults.push(runTest(
        'Test 9: empty string values',
        ['TimeMap', 'set', ['key', '', 1], 'get', ['key', 1]],
        [null, null, ''],
        TimeMap
    ));

    // Test 10: Multiple keys with overlapping timestamps
    testResults.push(runTest(
        'Test 10: multiple keys with overlapping timestamps',
        ['TimeMap', 'set', ['key1', 'value1', 1], 'set', ['key2', 'value2', 1], 'set', ['key1', 'value1b', 2], 'set', ['key2', 'value2b', 2], 'get', ['key1', 2], 'get', ['key2', 2]],
        [null, null, null, null, null, 'value1b', 'value2b'],
        TimeMap
    ));

    // Test 11: Sequential gets
    testResults.push(runTest(
        'Test 11: sequential gets',
        ['TimeMap', 'set', ['key', 'v1', 1], 'get', ['key', 1], 'set', ['key', 'v2', 2], 'get', ['key', 2], 'set', ['key', 'v3', 3], 'get', ['key', 3]],
        [null, null, 'v1', null, 'v2', null, 'v3'],
        TimeMap
    ));

    // Test 12: Get with timestamp 0 (edge case)
    testResults.push(runTest(
        'Test 12: get with timestamp 0',
        ['TimeMap', 'set', ['key', 'value', 1], 'get', ['key', 0]],
        [null, null, ''],
        TimeMap
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
        title: 'Running Time Based Key-Value Store Tests',
        subtitle: 'Testing TimeMap (Map with arrays and binary search)',
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
