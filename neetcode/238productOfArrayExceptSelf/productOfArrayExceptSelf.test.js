// Import the solutions
const { Solution } = require('./productOfArrayExceptSelf.template.js');

// Test helper function
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function runTest(testName, nums, expected, solution) {
    const result = solution.productExceptSelf(nums);

    if (result === undefined) {
        console.log(`✗ ${testName}`);
        console.log(`  Input:    nums = ${JSON.stringify(nums)}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      undefined`);
        return false;
    }

    const passed = arraysEqual(result, expected);
    console.log(`${passed ? '✓' : '✗'} ${testName}`);
    if (!passed) {
        console.log(`  Input:    nums = ${JSON.stringify(nums)}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(result)}`);
    }
    return passed;
}

// Run all tests
console.log('Running Product of Array Except Self Tests...\n');
console.log('Testing Solution (prefix and postfix approach):\n');

const solution = new Solution();
let passed = 0;
let failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1',
    [1, 2, 3, 4],
    [24, 12, 8, 6],
    solution
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - with zero',
    [-1, 1, 0, -3, 3],
    [0, 0, 9, 0, 0],
    solution
)) passed++; else failed++;

// Test 3: Two elements
if (runTest(
    'Test 3: two elements',
    [2, 3],
    [3, 2],
    solution
)) passed++; else failed++;

// Test 4: All positive numbers
if (runTest(
    'Test 4: all positive numbers',
    [1, 2, 3],
    [6, 3, 2],
    solution
)) passed++; else failed++;

// Test 5: With negative numbers
if (runTest(
    'Test 5: with negative numbers',
    [-1, -2, -3],
    [6, 3, 2],
    solution
)) passed++; else failed++;

// Test 6: Mixed positive and negative
if (runTest(
    'Test 6: mixed positive and negative',
    [-1, 2, -3, 4],
    [-24, 12, -8, 6],
    solution
)) passed++; else failed++;

// Test 7: Single zero
if (runTest(
    'Test 7: single zero',
    [1, 0, 3, 4],
    [0, 12, 0, 0],
    solution
)) passed++; else failed++;

// Test 8: Multiple zeros
if (runTest(
    'Test 8: multiple zeros',
    [0, 0, 2, 3],
    [0, 0, 0, 0],
    solution
)) passed++; else failed++;

// Test 9: All ones
if (runTest(
    'Test 9: all ones',
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    solution
)) passed++; else failed++;

// Test 10: Large values
if (runTest(
    'Test 10: larger array',
    [1, 2, 3, 4, 5],
    [120, 60, 40, 30, 24],
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

