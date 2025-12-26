// Import the solutions
const { LRUCache, SOLUTION_COMPLEXITY } = require('./LRUCache.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        overall: {
            time: 'O(1)',  // Per operation
            space: 'O(n)'  // Total space for the data structure
        },
    }
};

// Test helper function
function runTest(testName, operations, inputs, expected) {
    let result = [];
    let passed;
    let error = null;

    try {
        let cache = null;

        for (let i = 0; i < operations.length; i++) {
            const op = operations[i];
            const input = inputs[i];

            if (op === 'LRUCache') {
                cache = new LRUCache(input[0]);
                result.push(null);
            } else if (op === 'get') {
                const val = cache.get(input[0]);
                result.push(val);
            } else if (op === 'put') {
                cache.put(input[0], input[1]);
                result.push(null);
            }
        }

        passed = JSON.stringify(result) === JSON.stringify(expected);

        if (!passed) {
            error = {
                Operations: JSON.stringify(operations),
                Inputs: JSON.stringify(inputs),
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Operations: JSON.stringify(operations),
            Inputs: JSON.stringify(inputs),
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

    // Test 1: Example from problem description
    testResults.push(runTest(
        'Test 1: example from problem',
        ['LRUCache', 'put', 'get', 'put', 'put', 'get', 'get'],
        [[2], [1, 10], [1], [2, 20], [3, 30], [2], [1]],
        [null, null, 10, null, null, 20, -1]
    ));

    // Test 2: Simple get before put
    testResults.push(runTest(
        'Test 2: get non-existent key',
        ['LRUCache', 'get'],
        [[1], [1]],
        [null, -1]
    ));

    // Test 3: Single element cache
    testResults.push(runTest(
        'Test 3: single element cache',
        ['LRUCache', 'put', 'get', 'put', 'get', 'get'],
        [[1], [1, 100], [1], [2, 200], [1], [2]],
        [null, null, 100, null, -1, 200]
    ));

    // Test 4: Update existing key
    testResults.push(runTest(
        'Test 4: update existing key',
        ['LRUCache', 'put', 'put', 'get'],
        [[2], [1, 10], [1, 20], [1]],
        [null, null, null, 20]
    ));

    // Test 5: LRU eviction order
    testResults.push(runTest(
        'Test 5: LRU eviction order',
        ['LRUCache', 'put', 'put', 'put', 'get', 'get'],
        [[2], [1, 1], [2, 2], [3, 3], [1], [3]],
        [null, null, null, null, -1, 3]
    ));

    // Test 6: Get refreshes recency
    testResults.push(runTest(
        'Test 6: get refreshes recency',
        ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'get'],
        [[2], [1, 1], [2, 2], [1], [3, 3], [2], [1]],
        [null, null, null, 1, null, -1, 1]
    ));

    // Test 7: Multiple updates to same key
    testResults.push(runTest(
        'Test 7: multiple updates to same key',
        ['LRUCache', 'put', 'put', 'put', 'get'],
        [[1], [1, 1], [1, 2], [1, 3], [1]],
        [null, null, null, null, 3]
    ));

    // Test 8: Larger capacity
    testResults.push(runTest(
        'Test 8: larger capacity',
        ['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get', 'get', 'get'],
        [[4], [1, 1], [2, 2], [3, 3], [4, 4], [1], [2], [3], [4]],
        [null, null, null, null, null, 1, 2, 3, 4]
    ));

    // Test 9: Eviction with larger capacity
    testResults.push(runTest(
        'Test 9: eviction with larger capacity',
        ['LRUCache', 'put', 'put', 'put', 'put', 'put', 'get', 'get'],
        [[4], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [1], [5]],
        [null, null, null, null, null, null, -1, 5]
    ));

    // Test 10: Alternating gets and puts
    testResults.push(runTest(
        'Test 10: alternating gets and puts',
        ['LRUCache', 'put', 'get', 'put', 'get', 'put', 'get', 'get'],
        [[2], [1, 1], [1], [2, 2], [2], [3, 3], [1], [3]],
        [null, null, 1, null, 2, null, -1, 3]
    ));

    // Test 11: Put refreshes recency
    testResults.push(runTest(
        'Test 11: put refreshes recency',
        ['LRUCache', 'put', 'put', 'put', 'put', 'get'],
        [[2], [1, 1], [2, 2], [1, 10], [3, 3], [2]],
        [null, null, null, null, null, -1]
    ));

    // Test 12: All operations on same key
    testResults.push(runTest(
        'Test 12: all operations on same key',
        ['LRUCache', 'put', 'get', 'put', 'get', 'put', 'get'],
        [[1], [1, 1], [1], [1, 2], [1], [1, 3], [1]],
        [null, null, 1, null, 2, null, 3]
    ));

    // Test 13: Sequential evictions
    testResults.push(runTest(
        'Test 13: sequential evictions',
        ['LRUCache', 'put', 'put', 'put', 'put', 'put', 'get', 'get', 'get'],
        [[2], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [1], [3], [5]],
        [null, null, null, null, null, null, -1, -1, 5]
    ));

    // Test 14: Zero values
    testResults.push(runTest(
        'Test 14: zero values',
        ['LRUCache', 'put', 'put', 'get', 'get'],
        [[2], [0, 0], [1, 0], [0], [1]],
        [null, null, null, 0, 0]
    ));

    // Test 15: Complex sequence
    testResults.push(runTest(
        'Test 15: complex sequence',
        ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
        [[3], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        [null, null, null, 1, null, 2, null, -1, 3, 4]
    ));

    // Big O Complexity Validation
    const complexityValidations = [];

    complexityValidations.push(validateComplexityResult(
        'Overall',
        SOLUTION_COMPLEXITY.overall.time,
        CORRECT_COMPLEXITY.solution.overall.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'Overall',
        SOLUTION_COMPLEXITY.overall.space,
        CORRECT_COMPLEXITY.solution.overall.space,
        'Space'
    ));

    complexityValidations.push(validateComplexityResult(
        'get()',
        SOLUTION_COMPLEXITY.get.time,
        CORRECT_COMPLEXITY.solution.get.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'get()',
        SOLUTION_COMPLEXITY.get.space,
        CORRECT_COMPLEXITY.solution.get.space,
        'Space'
    ));

    complexityValidations.push(validateComplexityResult(
        'put()',
        SOLUTION_COMPLEXITY.put.time,
        CORRECT_COMPLEXITY.solution.put.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'put()',
        SOLUTION_COMPLEXITY.put.space,
        CORRECT_COMPLEXITY.solution.put.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running LRU Cache Tests',
        subtitle: 'Testing Solution (HashMap + Doubly Linked List)',
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


