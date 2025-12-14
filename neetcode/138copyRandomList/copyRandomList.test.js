// Import the solutions
const { Node, Solution, SOLUTION_COMPLEXITY } = require('./copyRandomList.template.js');

// Import shared Big O validation utilities
const { validateComplexityResult } = require('../../utils/bigOValidator.js');
const { renderTestResults } = require('../../utils/testRenderer.js');

// Correct Big O answers for validation
const CORRECT_COMPLEXITY = {
    solution: {
        time: 'O(n)', // n = number of nodes
        space: 'O(n)'  // HashMap stores n nodes
    }
};

// Helper function to create a linked list from array representation
function createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    
    const nodes = arr.map(([val]) => new Node(val));
    
    for (let i = 0; i < arr.length; i++) {
        if (i < arr.length - 1) {
            nodes[i].next = nodes[i + 1];
        }
        const randomIdx = arr[i][1];
        if (randomIdx !== null) {
            nodes[i].random = nodes[randomIdx];
        }
    }
    
    return nodes[0];
}

// Helper function to convert linked list to array representation
function linkedListToArray(head) {
    if (!head) return [];
    
    const result = [];
    const nodeMap = new Map();
    let idx = 0;
    
    // First pass: map nodes to indices
    let cur = head;
    while (cur) {
        nodeMap.set(cur, idx);
        idx++;
        cur = cur.next;
    }
    
    // Second pass: build array representation
    cur = head;
    while (cur) {
        const randomIdx = cur.random ? nodeMap.get(cur.random) : null;
        result.push([cur.val, randomIdx]);
        cur = cur.next;
    }
    
    return result;
}

// Helper function to verify deep copy (no shared nodes)
function isDeepCopy(original, copy) {
    if (!original && !copy) return true;
    if (!original || !copy) return false;
    
    const originalNodes = new Set();
    let cur = original;
    while (cur) {
        originalNodes.add(cur);
        cur = cur.next;
    }
    
    cur = copy;
    while (cur) {
        if (originalNodes.has(cur)) return false;
        cur = cur.next;
    }
    
    return true;
}

// Test helper function
function runTest(testName, arr, expected, solution) {
    let result, passed;
    let error = null;

    try {
        const head = createLinkedList(arr);
        const copiedHead = solution.copyRandomList(head);
        result = linkedListToArray(copiedHead);
        
        const isCorrect = JSON.stringify(result) === JSON.stringify(expected);
        const isDeep = isDeepCopy(head, copiedHead);
        
        passed = isCorrect && isDeep;

        if (!passed) {
            error = {
                Input: `head = ${JSON.stringify(arr)}`,
                Expected: JSON.stringify(expected),
                Got: JSON.stringify(result),
                IsDeepCopy: isDeep
            };
        }
    } catch (e) {
        passed = false;
        error = {
            Input: `head = ${JSON.stringify(arr)}`,
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

    // Test 1: Example 1 from problem description
    testResults.push(runTest(
        'Test 1: example 1',
        [[3, null], [7, 0], [4, 0], [5, 1]],
        [[3, null], [7, 0], [4, 0], [5, 1]],
        solution
    ));

    // Test 2: Example 2 from problem description
    testResults.push(runTest(
        'Test 2: example 2',
        [[1, null], [2, 2], [3, 2]],
        [[1, null], [2, 2], [3, 2]],
        solution
    ));

    // Test 3: Empty list
    testResults.push(runTest(
        'Test 3: empty list',
        [],
        [],
        solution
    ));

    // Test 4: Single node with no random
    testResults.push(runTest(
        'Test 4: single node with no random',
        [[1, null]],
        [[1, null]],
        solution
    ));

    // Test 5: Single node with self-pointing random
    testResults.push(runTest(
        'Test 5: single node with self-pointing random',
        [[1, 0]],
        [[1, 0]],
        solution
    ));

    // Test 6: Two nodes with random pointers
    testResults.push(runTest(
        'Test 6: two nodes with random pointers',
        [[1, 1], [2, 0]],
        [[1, 1], [2, 0]],
        solution
    ));

    // Test 7: All random pointers are null
    testResults.push(runTest(
        'Test 7: all random pointers are null',
        [[1, null], [2, null], [3, null]],
        [[1, null], [2, null], [3, null]],
        solution
    ));

    // Test 8: All random pointers point to head
    testResults.push(runTest(
        'Test 8: all random pointers point to head',
        [[1, 0], [2, 0], [3, 0]],
        [[1, 0], [2, 0], [3, 0]],
        solution
    ));

    // Test 9: Complex case with various random pointers
    testResults.push(runTest(
        'Test 9: complex case with various random pointers',
        [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        solution
    ));

    // Test 10: Long list with random pointers
    testResults.push(runTest(
        'Test 10: long list with random pointers',
        [[1, 2], [2, 4], [3, 1], [4, 0], [5, 3]],
        [[1, 2], [2, 4], [3, 1], [4, 0], [5, 3]],
        solution
    ));

    // Test 11: Random pointers point to last node
    testResults.push(runTest(
        'Test 11: random pointers point to last node',
        [[1, 2], [2, 2], [3, 2]],
        [[1, 2], [2, 2], [3, 2]],
        solution
    ));

    // Test 12: Negative values
    testResults.push(runTest(
        'Test 12: negative values',
        [[-1, 1], [-2, 0], [-3, null]],
        [[-1, 1], [-2, 0], [-3, null]],
        solution
    ));

    // Test 13: Maximum value constraint
    testResults.push(runTest(
        'Test 13: maximum value constraint',
        [[100, 0], [-100, 1]],
        [[100, 0], [-100, 1]],
        solution
    ));

    // Test 14: Sequential random pointers
    testResults.push(runTest(
        'Test 14: sequential random pointers',
        [[1, 1], [2, 2], [3, 3], [4, 0]],
        [[1, 1], [2, 2], [3, 3], [4, 0]],
        solution
    ));

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
        title: 'Running Copy List with Random Pointer Tests',
        subtitle: 'Testing Solution (HashMap approach)',
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


