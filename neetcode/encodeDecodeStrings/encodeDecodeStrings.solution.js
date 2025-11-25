// Solution 1: Using length prefix with delimiter
class Solution {
    /**
     * @param {string[]} strs
     * @returns {string}
     */
    encode(strs) {
        let res = "";
        for (let s of strs) {
            res += s.length + "#" + s;
        }
        return res;
    }

    /**
     * @param {string} str
     * @returns {string[]}
     */
    decode(str) {
        let res = [];
        let i = 0;
        while (i < str.length) {
            let j = i;
            while (str[j] !== "#") {
                j++;
            }
            let length = parseInt(str.substring(i, j));
            i = j + 1;
            j = i + length;
            res.push(str.substring(i, j));
            i = j;
        }
        return res;
    }
}

/**
 * Time Complexity: O(n) for each encode() and decode() function calls.
 * Space Complexity: O(n+m) for each encode() and decode() function calls.
 * Where m is the sum of lengths of all the strings and n is the number of strings.
 */

// Export for testing
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Solution };
}

