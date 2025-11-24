// Solution: Using hash sets for rows, columns, and squares
class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        const cols = new Map();
        const rows = new Map();
        const squares = new Map();

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') continue;

                const squareKey = `${Math.floor(r / 3)},${Math.floor(c / 3)}`;

                if (
                    (rows.get(r)?.has(board[r][c])) ||
                    (cols.get(c)?.has(board[r][c])) ||
                    (squares.get(squareKey)?.has(board[r][c]))
                ) {
                    return false;
                }

                if (!rows.has(r)) rows.set(r, new Set());
                if (!cols.has(c)) cols.set(c, new Set());
                if (!squares.has(squareKey)) squares.set(squareKey, new Set());

                rows.get(r).add(board[r][c]);
                cols.get(c).add(board[r][c]);
                squares.get(squareKey).add(board[r][c]);
            }
        }

        return true;
    }
}

/**
 * Time Complexity: O(1) - fixed 9x9 board, so O(81) = O(1)
 * Space Complexity: O(1) - fixed 9x9 board, so O(81) = O(1)
 */

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Solution };
}

