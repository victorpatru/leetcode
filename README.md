# DSA Mastery

My masterplan for getting good at Data Structures and Algorithms: pair the Neetcode 150 list with Anki for long term retention

## Quick Start

**Setup (one-time):**
```bash
# Add to ~/.zshrc (must be defined before early returns)
test() { /path/to/dsa-mastery/test.sh "$@"; }
```

**Test any problem:**
```bash
test 739                           # By number
test encodeDecodeStrings            # By name
test core-algorithms/dynamic-array # By path
```

## Workflow

1. Work in `*.template.js` files
2. Implement `Solution` class
3. Fill in `SOLUTION_COMPLEXITY`:
   ```javascript
   const SOLUTION_COMPLEXITY = {
       time: 'O(n)',
       space: 'O(1)'
   };
   ```
4. Run tests: `test <problem>`

Tests validate both algorithm correctness and Big O complexity.

## File Structure

- `*.template.js` - Your solution + complexity analysis
- `*.solution.js` - Reference solution
- `*.test.js` - Test runner

## Resources

- [Leetcode DSA Course](https://leetcode.com/explore/interview/card/leetcodes-interview-crash-course-data-structures-and-algorithms/703/arraystrings/)
- [Neetcode DSA for Beginners](https://neetcode.io/courses/dsa-for-beginners/0)
- [Neetcode Core Algorithms](https://neetcode.io/practice?subpage=practice)
- [Neetcode Roadmap](https://neetcode.io/roadmap)

## PREP Method (Interview Structure)

- **Parameters**: Inputs, ask clarifying questions
- **Returns**: Expected output format
- **Examples**: Test cases with expected results
- **Pseudocode**: Step-by-step approach
