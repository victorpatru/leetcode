# Add Problem to Repository

This guide documents how to add a new LeetCode problem to the repository following the established structure and conventions.

## Folder Structure

Create a folder in `neetcode/` with the naming pattern: `{problemNumber}{camelCaseProblemName}`

**Example:**
- `981timeBasedKeyValueStore/`
- `226invertBinaryTree/`
- `49groupAnagrams/`

## Required Files

Each problem folder should contain three files:

1. **`{problemName}.template.js`** - Template file for users to fill in
2. **`{problemName}.solution.js`** - Reference solution implementation
3. **`{problemName}.test.js`** - Test suite

## 1. Template File (`*.template.js`)

### Structure:

```javascript
/**
 * Problem Name
 *
 * Problem description...
 *
 * @example
 * // Example 1:
 * // Input: ...
 * // Output: ...
 *
 * @constraints
 * - Constraint 1
 * - Constraint 2
 * 
 */

// Include any necessary class definitions (e.g., TreeNode, ListNode)
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    /**
     * @param {type} param
     * @return {type}
     */
    methodName(param) {
        // TODO: implement
    }
}

/**
 * TODO: Fill in your Big O analysis below
 */
const SOLUTION_COMPLEXITY = {
    time: '',
    space: ''
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
    // Also export any helper classes if needed:
    // module.exports = { Solution, TreeNode, SOLUTION_COMPLEXITY };
}
```

### Key Points:
- Include problem description, examples, and constraints in JSDoc comments
- Use `// TODO: implement` for empty methods
- Export `Solution` class and `SOLUTION_COMPLEXITY` object
- Export helper classes (TreeNode, ListNode, etc.) if needed

## 2. Solution File (`*.solution.js`)

### Structure:

```javascript
// Solution: Brief description of approach
class Solution {
    /**
     * @param {type} param
     * @return {type}
     */
    methodName(param) {
        // Implementation here
    }
}

/**
 * Time Complexity: O(...)
 * Space Complexity: O(...)
 */
const SOLUTION_COMPLEXITY = {
    time: 'O(n)',
    space: 'O(n)'
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution, SOLUTION_COMPLEXITY };
}
```

### Key Points:
- Include a comment describing the approach
- Fill in `SOLUTION_COMPLEXITY` with correct Big O notation
- Use format: `'O(n)'`, `'O(logn)'`, `'O(m*n)'` (no spaces in multiplication)
- Export same items as template file

## 3. Test File (`*.test.js`)

### Structure:

```javascript
// Import the solutions
const { Solution, SOLUTION_COMPLEXITY } = require('./{problemName}.template.js');
// Or include helper classes:
// const { Solution, TreeNode, SOLUTION_COMPLEXITY } = require('./{problemName}.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)',
        space: 'O(n)'
    }
};

// Helper functions (if needed for data structure conversion)
function buildTree(arr) {
    // Convert array to tree structure
}

function treeToArray(root) {
    // Convert tree to array
}

// Test helper function
function runTest(testName, input, expected, solution) {
    let result, passed;
    let error = null;

    try {
        result = solution.methodName(input);
        passed = JSON.stringify(result) === JSON.stringify(expected);

        if (!passed) {
            error = {
                Input: `input = ${JSON.stringify(input)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result)
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `input = ${JSON.stringify(input)}`,
            Expected: JSON.stringify(expected),
            Error: e.message,
            Stack: e.stack
        };
    }

    return {
        name: testName,
        passed,
        error
    };
}

