// Import the solution
const { ListNode, LinkedList } = require('./singly-linked-list.template.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Test helper function
function runTest(testName, operations, expected) {
    let results = []
    let error = null
    
    try {
        const ll = new LinkedList()

        for (let i = 0; i < operations.length; i += 2) {
            const method = operations[i]
            const arg = operations[i + 1]
            results.push(ll[method](arg))
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

    // Test 1: Basic insertHead and remove
    testResults.push(runTest(
        'Test 1: insertHead operations with remove',
        ['insertHead', 1, 'insertTail', 2, 'insertHead', 0, 'remove', 1, 'getValues'],
        [null, null, null, true, [0, 2]]
    ));

    // Test 2: insertTail with get operations
    testResults.push(runTest(
        'Test 2: insertTail with get operations',
        ['insertTail', 1, 'insertTail', 2, 'get', 1, 'remove', 1, 'insertTail', 2, 'get', 1, 'get', 0],
        [null, null, 2, true, null, 2, 1]
    ));

    // Test 3: Edge case - get on empty list
    testResults.push(runTest(
        'Test 3: get on empty list',
        ['get', 0, 'get', 5],
        [-1, -1]
    ));

    // Test 4: Edge case - remove on empty list
    testResults.push(runTest(
        'Test 4: remove on empty list',
        ['remove', 0, 'remove', 5],
        [false, false]
    ));

    // Test 5: Single element operations
    testResults.push(runTest(
        'Test 5: single element operations',
        ['insertHead', 42, 'get', 0, 'remove', 0, 'get', 0],
        [null, 42, true, -1]
    ));

    // Test 6: Multiple insertHead
    testResults.push(runTest(
        'Test 6: multiple insertHead (builds list in reverse)',
        ['insertHead', 1, 'insertHead', 2, 'insertHead', 3, 'getValues'],
        [null, null, null, [3, 2, 1]]
    ));

    // Test 7: Multiple insertTail
    testResults.push(runTest(
        'Test 7: multiple insertTail (builds list in order)',
        ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'getValues'],
        [null, null, null, [1, 2, 3]]
    ));

    // Test 8: Mixed operations
    testResults.push(runTest(
        'Test 8: mixed insertHead and insertTail',
        ['insertTail', 2, 'insertHead', 1, 'insertTail', 3, 'getValues'],
        [null, null, null, [1, 2, 3]]
    ));

    // Test 9: Remove from middle
    testResults.push(runTest(
        'Test 9: remove from middle of list',
        ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'insertTail', 4, 'remove', 1, 'remove', 1, 'getValues'],
        [null, null, null, null, true, true, [1, 4]]
    ));

    // Test 10: Remove first element
    testResults.push(runTest(
        'Test 10: remove first element',
        ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'remove', 0, 'getValues'],
        [null, null, null, true, [2, 3]]
    ));

    // Test 11: Remove last element
    testResults.push(runTest(
        'Test 11: remove last element',
        ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'remove', 2, 'getValues'],
        [null, null, null, true, [1, 2]]
    ));

    // Test 12: Get out of bounds
    testResults.push(runTest(
        'Test 12: get out of bounds indices',
        ['insertTail', 1, 'insertTail', 2, 'get', 0, 'get', 1, 'get', 2],
        [null, null, 1, 2, -1]
    ));

    // Test 13: Remove out of bounds
    testResults.push(runTest(
        'Test 13: remove out of bounds indices',
        ['insertTail', 1, 'insertTail', 2, 'remove', 5, 'getValues'],
        [null, null, false, [1, 2]]
    ));

    // Test 14: Complex scenario
    testResults.push(runTest(
        'Test 14: complex operations sequence',
        ['insertHead', 5, 'insertTail', 10, 'insertHead', 3, 'get', 0, 'get', 1, 'get', 2, 'remove', 1, 'getValues'],
        [null, null, null, 3, 5, 10, true, [3, 10]]
    ));

    // Render results with Ink (no Big O complexity for core algorithms)
    await renderTestResults({
        title: 'Running LinkedList Tests',
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

