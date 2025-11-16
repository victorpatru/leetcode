// Import the solutions
const { SolutionHashSet, SolutionHashSetLength } = require('./containsDuplicates.solution.js');

// Test helper function
function runTest(testName, input, expected, solution) {
    const result = solution.hasDuplicate(input);

    const passed = result === expected;
    console.log(`${passed ? '✓' : '✗'} ${testName}`);
    if (!passed) {
        console.log(`  Input:    ${JSON.stringify(input)}`);
        console.log(`  Expected: ${expected}`);
        console.log(`  Got:      ${result}`);
    }
    return passed;
}

// Run all tests
console.log('Running Contains Duplicate Tests...\n');
console.log('Testing SolutionHashSet (iterative hash set approach):\n');

const solutionHashSet = new SolutionHashSet();
let passed = 0;
let failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1 - array with duplicate',
    [1, 2, 3, 3],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - array without duplicate',
    [1, 2, 3, 4],
    false,
    solutionHashSet
)) passed++; else failed++;

// Test 3: Single element array
if (runTest(
    'Test 3: single element array',
    [1],
    false,
    solutionHashSet
)) passed++; else failed++;

// Test 4: Empty array
if (runTest(
    'Test 4: empty array',
    [],
    false,
    solutionHashSet
)) passed++; else failed++;

// Test 5: All elements are duplicates
if (runTest(
    'Test 5: all elements are duplicates',
    [1, 1, 1, 1],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 6: Duplicate at the beginning
if (runTest(
    'Test 6: duplicate at the beginning',
    [1, 1, 2, 3],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 7: Duplicate at the end
if (runTest(
    'Test 7: duplicate at the end',
    [1, 2, 3, 3],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 8: Multiple duplicates
if (runTest(
    'Test 8: multiple duplicates',
    [1, 1, 2, 2, 3],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 9: Large array without duplicates
if (runTest(
    'Test 9: large array without duplicates',
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    false,
    solutionHashSet
)) passed++; else failed++;

// Test 10: Large array with duplicates
if (runTest(
    'Test 10: large array with duplicates',
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 11: Negative numbers
if (runTest(
    'Test 11: array with negative numbers',
    [-1, 2, -1, 4],
    true,
    solutionHashSet
)) passed++; else failed++;

// Test 12: Negative numbers without duplicates
if (runTest(
    'Test 12: negative numbers without duplicates',
    [-1, -2, -3, -4],
    false,
    solutionHashSet
)) passed++; else failed++;

// Test 13: Mixed positive and negative
if (runTest(
    'Test 13: mixed positive and negative numbers',
    [1, -1, 2, -2, 3],
    false,
    solutionHashSet
)) passed++; else failed++;

// Test 14: Duplicate zero
if (runTest(
    'Test 14: duplicate zero',
    [0, 1, 2, 0],
    true,
    solutionHashSet
)) passed++; else failed++;

const hashSetPassed = passed;
const hashSetFailed = failed;

// Summary for SolutionHashSet
console.log(`\n${'='.repeat(50)}`);
console.log(`SolutionHashSet Tests Passed: ${hashSetPassed}/${hashSetPassed + hashSetFailed}`);
console.log(`SolutionHashSet Tests Failed: ${hashSetFailed}/${hashSetPassed + hashSetFailed}`);

// Test SolutionHashSetLength
console.log('\nTesting SolutionHashSetLength (hash set size comparison approach):\n');
const solutionHashSetLength = new SolutionHashSetLength();
passed = 0;
failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1 - array with duplicate',
    [1, 2, 3, 3],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - array without duplicate',
    [1, 2, 3, 4],
    false,
    solutionHashSetLength
)) passed++; else failed++;

// Test 3: Single element array
if (runTest(
    'Test 3: single element array',
    [1],
    false,
    solutionHashSetLength
)) passed++; else failed++;

// Test 4: Empty array
if (runTest(
    'Test 4: empty array',
    [],
    false,
    solutionHashSetLength
)) passed++; else failed++;

// Test 5: All elements are duplicates
if (runTest(
    'Test 5: all elements are duplicates',
    [1, 1, 1, 1],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 6: Duplicate at the beginning
if (runTest(
    'Test 6: duplicate at the beginning',
    [1, 1, 2, 3],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 7: Duplicate at the end
if (runTest(
    'Test 7: duplicate at the end',
    [1, 2, 3, 3],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 8: Multiple duplicates
if (runTest(
    'Test 8: multiple duplicates',
    [1, 1, 2, 2, 3],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 9: Large array without duplicates
if (runTest(
    'Test 9: large array without duplicates',
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    false,
    solutionHashSetLength
)) passed++; else failed++;

// Test 10: Large array with duplicates
if (runTest(
    'Test 10: large array with duplicates',
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 11: Negative numbers
if (runTest(
    'Test 11: array with negative numbers',
    [-1, 2, -1, 4],
    true,
    solutionHashSetLength
)) passed++; else failed++;

// Test 12: Negative numbers without duplicates
if (runTest(
    'Test 12: negative numbers without duplicates',
    [-1, -2, -3, -4],
    false,
    solutionHashSetLength
)) passed++; else failed++;

// Test 13: Mixed positive and negative
if (runTest(
    'Test 13: mixed positive and negative numbers',
    [1, -1, 2, -2, 3],
    false,
    solutionHashSetLength
)) passed++; else failed++;

// Test 14: Duplicate zero
if (runTest(
    'Test 14: duplicate zero',
    [0, 1, 2, 0],
    true,
    solutionHashSetLength
)) passed++; else failed++;

const hashSetLengthPassed = passed;
const hashSetLengthFailed = failed;

// Summary for SolutionHashSetLength
console.log(`\n${'='.repeat(50)}`);
console.log(`SolutionHashSetLength Tests Passed: ${hashSetLengthPassed}/${hashSetLengthPassed + hashSetLengthFailed}`);
console.log(`SolutionHashSetLength Tests Failed: ${hashSetLengthFailed}/${hashSetLengthPassed + hashSetLengthFailed}`);

// Overall Summary
const totalPassed = hashSetPassed + hashSetLengthPassed;
const totalFailed = hashSetFailed + hashSetLengthFailed;
console.log(`\n${'='.repeat(50)}`);
console.log(`Overall Tests Passed: ${totalPassed}/${totalPassed + totalFailed}`);
console.log(`Overall Tests Failed: ${totalFailed}/${totalPassed + totalFailed}`);
if (totalFailed === 0) {
    console.log('✓ All tests passed!');
    process.exit(0);
} else {
    console.log('✗ Some tests failed');
    process.exit(1);
}

