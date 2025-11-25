// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./encodeDecodeStrings.template.js');

// Import shared Big O validation utilities
const { validateComplexity } = require('../../utils/bigOValidator.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // m = sum of lengths of all strings
        space: 'O(n+m)' // m = sum of lengths, n = number of strings
    }
};

// Test helper function
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function runTest(testName, input, expected, solution) {
    const encoded = solution.encode(input);
    const decoded = solution.decode(encoded);

    const passed = arraysEqual(decoded, expected);
    console.log(`${passed ? '✓' : '✗'} ${testName}`);
    if (!passed) {
        console.log(`  Input:    ${JSON.stringify(input)}`);
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(decoded)}`);
        console.log(`  Encoded:  ${JSON.stringify(encoded)}`);
    }
    return passed;
}

// Run all tests
console.log('Running Encode and Decode Strings Tests...\n');
console.log('Testing Solution (length prefix with delimiter approach):\n');

const solution = new Solution();
let passed = 0;
let failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1',
    ["neet", "code", "love", "you"],
    ["neet", "code", "love", "you"],
    solution
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2',
    ["we", "say", ":", "yes"],
    ["we", "say", ":", "yes"],
    solution
)) passed++; else failed++;

// Test 3: Empty array
if (runTest(
    'Test 3: empty array',
    [],
    [],
    solution
)) passed++; else failed++;

// Test 4: Single string
if (runTest(
    'Test 4: single string',
    ["hello"],
    ["hello"],
    solution
)) passed++; else failed++;

// Test 5: Empty strings
if (runTest(
    'Test 5: empty strings',
    ["", "", ""],
    ["", "", ""],
    solution
)) passed++; else failed++;

// Test 6: Strings with special characters
if (runTest(
    'Test 6: strings with special characters',
    ["a#b", "c#d#e", "f##g"],
    ["a#b", "c#d#e", "f##g"],
    solution
)) passed++; else failed++;

// Test 7: Strings with numbers
if (runTest(
    'Test 7: strings with numbers',
    ["123", "456", "789"],
    ["123", "456", "789"],
    solution
)) passed++; else failed++;

// Test 8: Mixed content
if (runTest(
    'Test 8: mixed content',
    ["hello", "", "world", "!", "test"],
    ["hello", "", "world", "!", "test"],
    solution
)) passed++; else failed++;

// Test 9: Long strings
if (runTest(
    'Test 9: long strings',
    ["a".repeat(100), "b".repeat(50), "c".repeat(25)],
    ["a".repeat(100), "b".repeat(50), "c".repeat(25)],
    solution
)) passed++; else failed++;

// Test 10: Single character strings
if (runTest(
    'Test 10: single character strings',
    ["a", "b", "c", "d"],
    ["a", "b", "c", "d"],
    solution
)) passed++; else failed++;

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests Passed: ${passed}/${passed + failed}`);
console.log(`Tests Failed: ${failed}/${passed + failed}`);

// Big O Complexity Validation
console.log(`\n${'='.repeat(50)}`);
console.log('Big O Complexity Validation:\n');

let complexityPassed = 0;
let complexityTotal = 0;

// Validate Solution complexity
complexityTotal += 2;
if (validateComplexity(
    'Solution',
    SOLUTION_COMPLEXITY.time,
    CORRECT_COMPLEXITY.solution.time,
    'Time'
)) complexityPassed++;

if (validateComplexity(
    'Solution',
    SOLUTION_COMPLEXITY.space,
    CORRECT_COMPLEXITY.solution.space,
    'Space'
)) complexityPassed++;

console.log(`\n${'─'.repeat(50)}`);
console.log(`Big O Complexity: ${complexityPassed}/${complexityTotal} correct`);

// Final Summary
console.log(`\n${'='.repeat(50)}`);
console.log('FINAL SUMMARY:');
console.log(`  Algorithm Tests: ${passed}/${passed + failed} passed`);
console.log(`  Complexity Analysis: ${complexityPassed}/${complexityTotal} correct`);

const allTestsPassed = failed === 0;
const allComplexityCorrect = complexityPassed === complexityTotal;

if (allTestsPassed && allComplexityCorrect) {
    console.log('\n✓ All tests and complexity analysis passed!');
    process.exit(0);
} else {
    if (!allTestsPassed) console.log('✗ Some algorithm tests failed');
    if (!allComplexityCorrect) console.log('✗ Some complexity answers are incorrect');
    process.exit(1);
}

