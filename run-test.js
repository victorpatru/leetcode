#!/usr/bin/env node

/**
 * Test runner script - Run tests from root directory
 * 
 * Usage:
 *   node run-test.js <problem-number-or-name>
 *   node run-test.js 739                    # Just the LeetCode number
 *   node run-test.js neetcode/739dailyTemperatures
 *   node run-test.js 739dailyTemperatures
 *   npm test -- 739
 */

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const problemPath = process.argv[2];

if (!problemPath) {
    console.error('Error: No problem path provided');
    console.error('\nUsage:');
    console.error('  node run-test.js <problem-number-or-name>');
    console.error('  node run-test.js 739                    # Just the LeetCode number');
    console.error('  node run-test.js neetcode/739dailyTemperatures');
    console.error('  node run-test.js 739dailyTemperatures');
    console.error('  npm test -- 739');
    process.exit(1);
}

// Helper function to find directory by number prefix
// Matches directories that start with the number followed by a non-digit (e.g., "1twoSum", "739dailyTemperatures")
// or exactly match the number (e.g., if there's a directory named just "1")
function findDirectoryByNumber(number, searchDirs) {
    for (const dir of searchDirs) {
        const dirPath = path.resolve(dir);
        if (!fs.existsSync(dirPath)) continue;
        
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                // Match exact number or number followed by non-digit
                const regex = new RegExp(`^${number}(?![0-9])`);
                if (regex.test(entry.name)) {
                    return path.join(dir, entry.name);
                }
            }
        }
    }
    return null;
}

// Normalize the path - handle number-only input, full paths, and problem names
let testFile;

// Check if input is just a number (e.g., "739", "1", "15")
if (/^\d+$/.test(problemPath)) {
    const searchDirs = ['neetcode', 'core-algorithms'];
    const foundDir = findDirectoryByNumber(problemPath, searchDirs);
    
    if (!foundDir) {
        console.error(`Error: Could not find problem directory starting with "${problemPath}"`);
        console.error(`Searched in: ${searchDirs.join(', ')}`);
        process.exit(1);
    }
    
    const dirFullPath = path.resolve(foundDir);
    const files = fs.readdirSync(dirFullPath);
    const testFiles = files.filter(f => f.endsWith('.test.js'));
    
    if (testFiles.length === 0) {
        console.error(`Error: No test file found in "${foundDir}"`);
        process.exit(1);
    }
    
    if (testFiles.length > 1) {
        console.error(`Error: Multiple test files found in "${foundDir}": ${testFiles.join(', ')}`);
        process.exit(1);
    }
    
    testFile = path.join(dirFullPath, testFiles[0]);
} else if (problemPath.includes('/')) {
    // Full path provided: neetcode/739dailyTemperatures
    const dirPath = problemPath;
    const dirName = path.basename(problemPath);
    const dirFullPath = path.resolve(dirPath);
    
    // Try multiple naming patterns
    const patterns = [
        dirName + '.test.js',  // e.g., "739dailyTemperatures.test.js"
        dirName.replace(/^\d+/, '') + '.test.js',  // Remove leading numbers: "dailyTemperatures.test.js"
    ];
    
    let found = false;
    for (const pattern of patterns) {
        const potentialPath = path.join(dirFullPath, pattern);
        if (fs.existsSync(potentialPath)) {
            testFile = potentialPath;
            found = true;
            break;
        }
    }
    
    // If still not found, search for any .test.js file in the directory
    if (!found && fs.existsSync(dirFullPath)) {
        const files = fs.readdirSync(dirFullPath);
        const testFiles = files.filter(f => f.endsWith('.test.js'));
        if (testFiles.length === 1) {
            testFile = path.join(dirFullPath, testFiles[0]);
            found = true;
        }
    }
    
    if (!found) {
        console.error(`Error: Could not find test file in "${dirPath}"`);
        process.exit(1);
    }
} else {
    // Just problem name: 739dailyTemperatures
    // Try to find it in common directories
    const searchDirs = ['neetcode', 'core-algorithms'];
    let found = false;
    
    for (const dir of searchDirs) {
        const dirPath = path.join(dir, problemPath);
        const dirFullPath = path.resolve(dirPath);
        
        if (!fs.existsSync(dirFullPath)) {
            continue;
        }
        
        // Try multiple naming patterns
        const patterns = [
            problemPath + '.test.js',  // e.g., "739dailyTemperatures.test.js"
            problemPath.replace(/^\d+/, '') + '.test.js',  // Remove leading numbers: "dailyTemperatures.test.js"
        ];
        
        for (const pattern of patterns) {
            const potentialPath = path.join(dirFullPath, pattern);
            if (fs.existsSync(potentialPath)) {
                testFile = potentialPath;
                found = true;
                break;
            }
        }
        
        // If still not found, search for any .test.js file in the directory
        if (!found) {
            const files = fs.readdirSync(dirFullPath);
            const testFiles = files.filter(f => f.endsWith('.test.js'));
            if (testFiles.length === 1) {
                testFile = path.join(dirFullPath, testFiles[0]);
                found = true;
            }
        }
        
        if (found) break;
    }
    
    if (!found) {
        console.error(`Error: Could not find test file for "${problemPath}"`);
        console.error(`Searched in: ${searchDirs.join(', ')}`);
        process.exit(1);
    }
}

const resolvedTestFile = path.resolve(testFile);

if (!fs.existsSync(resolvedTestFile)) {
    console.error(`Error: Test file not found: ${resolvedTestFile}`);
    process.exit(1);
}

// Change to the test file's directory so relative imports work correctly
const testDir = path.dirname(resolvedTestFile);
process.chdir(testDir);

// Run the test file
const testProcess = spawn('node', [path.basename(resolvedTestFile)], {
    stdio: 'inherit',
    shell: false
});

testProcess.on('close', (code) => {
    process.exit(code || 0);
});

testProcess.on('error', (error) => {
    console.error('Error running test:', error);
    process.exit(1);
});

