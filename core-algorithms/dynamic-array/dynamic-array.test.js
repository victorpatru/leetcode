// Import the solution
const { DynamicArray } = require('./dynamic-array.template.js');

// Test helper function
function runTest(testName, operations, expected) {
    const results = []
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
    console.log(`${passed ? '✓' : '✗'} ${testName}`)
    if (!passed) {
        console.log(`  Expected: ${JSON.stringify(expected)}`)
        console.log(`  Got:      ${JSON.stringify(results)}`)
    }
    return passed
}

// Run all tests
console.log('Running DynamicArray Tests...\n')

let passed = 0
let failed = 0

// Test 1: Basic initialization and size/capacity
if (runTest(
    'Test 1: basic initialization and getSize/getCapacity',
    ['Array', 1, 'getSize', null, 'getCapacity', null],
    [null, 0, 1]
)) passed++; else failed++;

// Test 2: Pushback with capacity expansion
if (runTest(
    'Test 2: pushback with automatic capacity expansion',
    ['Array', 1, 'pushback', 1, 'getCapacity', null, 'pushback', 2, 'getCapacity', null],
    [null, null, 1, null, 2]
)) passed++; else failed++;

// Test 3: Complex operations (from screenshot - Case 3)
if (runTest(
    'Test 3: complex operations with get/set/popback',
    ['Array', 1, 'getSize', null, 'getCapacity', null, 'pushback', 1, 'getSize', null,
        'getCapacity', null, 'pushback', 2, 'getSize', null, 'getCapacity', null, 'get', 1,
        'set', 1, 3, 'get', 1, 'popback', null, 'getSize', null, 'getCapacity', null],
    [null, 0, 1, null, 1, 1, null, 2, 2, 2, null, 3, 3, 1, 2]
)) passed++; else failed++;

// Test 4: Multiple pushbacks causing multiple resizes
if (runTest(
    'Test 4: multiple resizes',
    ['Array', 1, 'pushback', 1, 'pushback', 2, 'pushback', 3, 'pushback', 4, 'getSize', null, 'getCapacity', null],
    [null, null, null, null, null, 4, 4]
)) passed++; else failed++;

// Test 5: Get and Set operations
if (runTest(
    'Test 5: get and set operations',
    ['Array', 3, 'pushback', 10, 'pushback', 20, 'pushback', 30, 'get', 0, 'get', 1, 'get', 2, 'set', 1, 25, 'get', 1],
    [null, null, null, null, 10, 20, 30, null, 25]
)) passed++; else failed++;

// Test 6: Popback operations
if (runTest(
    'Test 6: popback operations',
    ['Array', 2, 'pushback', 1, 'pushback', 2, 'pushback', 3, 'popback', null, 'popback', null, 'popback', null, 'getSize', null],
    [null, null, null, null, 3, 2, 1, 0]
)) passed++; else failed++;

// Test 7: Popback on empty array
if (runTest(
    'Test 7: popback on empty array',
    ['Array', 1, 'popback', null, 'getSize', null],
    [null, 0, 0]
)) passed++; else failed++;

// Test 8: Capacity doubling
if (runTest(
    'Test 8: verify capacity doubles correctly',
    ['Array', 2, 'pushback', 1, 'pushback', 2, 'getCapacity', null, 'pushback', 3, 'getCapacity', null],
    [null, null, null, 2, null, 4]
)) passed++; else failed++;

// Test 9: Set without pushback
if (runTest(
    'Test 9: set values in pre-allocated space',
    ['Array', 5, 'set', 0, 100, 'set', 2, 200, 'get', 0, 'get', 2, 'getSize', null],
    [null, null, null, 100, 200, 0]
)) passed++; else failed++;

// Test 10: Pushback to exact capacity without resize
if (runTest(
    'Test 10: fill to exact capacity',
    ['Array', 3, 'pushback', 1, 'pushback', 2, 'pushback', 3, 'getSize', null, 'getCapacity', null],
    [null, null, null, null, 3, 3]
)) passed++; else failed++;

// Test 11: Large array operations
if (runTest(
    'Test 11: larger array with multiple operations',
    ['Array', 2, 'pushback', 5, 'pushback', 10, 'pushback', 15, 'pushback', 20, 'pushback', 25,
        'getSize', null, 'getCapacity', null, 'get', 0, 'get', 4, 'popback', null, 'getSize', null],
    [null, null, null, null, null, null, 5, 8, 5, 25, 25, 4]
)) passed++; else failed++;

// Test 12: Set after capacity expansion
if (runTest(
    'Test 12: set after resize',
    ['Array', 1, 'pushback', 1, 'pushback', 2, 'set', 0, 99, 'get', 0, 'get', 1, 'getCapacity', null],
    [null, null, null, null, 99, 2, 2]
)) passed++; else failed++;

// Test 13: Empty array operations
if (runTest(
    'Test 13: operations on newly created array',
    ['Array', 5, 'getSize', null, 'getCapacity', null, 'get', 0, 'get', 4],
    [null, 0, 5, 0, 0]
)) passed++; else failed++;

// Test 14: Alternating pushback and popback
if (runTest(
    'Test 14: alternating pushback and popback',
    ['Array', 2, 'pushback', 1, 'getSize', null, 'popback', null, 'getSize', null,
        'pushback', 2, 'pushback', 3, 'getSize', null, 'popback', null, 'getSize', null],
    [null, null, 1, 1, 0, null, null, 2, 3, 1]
)) passed++; else failed++;

// Summary
console.log(`\n${'='.repeat(50)}`)
console.log(`Tests Passed: ${passed}/${passed + failed}`)
console.log(`Tests Failed: ${failed}/${passed + failed}`)
if (failed === 0) {
    console.log('✓ All tests passed!')
    process.exit(0)
} else {
    console.log('✗ Some tests failed')
    process.exit(1)
}

