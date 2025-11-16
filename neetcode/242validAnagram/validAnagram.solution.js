// Solution 1: Using character frequency counting (hash map approach)
class SolutionFrequencyMap {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false
        }

        const mapS = {}
        const mapT = {}

        for (let i = 0; i < s.length; i++) {
            mapS[s[i]] = (mapS[s[i]] || 0) + 1
            mapT[t[i]] = (mapT[t[i]] || 0) + 1
        }

        for (const key in mapS) {
            if (mapS[key] !== mapT[key]) {
                return false
            }
        }

        return true
    }
}

// Solution 2: Using sorting approach
class SolutionSorting {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isAnagram(s, t) {
        if (s.length !== t.length) {
            return false;
        }

        const sortedS = s.split('').sort().join('');
        const sortedT = t.split('').sort().join('');

        return sortedS === sortedT;
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SolutionFrequencyMap, SolutionSorting };
}

