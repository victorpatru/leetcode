// Import the solutions
const { Solution } = require('./topKFrequent.template.js');

// Test helper function
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // Sort arrays for comparison (order doesn't matter for this problem)
    const sorted1 = [...arr1].sort((a, b) => a - b);
    const sorted2 = [...arr2].sort((a, b) => a - b);

    for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i] !== sorted2[i]) return false;
    }
    return true;
}

function runTest(testName, nums, k, expected, solution) {
    const result = solution.topKFrequent(nums, k);

    if (result === undefined) {
        console.log(`✗ ${testName}`);
        console.log(`  Input:    nums = ${JSON.stringify(nums)}, k = ${k}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      undefined`);
        return false;
    }

    const passed = arraysEqual(result, expected);
    console.log(`${passed ? '✓' : '✗'} ${testName}`);
    if (!passed) {
        console.log(`  Input:    nums = ${JSON.stringify(nums)}, k = ${k}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
    }
    return passed;
}

// Run all tests
console.log('Running Top K Frequent Elements Tests...\n');
console.log('Testing Solution (bucket sort approach):\n');

const solution = new Solution();
let passed = 0;
let failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1',
    [1, 1, 1, 2, 2, 3],
    2,
    [1, 2],
    solution
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - single element',
    [1],
    1,
    [1],
    solution
)) passed++; else failed++;

// Test 3: All same elements
if (runTest(
    'Test 3: all same elements',
    [1, 1, 1, 1],
    1,
    [1],
    solution
)) passed++; else failed++;

// Test 4: k equals array length
if (runTest(
    'Test 4: k equals array length',
    [1, 2, 3],
    3,
    [1, 2, 3],
    solution
)) passed++; else failed++;

// Test 5: Multiple elements with same frequency
if (runTest(
    'Test 5: multiple elements with same frequency',
    [1, 1, 2, 2, 3, 3],
    2,
    [1, 2],
    solution
)) passed++; else failed++;

// Test 6: Negative numbers
if (runTest(
    'Test 6: negative numbers',
    [-1, -1, -2, -2, -3],
    2,
    [-1, -2],
    solution
)) passed++; else failed++;

// Test 7: Mixed positive and negative
if (runTest(
    'Test 7: mixed positive and negative',
    [1, -1, 1, -1, 2],
    2,
    [1, -1],
    solution
)) passed++; else failed++;

// Test 8: Large array
if (runTest(
    'Test 8: large array',
    [1, 1, 1, 2, 2, 2, 3, 3, 4],
    3,
    [1, 2, 3],
    solution
)) passed++; else failed++;

// Test 9: Single frequency for all
if (runTest(
    'Test 9: single frequency for all',
    [1, 2, 3, 4, 5],
    3,
    [1, 2, 3],
    solution
)) passed++; else failed++;

// Test 10: k = 1
if (runTest(
    'Test 10: k = 1',
    [1, 1, 1, 2, 2, 3],
    1,
    [1],
    solution
)) passed++; else failed++;

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests Passed: ${passed}/${passed + failed}`);
console.log(`Tests Failed: ${failed}/${passed + failed}`);
if (failed === 0) {
    console.log('✓ All tests passed!');
    process.exit(0);
} else {
    console.log('✗ Some tests failed');
    process.exit(1);
}

