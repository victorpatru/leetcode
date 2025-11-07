// Import the solution
const { ListNode, LinkedList } = require('./singly-linked-list.template.js');

// Test helper function
function runTest(testName, operations, expected) {
    const ll = new LinkedList()
    const results = []

    for (let i = 0; i < operations.length; i += 2) {
        const method = operations[i]
        const arg = operations[i + 1]
        results.push(ll[method](arg))
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
console.log('Running LinkedList Tests...\n')

let passed = 0
let failed = 0

// Test 1: Basic insertHead and remove
if (runTest(
    'Test 1: insertHead operations with remove',
    ['insertHead', 1, 'insertTail', 2, 'insertHead', 0, 'remove', 1, 'getValues'],
    [null, null, null, true, [0, 2]]
)) passed++; else failed++;

// Test 2: insertTail with get operations
if (runTest(
    'Test 2: insertTail with get operations',
    ['insertTail', 1, 'insertTail', 2, 'get', 1, 'remove', 1, 'insertTail', 2, 'get', 1, 'get', 0],
    [null, null, 2, true, null, 2, 1]
)) passed++; else failed++;

// Test 3: Edge case - get on empty list
if (runTest(
    'Test 3: get on empty list',
    ['get', 0, 'get', 5],
    [-1, -1]
)) passed++; else failed++;

// Test 4: Edge case - remove on empty list
if (runTest(
    'Test 4: remove on empty list',
    ['remove', 0, 'remove', 5],
    [false, false]
)) passed++; else failed++;

// Test 5: Single element operations
if (runTest(
    'Test 5: single element operations',
    ['insertHead', 42, 'get', 0, 'remove', 0, 'get', 0],
    [null, 42, true, -1]
)) passed++; else failed++;

// Test 6: Multiple insertHead
if (runTest(
    'Test 6: multiple insertHead (builds list in reverse)',
    ['insertHead', 1, 'insertHead', 2, 'insertHead', 3, 'getValues'],
    [null, null, null, [3, 2, 1]]
)) passed++; else failed++;

// Test 7: Multiple insertTail
if (runTest(
    'Test 7: multiple insertTail (builds list in order)',
    ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'getValues'],
    [null, null, null, [1, 2, 3]]
)) passed++; else failed++;

// Test 8: Mixed operations
if (runTest(
    'Test 8: mixed insertHead and insertTail',
    ['insertTail', 2, 'insertHead', 1, 'insertTail', 3, 'getValues'],
    [null, null, null, [1, 2, 3]]
)) passed++; else failed++;

// Test 9: Remove from middle
if (runTest(
    'Test 9: remove from middle of list',
    ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'insertTail', 4, 'remove', 1, 'remove', 1, 'getValues'],
    [null, null, null, null, true, true, [1, 4]]
)) passed++; else failed++;

// Test 10: Remove first element
if (runTest(
    'Test 10: remove first element',
    ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'remove', 0, 'getValues'],
    [null, null, null, true, [2, 3]]
)) passed++; else failed++;

// Test 11: Remove last element
if (runTest(
    'Test 11: remove last element',
    ['insertTail', 1, 'insertTail', 2, 'insertTail', 3, 'remove', 2, 'getValues'],
    [null, null, null, true, [1, 2]]
)) passed++; else failed++;

// Test 12: Get out of bounds
if (runTest(
    'Test 12: get out of bounds indices',
    ['insertTail', 1, 'insertTail', 2, 'get', 0, 'get', 1, 'get', 2],
    [null, null, 1, 2, -1]
)) passed++; else failed++;

// Test 13: Remove out of bounds
if (runTest(
    'Test 13: remove out of bounds indices',
    ['insertTail', 1, 'insertTail', 2, 'remove', 5, 'getValues'],
    [null, null, false, [1, 2]]
)) passed++; else failed++;

// Test 14: Complex scenario
if (runTest(
    'Test 14: complex operations sequence',
    ['insertHead', 5, 'insertTail', 10, 'insertHead', 3, 'get', 0, 'get', 1, 'get', 2, 'remove', 1, 'getValues'],
    [null, null, null, 3, 5, 10, true, [3, 10]]
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

