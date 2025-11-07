// Import the solution
const { Deque } = require('./deque.template.js');

// Test helper function
function runTest(testName, operations, expected) {
    const results = []
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
    console.log(`${passed ? '✓' : '✗'} ${testName}`)
    if (!passed) {
        console.log(`  Expected: ${JSON.stringify(expected)}`)
        console.log(`  Got:      ${JSON.stringify(results)}`)
    }
    return passed
}

// Run all tests
console.log('Running Deque Tests...\n')

let passed = 0
let failed = 0

// Test 1: Example from requirements
if (runTest(
    'Test 1: example from requirements',
    ['Deque', 'isEmpty', 'append', 10, 'isEmpty', 'appendleft', 20, 'popleft', 'pop', 'pop', 'append', 30, 'pop', 'isEmpty'],
    [null, true, null, false, null, 20, 10, -1, null, 30, true]
)) passed++; else failed++;

// Test 2: Basic isEmpty on new deque
if (runTest(
    'Test 2: isEmpty on new deque',
    ['Deque', 'isEmpty'],
    [null, true]
)) passed++; else failed++;

// Test 3: Single append and pop
if (runTest(
    'Test 3: single append and pop',
    ['Deque', 'append', 5, 'isEmpty', 'pop', 'isEmpty'],
    [null, null, false, 5, true]
)) passed++; else failed++;

// Test 4: Single appendleft and popleft
if (runTest(
    'Test 4: single appendleft and popleft',
    ['Deque', 'appendleft', 15, 'isEmpty', 'popleft', 'isEmpty'],
    [null, null, false, 15, true]
)) passed++; else failed++;

// Test 5: Pop on empty deque
if (runTest(
    'Test 5: pop on empty deque',
    ['Deque', 'pop', 'popleft'],
    [null, -1, -1]
)) passed++; else failed++;

// Test 6: Multiple appends, then pops
if (runTest(
    'Test 6: multiple appends then pops',
    ['Deque', 'append', 1, 'append', 2, 'append', 3, 'pop', 'pop', 'pop', 'pop'],
    [null, null, null, null, 3, 2, 1, -1]
)) passed++; else failed++;

// Test 7: Multiple appendlefts, then poplefts
if (runTest(
    'Test 7: multiple appendlefts then poplefts',
    ['Deque', 'appendleft', 1, 'appendleft', 2, 'appendleft', 3, 'popleft', 'popleft', 'popleft', 'popleft'],
    [null, null, null, null, 3, 2, 1, -1]
)) passed++; else failed++;

// Test 8: Mixed append and appendleft
if (runTest(
    'Test 8: mixed append and appendleft',
    ['Deque', 'append', 1, 'appendleft', 2, 'append', 3, 'appendleft', 4, 'popleft', 'popleft', 'pop', 'pop'],
    [null, null, null, null, null, 4, 2, 3, 1]
)) passed++; else failed++;

// Test 9: Append then popleft
if (runTest(
    'Test 9: append then popleft',
    ['Deque', 'append', 10, 'append', 20, 'popleft', 'popleft', 'isEmpty'],
    [null, null, null, 10, 20, true]
)) passed++; else failed++;

// Test 10: Appendleft then pop
if (runTest(
    'Test 10: appendleft then pop',
    ['Deque', 'appendleft', 10, 'appendleft', 20, 'pop', 'pop', 'isEmpty'],
    [null, null, null, 10, 20, true]
)) passed++; else failed++;

// Test 11: Alternating operations
if (runTest(
    'Test 11: alternating operations',
    ['Deque', 'append', 1, 'popleft', 'appendleft', 2, 'pop', 'isEmpty'],
    [null, null, 1, null, 2, true]
)) passed++; else failed++;

// Test 12: Large sequence
if (runTest(
    'Test 12: large sequence of operations',
    ['Deque', 'append', 5, 'append', 10, 'appendleft', 15, 'appendleft', 20, 'popleft', 'pop', 'append', 25, 'popleft', 'pop', 'pop'],
    [null, null, null, null, null, 20, 10, null, 15, 25, 5]
)) passed++; else failed++;

// Test 13: Complex mixed operations
if (runTest(
    'Test 13: complex mixed operations',
    ['Deque', 'appendleft', 1, 'append', 2, 'appendleft', 3, 'append', 4, 'pop', 'popleft', 'pop', 'popleft', 'isEmpty'],
    [null, null, null, null, null, 4, 3, 2, 1, true]
)) passed++; else failed++;

// Test 14: Stress test with many operations
if (runTest(
    'Test 14: stress test',
    ['Deque', 'append', 1, 'append', 2, 'append', 3, 'append', 4, 'append', 5,
        'popleft', 'popleft', 'appendleft', 10, 'appendleft', 20, 'pop', 'pop', 'pop', 'isEmpty'],
    [null, null, null, null, null, null, 1, 2, null, null, 5, 4, 3, false]
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

