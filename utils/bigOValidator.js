/**
 * Big O Complexity Validator
 * 
 * Shared utilities for validating Big O notation answers across LeetCode problems.
 * Handles various notation formats and provides validation feedback.
 */

/**
 * Normalize Big O notation for comparison
 * Handles variations like:
 * - O(n²), O(n^2), O(n2) -> O(N^2)
 * - O(n log n), O(nlogn), O(n logn) -> O(NLOGN) (spaces are removed)
 * - O(1), O( 1 ), O(1 ) -> O(1) (spaces are removed)
 * 
 * @param {string} complexity - The Big O notation string to normalize
 * @returns {string} Normalized Big O notation in uppercase
 */
function normalizeBigO(complexity) {
    if (!complexity || typeof complexity !== 'string') return '';
    return complexity
        .trim()
        .replace(/\s+/g, '') // Remove all whitespace (handles "O(n log n)" -> "O(nlogn)")
        .replace(/²/g, '^2')  // Convert ² to ^2
        .replace(/([a-z])2([^0-9]|$)/gi, '$1^2$2')  // Handle n2 -> n^2 (but not 12, 1, etc.)
        .toUpperCase();
}

/**
 * Validate Big O complexity by comparing user answer with correct answer
 * 
 * @param {string} solutionName - Name of the solution being validated
 * @param {string} userAnswer - User's Big O notation answer
 * @param {string} correctAnswer - The correct Big O notation answer
 * @param {string} type - Type of complexity being validated ('Time' or 'Space')
 * @returns {boolean} True if the answer is correct and filled in, false otherwise
 */
function validateComplexity(solutionName, userAnswer, correctAnswer, type) {
    const normalizedUser = normalizeBigO(userAnswer);
    const normalizedCorrect = normalizeBigO(correctAnswer);

    const isCorrect = normalizedUser === normalizedCorrect;

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`${solutionName} - ${type} Complexity:`);
    console.log(`  Your answer:    ${userAnswer || '(not filled in)'}`);
    console.log(`  Correct answer: ${correctAnswer}`);

    if (isCorrect && userAnswer) {
        console.log(`  ✓ Correct!`);
    } else if (!userAnswer) {
        console.log(`  ⚠ Not filled in`);
    } else {
        console.log(`  ✗ Incorrect`);
    }

    return isCorrect && userAnswer;
}

module.exports = {
    normalizeBigO,
    validateComplexity
};

