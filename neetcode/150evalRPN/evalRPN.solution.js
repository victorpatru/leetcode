// Solution 1: Stack approach
class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        const stack = [];
        for (const t of tokens) {
            if (t === '+' || t === '-' || t === '*' || t === '/') {
                const b = stack.pop();   // second operand
                const a = stack.pop();   // first operand
                if (t === '+') {
                    stack.push(a + b);
                } else if (t === '-') {
                    stack.push(a - b);
                } else if (t === '*') {
                    stack.push(a * b);
                } else { // '/'
                    stack.push(Math.trunc(a / b));
                }
            } else {
                stack.push(Number(t)); // or parseInt(t)
            }
        }
        return stack.pop();
    }
}

/**
 * Time Complexity: O(n) where n is the length of the tokens array.
 * Space Complexity: O(n) as we use a stack that can grow up to n elements in the worst case.
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}

