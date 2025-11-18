// Import the solutions
const { SolutionFrequencyMap } = require('./validAnagram.template.js');

// Test helper function
function runTest(testName, s, t, expected, solution) {
    const result = solution.isAnagram(s, t);

    const passed = result === expected;
    console.log(`${passed ? '✓' : '✗'} ${testName}`);
    if (!passed) {
        console.log(`  Input:    s = "${s}", t = "${t}"`);
        console.log(`  Expected: ${expected}`);
        console.log(`  Got:      ${result}`);
    }
    return passed;
}

// Run all tests
console.log('Running Valid Anagram Tests...\n');
console.log('Testing SolutionFrequencyMap (character frequency counting approach):\n');

const solutionFrequencyMap = new SolutionFrequencyMap();
let passed = 0;
let failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1 - valid anagram',
    'racecar',
    'carrace',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - not an anagram',
    'jar',
    'jam',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 3: Single character - same
if (runTest(
    'Test 3: single character - same',
    'a',
    'a',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 4: Single character - different
if (runTest(
    'Test 4: single character - different',
    'a',
    'b',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 5: Empty strings
if (runTest(
    'Test 5: empty strings',
    '',
    '',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 6: Different lengths
if (runTest(
    'Test 6: different lengths',
    'abc',
    'ab',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 7: Same characters, different order
if (runTest(
    'Test 7: same characters, different order',
    'listen',
    'silent',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 8: Not an anagram - extra character
if (runTest(
    'Test 8: not an anagram - extra character',
    'abc',
    'abcd',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 9: Not an anagram - missing character
if (runTest(
    'Test 9: not an anagram - missing character',
    'abc',
    'ab',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 10: Same string
if (runTest(
    'Test 10: same string',
    'anagram',
    'anagram',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 11: Anagram with repeated characters
if (runTest(
    'Test 11: anagram with repeated characters',
    'aabbcc',
    'ccbbaa',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 12: Not anagram - different character counts
if (runTest(
    'Test 12: not anagram - different character counts',
    'aab',
    'abb',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 13: Long strings - anagram
if (runTest(
    'Test 13: long strings - anagram',
    'anagram',
    'nagaram',
    true,
    solutionFrequencyMap
)) passed++; else failed++;

// Test 14: Long strings - not anagram
if (runTest(
    'Test 14: long strings - not anagram',
    'anagram',
    'anagramx',
    false,
    solutionFrequencyMap
)) passed++; else failed++;

const frequencyMapPassed = passed;
const frequencyMapFailed = failed;

// Summary for SolutionFrequencyMap
console.log(`\n${'='.repeat(50)}`);
console.log(`SolutionFrequencyMap Tests Passed: ${frequencyMapPassed}/${frequencyMapPassed + frequencyMapFailed}`);
console.log(`SolutionFrequencyMap Tests Failed: ${frequencyMapFailed}/${frequencyMapPassed + frequencyMapFailed}`);

// Overall Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Overall Tests Passed: ${frequencyMapPassed}/${frequencyMapPassed + frequencyMapFailed}`);
console.log(`Overall Tests Failed: ${frequencyMapFailed}/${frequencyMapPassed + frequencyMapFailed}`);
if (frequencyMapFailed === 0) {
    console.log('✓ All tests passed!');
    process.exit(0);
} else {
    console.log('✗ Some tests failed');
    process.exit(1);
}

