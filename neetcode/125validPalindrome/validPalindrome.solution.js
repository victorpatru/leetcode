// Solution 1: Reverse String approach
class SolutionReverseString {
    /**
     * Check if a character is alphanumeric
     * @param {char} char
     * @return {boolean}
     */
    isAlphanumeric(char) {
        return (
            (char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            (char >= '0' && char <= '9')
        );
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let newStr = '';

        for (let c of s) {
            if (this.isAlphanumeric(c)) {
                newStr += c.toLowerCase();
            }
        }

        return newStr === newStr.split('').reverse().join('');
    }
}

/**
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

// Solution 2: Two Pointers approach
class SolutionTwoPointers {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let l = 0;
        let r = s.length - 1;

        while (l < r) {
            while (l < r && !this.alphaNum(s[l])) {
                l++;
            }
            while (r > l && !this.alphaNum(s[r])) {
                r--;
            }
            if (s[l].toLowerCase() !== s[r].toLowerCase()) {
                return false;
            }
            l++;
            r--;
        }

        return true;
    }

    /**
     * @param {char} c
     * @return {boolean}
     */
    alphaNum(c) {
        return (
            (c >= 'A' && c <= 'Z') ||
            (c >= 'a' && c <= 'z') ||
            (c >= '0' && c <= '9')
        );
    }
}

/**
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SolutionReverseString, SolutionTwoPointers };
}