// Run all tests
async function main() {
    const solution = new Solution();
    const testResults = [];

    // Test cases
    testResults.push(runTest(
        'Test 1: example 1',
        input1,
        expected1,
        solution
    ));

    // ... more tests

    // Big O Complexity Validation
    const complexityValidations = [];

    complexityValidations.push(validateComplexityResult(
        'Solution',
        SOLUTION_COMPLEXITY.time,
        CORRECT_COMPLEXITY.solution.time,
        'Time'
    ));

    complexityValidations.push(validateComplexityResult(
        'Solution',
        SOLUTION_COMPLEXITY.space,
        CORRECT_COMPLEXITY.solution.space,
        'Space'
    ));

    const complexityPassed = complexityValidations.filter(v => v.isCorrect).length;
    const complexityTotal = complexityValidations.length;

    // Render results with Ink
    await renderTestResults({
        title: 'Running {Problem Name} Tests',
        subtitle: 'Testing Solution ({approach description})',
        tests: testResults,
        complexity: {
            validations: complexityValidations,
            passed: complexityPassed,
            total: complexityTotal
        }
    });

    // Exit with appropriate code
    const failed = testResults.filter(t => !t.passed).length;
    const allTestsPassed = failed === 0;
    const allComplexityCorrect = complexityPassed === complexityTotal;

    if (allTestsPassed && allComplexityCorrect) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

// Run the tests
main().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
```

### Key Points:
- Import from `template.js` (not `solution.js`) - tests validate user's implementation
- Include helper functions for data structure conversion if needed
- Test cases should cover:
  - Examples from problem description
  - Edge cases (empty input, single element, etc.)
  - Various input sizes and patterns
- Use `JSON.stringify()` for comparison when order matters
- Include Big O complexity validation
- Use `renderTestResults` for consistent output formatting

## Common Patterns

### For Tree Problems:

```javascript
// Helper to build tree from level-order array
function buildTree(arr) {
    if (!arr || arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

// Helper to convert tree to level-order array
function treeToArray(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let levelHasValue = false;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node) {
                result.push(node.val);
                queue.push(node.left || null);
                queue.push(node.right || null);
                if (node.left || node.right) {
                    levelHasValue = true;
                }
            } else {
                result.push(null);
            }
        }

        if (!levelHasValue) break;
    }

    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }

    return result;
}
```

### For Linked List Problems:

```javascript
// Helper to create linked list from array
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper to convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}
```

### For Class-Based Problems (like TimeMap):

```javascript
// Test helper for class methods
function runTest(testName, operations, expected, ClassName) {
    let result = [];
    let passed = true;
    let error = null;
    let instance;

    try {
        instance = new ClassName();
        
        // First operation is always constructor
        if (operations[0] === 'ClassName') {
            result.push(null);
        }
        
        // Process remaining operations (alternating between operation name and args)
        for (let i = 1; i < operations.length; i += 2) {
            const op = operations[i];
            const args = operations[i + 1];
            
            if (op === 'method1') {
                instance.method1(...args);
                result.push(null);
            } else if (op === 'method2') {
                const value = instance.method2(...args);
                result.push(value);
            }
        }

        // Compare results
        passed = JSON.stringify(result) === JSON.stringify(expected);
        // ... error handling
    } catch (e) {
        // ... error handling
    }

    return { name: testName, passed, error };
}
```

## Big O Notation Format

Use consistent format for complexity:
- `'O(n)'` - linear
- `'O(logn)'` - logarithmic (no space)
- `'O(m*n)'` - multiplication (no spaces)
- `'O(n^2)'` - polynomial
- `'O(1)'` - constant

## Verification Steps

1. Create folder: `mkdir -p neetcode/{number}{camelCaseName}`
2. Create three files following the structure above
3. Run tests: `node neetcode/{number}{camelCaseName}/{problemName}.test.js`
4. Verify:
   - Tests import from `template.js` (will fail until template is filled)
   - Solution file passes all tests when imported
   - Complexity validation works correctly
   - No linter errors

## Example: Complete Workflow

```bash
# 1. Create folder
mkdir -p neetcode/981timeBasedKeyValueStore

# 2. Create template.js (with TODOs)
# 3. Create solution.js (with implementation)
# 4. Create test.js (with test cases)

# 5. Test the solution
node neetcode/981timeBasedKeyValueStore/timeBasedKeyValueStore.test.js

# 6. Verify template tests fail (expected)
# Temporarily change test.js to import from solution.js to verify solution works
```

## Notes

- Template files are for users to implement - they should have TODOs
- Solution files contain working implementations with filled complexity
- Test files validate both algorithm correctness and Big O complexity
- Always include comprehensive test cases covering edge cases
- Use consistent naming: camelCase for problem names in filenames
- Export all necessary classes/types for testing
