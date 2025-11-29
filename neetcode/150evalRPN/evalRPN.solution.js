// Solution 1: Stack approach
class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        const stack = []

        for (const c of tokens) {
            if (["+", "-", "*", "/"].includes(c)) {
                const b = stack.pop()
                const a = stack.pop()

                if (c === "+") stack.push(a + b);
                else if (c === "-") stack.push(a - b);
                else if (c === "*") stack.push(a * b);
                else stack.push(Math.trunc(a / b))
            } else {
                stack.push(parseInt(c))
            }
        }

        return stack.pop()
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

