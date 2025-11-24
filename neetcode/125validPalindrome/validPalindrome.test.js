// Import the solutions
const { SolutionReverseString, SolutionTwoPointers } = require('./validPalindrome.template.js');

// Test helper function
function runTest(testName, s, expected, solution) {
    const result = solution.isPalindrome(s);

    const passed = result === expected;
    console.log(`${passed ? '✓' : '✗'} ${testName}`);
    if (!passed) {
        console.log(`  Input:    s = "${s}"`);
        console.log(`  Expected: ${expected}`);
        console.log(`  Got:      ${result}`);
    }
    return passed;
}

// Run all tests
console.log('Running Valid Palindrome Tests...\n');
console.log('Testing SolutionReverseString (reverse string approach):\n');

const solutionReverseString = new SolutionReverseString();
let passed = 0;
let failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1 - "Was it a car or a cat I saw?"',
    'Was it a car or a cat I saw?',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - "tab a cat"',
    'tab a cat',
    false,
    solutionReverseString
)) passed++; else failed++;

// Test 3: Simple palindrome
if (runTest(
    'Test 3: simple palindrome',
    'racecar',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 4: Not a palindrome
if (runTest(
    'Test 4: not a palindrome',
    'hello',
    false,
    solutionReverseString
)) passed++; else failed++;

// Test 5: Single character
if (runTest(
    'Test 5: single character',
    'a',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 6: Empty string (edge case - but constraint says length >= 1)
if (runTest(
    'Test 6: two characters - palindrome',
    'aa',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 7: Two characters - not palindrome
if (runTest(
    'Test 7: two characters - not palindrome',
    'ab',
    false,
    solutionReverseString
)) passed++; else failed++;

// Test 8: Palindrome with numbers
if (runTest(
    'Test 8: palindrome with numbers',
    'a1b2b1a',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 9: Not palindrome with numbers
if (runTest(
    'Test 9: not palindrome with numbers',
    'a1b2c3',
    false,
    solutionReverseString
)) passed++; else failed++;

// Test 10: Palindrome with spaces and punctuation
if (runTest(
    'Test 10: palindrome with spaces and punctuation',
    'A man, a plan, a canal: Panama',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 11: Case insensitive
if (runTest(
    'Test 11: case insensitive',
    'RaceCar',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 12: Only numbers
if (runTest(
    'Test 12: only numbers - palindrome',
    '12321',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 13: Only numbers - not palindrome
if (runTest(
    'Test 13: only numbers - not palindrome',
    '12345',
    false,
    solutionReverseString
)) passed++; else failed++;

// Test 14: Mixed alphanumeric with special characters
if (runTest(
    'Test 14: mixed alphanumeric with special characters',
    'Madam, I\'m Adam',
    true,
    solutionReverseString
)) passed++; else failed++;

// Test 15: All special characters (should be empty string, which is palindrome)
if (runTest(
    'Test 15: all special characters',
    '!@#$%^&*()',
    true,
    solutionReverseString
)) passed++; else failed++;

const reverseStringPassed = passed;
const reverseStringFailed = failed;

// Reset counters for Two Pointers solution
console.log(`\n${'='.repeat(50)}`);
console.log(`SolutionReverseString Tests Passed: ${reverseStringPassed}/${reverseStringPassed + reverseStringFailed}`);
console.log(`SolutionReverseString Tests Failed: ${reverseStringFailed}/${reverseStringPassed + reverseStringFailed}\n`);

console.log('Testing SolutionTwoPointers (two pointers approach):\n');

const solutionTwoPointers = new SolutionTwoPointers();
passed = 0;
failed = 0;

// Test 1: Example 1 from problem description
if (runTest(
    'Test 1: example 1 - "Was it a car or a cat I saw?"',
    'Was it a car or a cat I saw?',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 2: Example 2 from problem description
if (runTest(
    'Test 2: example 2 - "tab a cat"',
    'tab a cat',
    false,
    solutionTwoPointers
)) passed++; else failed++;

// Test 3: Simple palindrome
if (runTest(
    'Test 3: simple palindrome',
    'racecar',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 4: Not a palindrome
if (runTest(
    'Test 4: not a palindrome',
    'hello',
    false,
    solutionTwoPointers
)) passed++; else failed++;

// Test 5: Single character
if (runTest(
    'Test 5: single character',
    'a',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 6: Two characters - palindrome
if (runTest(
    'Test 6: two characters - palindrome',
    'aa',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 7: Two characters - not palindrome
if (runTest(
    'Test 7: two characters - not palindrome',
    'ab',
    false,
    solutionTwoPointers
)) passed++; else failed++;

// Test 8: Palindrome with numbers
if (runTest(
    'Test 8: palindrome with numbers',
    'a1b2b1a',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 9: Not palindrome with numbers
if (runTest(
    'Test 9: not palindrome with numbers',
    'a1b2c3',
    false,
    solutionTwoPointers
)) passed++; else failed++;

// Test 10: Palindrome with spaces and punctuation
if (runTest(
    'Test 10: palindrome with spaces and punctuation',
    'A man, a plan, a canal: Panama',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 11: Case insensitive
if (runTest(
    'Test 11: case insensitive',
    'RaceCar',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 12: Only numbers
if (runTest(
    'Test 12: only numbers - palindrome',
    '12321',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 13: Only numbers - not palindrome
if (runTest(
    'Test 13: only numbers - not palindrome',
    '12345',
    false,
    solutionTwoPointers
)) passed++; else failed++;

// Test 14: Mixed alphanumeric with special characters
if (runTest(
    'Test 14: mixed alphanumeric with special characters',
    'Madam, I\'m Adam',
    true,
    solutionTwoPointers
)) passed++; else failed++;

// Test 15: All special characters (should be empty string, which is palindrome)
if (runTest(
    'Test 15: all special characters',
    '!@#$%^&*()',
    true,
    solutionTwoPointers
)) passed++; else failed++;

const twoPointersPassed = passed;
const twoPointersFailed = failed;

// Summary for SolutionTwoPointers
console.log(`\n${'='.repeat(50)}`);
console.log(`SolutionTwoPointers Tests Passed: ${twoPointersPassed}/${twoPointersPassed + twoPointersFailed}`);
console.log(`SolutionTwoPointers Tests Failed: ${twoPointersFailed}/${twoPointersPassed + twoPointersFailed}`);

// Overall Summary
console.log(`\n${'='.repeat(50)}`);
const totalPassed = reverseStringPassed + twoPointersPassed;
const totalFailed = reverseStringFailed + twoPointersFailed;
console.log(`Overall Tests Passed: ${totalPassed}/${totalPassed + totalFailed}`);
console.log(`Overall Tests Failed: ${totalFailed}/${totalPassed + totalFailed}`);
if (totalFailed === 0) {
    console.log('✓ All tests passed!');
    process.exit(0);
} else {
    console.log('✗ Some tests failed');
    process.exit(1);
}

