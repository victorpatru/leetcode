// Import the solution
const { Deque } = require('./deque.template.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Test helper function
function runTest(testName, operations, expected) {
    let results = []
    let error = null

    try {
        let deque = null
        let i = 0

        while (i < operations.length) {
            const method = operations[i]

            if (method === 'Deque') {
                // Constructor call
                deque = new Deque()
                results.push(null)
                i += 1
            } else {
                // Method call - check if it needs an argument
                if (method === 'isEmpty' || method === 'pop' || method === 'popleft') {
                    results.push(deque[method]())
                    i += 1
                } else {
                    // append or appendleft with value
                    const arg = operations[i + 1]
                    results.push(deque[method](arg))
                    i += 2
                }
            }
        }

        const passed = JSON.stringify(results) === JSON.stringify(expected)
        if (!passed) {
            error = {
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(results)
            };
        }
        return {
            name: testName,
            passed,
            error
        };
    } catch (e) {
        return {
            name: testName,
            passed: false,
            error: {
                Expected: JSON.stringify(expected),
                Error: e.message,
                Stack: e.stack
            }
        };
    }
}

// Run all tests
async function main() {
    const testResults = []

    // Test 1: Example from requirements
    testResults.push(runTest(
        'Test 1: example from requirements',
        ['Deque', 'isEmpty', 'append', 10, 'isEmpty', 'appendleft', 20, 'popleft', 'pop', 'pop', 'append', 30, 'pop', 'isEmpty'],
        [null, true, null, false, null, 20, 10, -1, null, 30, true]
    ));

    // Test 2: Basic isEmpty on new deque
    testResults.push(runTest(
        'Test 2: isEmpty on new deque',
        ['Deque', 'isEmpty'],
        [null, true]
    ));

    // Test 3: Single append and pop
    testResults.push(runTest(
        'Test 3: single append and pop',
        ['Deque', 'append', 5, 'isEmpty', 'pop', 'isEmpty'],
        [null, null, false, 5, true]
    ));

    // Test 4: Single appendleft and popleft
    testResults.push(runTest(
        'Test 4: single appendleft and popleft',
        ['Deque', 'appendleft', 15, 'isEmpty', 'popleft', 'isEmpty'],
        [null, null, false, 15, true]
    ));

    // Test 5: Pop on empty deque
    testResults.push(runTest(
        'Test 5: pop on empty deque',
        ['Deque', 'pop', 'popleft'],
        [null, -1, -1]
    ));

    // Test 6: Multiple appends, then pops
    testResults.push(runTest(
        'Test 6: multiple appends then pops',
        ['Deque', 'append', 1, 'append', 2, 'append', 3, 'pop', 'pop', 'pop', 'pop'],
        [null, null, null, null, 3, 2, 1, -1]
    ));

    // Test 7: Multiple appendlefts, then poplefts
    testResults.push(runTest(
        'Test 7: multiple appendlefts then poplefts',
        ['Deque', 'appendleft', 1, 'appendleft', 2, 'appendleft', 3, 'popleft', 'popleft', 'popleft', 'popleft'],
        [null, null, null, null, 3, 2, 1, -1]
    ));

    // Test 8: Mixed append and appendleft
    testResults.push(runTest(
        'Test 8: mixed append and appendleft',
        ['Deque', 'append', 1, 'appendleft', 2, 'append', 3, 'appendleft', 4, 'popleft', 'popleft', 'pop', 'pop'],
        [null, null, null, null, null, 4, 2, 3, 1]
    ));

    // Test 9: Append then popleft
    testResults.push(runTest(
        'Test 9: append then popleft',
        ['Deque', 'append', 10, 'append', 20, 'popleft', 'popleft', 'isEmpty'],
        [null, null, null, 10, 20, true]
    ));

    // Test 10: Appendleft then pop
    testResults.push(runTest(
        'Test 10: appendleft then pop',
        ['Deque', 'appendleft', 10, 'appendleft', 20, 'pop', 'pop', 'isEmpty'],
        [null, null, null, 10, 20, true]
    ));

    // Test 11: Alternating operations
    testResults.push(runTest(
        'Test 11: alternating operations',
        ['Deque', 'append', 1, 'popleft', 'appendleft', 2, 'pop', 'isEmpty'],
        [null, null, 1, null, 2, true]
    ));

    // Test 12: Large sequence
    testResults.push(runTest(
        'Test 12: large sequence of operations',
        ['Deque', 'append', 5, 'append', 10, 'appendleft', 15, 'appendleft', 20, 'popleft', 'pop', 'append', 25, 'popleft', 'pop', 'pop'],
        [null, null, null, null, null, 20, 10, null, 15, 25, 5]
    ));

    // Test 13: Complex mixed operations
    testResults.push(runTest(
        'Test 13: complex mixed operations',
        ['Deque', 'appendleft', 1, 'append', 2, 'appendleft', 3, 'append', 4, 'pop', 'popleft', 'pop', 'popleft', 'isEmpty'],
        [null, null, null, null, null, 4, 3, 2, 1, true]
    ));

    // Test 14: Stress test with many operations
    testResults.push(runTest(
        'Test 14: stress test',
        ['Deque', 'append', 1, 'append', 2, 'append', 3, 'append', 4, 'append', 5,
            'popleft', 'popleft', 'appendleft', 10, 'appendleft', 20, 'pop', 'pop', 'pop', 'isEmpty'],
        [null, null, null, null, null, null, 1, 2, null, null, 5, 4, 3, false]
    ));

    // Render results with Ink (no Big O complexity for core algorithms)
    await renderTestResults({
        title: 'Running Deque Tests',
        tests: testResults,
        complexity: null
    });

    // Exit with appropriate code
    const failed = testResults.filter(t => !t.passed).length;
    if (failed === 0) {
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

