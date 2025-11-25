// Import the solution
const { DynamicArray } = require('./dynamic-array.template.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Test helper function
function runTest(testName, operations, expected) {
    let results = []
    let error = null
    
    try {
        let arr = null
        let i = 0

        while (i < operations.length) {
            const method = operations[i]

            if (method === 'Array') {
                // Constructor call
                arr = new DynamicArray(operations[i + 1])
                results.push(null)
                i += 2
            } else if (method === 'set') {
                // set takes two arguments: index and value
                arr.set(operations[i + 1], operations[i + 2])
                results.push(null)
                i += 3
            } else {
                // Other methods take one argument (or null for no args)
                const arg = operations[i + 1]
                results.push(arr[method](arg))
                i += 2
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

    // Test 1: Basic initialization and size/capacity
    testResults.push(runTest(
        'Test 1: basic initialization and getSize/getCapacity',
        ['Array', 1, 'getSize', null, 'getCapacity', null],
        [null, 0, 1]
    ));

    // Test 2: Pushback with capacity expansion
    testResults.push(runTest(
        'Test 2: pushback with automatic capacity expansion',
        ['Array', 1, 'pushback', 1, 'getCapacity', null, 'pushback', 2, 'getCapacity', null],
        [null, null, 1, null, 2]
    ));

    // Test 3: Complex operations (from screenshot - Case 3)
    testResults.push(runTest(
        'Test 3: complex operations with get/set/popback',
        ['Array', 1, 'getSize', null, 'getCapacity', null, 'pushback', 1, 'getSize', null,
            'getCapacity', null, 'pushback', 2, 'getSize', null, 'getCapacity', null, 'get', 1,
            'set', 1, 3, 'get', 1, 'popback', null, 'getSize', null, 'getCapacity', null],
        [null, 0, 1, null, 1, 1, null, 2, 2, 2, null, 3, 3, 1, 2]
    ));

    // Test 4: Multiple pushbacks causing multiple resizes
    testResults.push(runTest(
        'Test 4: multiple resizes',
        ['Array', 1, 'pushback', 1, 'pushback', 2, 'pushback', 3, 'pushback', 4, 'getSize', null, 'getCapacity', null],
        [null, null, null, null, null, 4, 4]
    ));

    // Test 5: Get and Set operations
    testResults.push(runTest(
        'Test 5: get and set operations',
        ['Array', 3, 'pushback', 10, 'pushback', 20, 'pushback', 30, 'get', 0, 'get', 1, 'get', 2, 'set', 1, 25, 'get', 1],
        [null, null, null, null, 10, 20, 30, null, 25]
    ));

    // Test 6: Popback operations
    testResults.push(runTest(
        'Test 6: popback operations',
        ['Array', 2, 'pushback', 1, 'pushback', 2, 'pushback', 3, 'popback', null, 'popback', null, 'popback', null, 'getSize', null],
        [null, null, null, null, 3, 2, 1, 0]
    ));

    // Test 7: Popback on empty array
    testResults.push(runTest(
        'Test 7: popback on empty array',
        ['Array', 1, 'popback', null, 'getSize', null],
        [null, 0, 0]
    ));

    // Test 8: Capacity doubling
    testResults.push(runTest(
        'Test 8: verify capacity doubles correctly',
        ['Array', 2, 'pushback', 1, 'pushback', 2, 'getCapacity', null, 'pushback', 3, 'getCapacity', null],
        [null, null, null, 2, null, 4]
    ));

    // Test 9: Set without pushback
    testResults.push(runTest(
        'Test 9: set values in pre-allocated space',
        ['Array', 5, 'set', 0, 100, 'set', 2, 200, 'get', 0, 'get', 2, 'getSize', null],
        [null, null, null, 100, 200, 0]
    ));

    // Test 10: Pushback to exact capacity without resize
    testResults.push(runTest(
        'Test 10: fill to exact capacity',
        ['Array', 3, 'pushback', 1, 'pushback', 2, 'pushback', 3, 'getSize', null, 'getCapacity', null],
        [null, null, null, null, 3, 3]
    ));

    // Test 11: Large array operations
    testResults.push(runTest(
        'Test 11: larger array with multiple operations',
        ['Array', 2, 'pushback', 5, 'pushback', 10, 'pushback', 15, 'pushback', 20, 'pushback', 25,
            'getSize', null, 'getCapacity', null, 'get', 0, 'get', 4, 'popback', null, 'getSize', null],
        [null, null, null, null, null, null, 5, 8, 5, 25, 25, 4]
    ));

    // Test 12: Set after capacity expansion
    testResults.push(runTest(
        'Test 12: set after resize',
        ['Array', 1, 'pushback', 1, 'pushback', 2, 'set', 0, 99, 'get', 0, 'get', 1, 'getCapacity', null],
        [null, null, null, null, 99, 2, 2]
    ));

    // Test 13: Empty array operations
    testResults.push(runTest(
        'Test 13: operations on newly created array',
        ['Array', 5, 'getSize', null, 'getCapacity', null, 'get', 0, 'get', 4],
        [null, 0, 5, 0, 0]
    ));

    // Test 14: Alternating pushback and popback
    testResults.push(runTest(
        'Test 14: alternating pushback and popback',
        ['Array', 2, 'pushback', 1, 'getSize', null, 'popback', null, 'getSize', null,
            'pushback', 2, 'pushback', 3, 'getSize', null, 'popback', null, 'getSize', null],
        [null, null, 1, 1, 0, null, null, 2, 3, 1]
    ));

    // Render results with Ink (no Big O complexity for core algorithms)
    await renderTestResults({
        title: 'Running DynamicArray Tests',
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

