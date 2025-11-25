/**
 * Test Renderer using Ink for prettified CLI test output
 * Uses dynamic imports for ESM compatibility
 */

let React, render, Box, Text;
let inkLoaded = false;

async function ensureInkLoaded() {
    if (!inkLoaded) {
        React = (await import('react')).default;
        const inkModule = await import('ink');
        render = inkModule.render;
        Box = inkModule.Box;
        Text = inkModule.Text;
        inkLoaded = true;
    }
}

/**
 * Individual test result component
 */
const TestResult = ({ test, index, total }) => {
    const isPassed = test.passed;
    const statusColor = isPassed ? 'green' : 'red';
    const statusIcon = isPassed ? '✓' : '✗';
    
    return React.createElement(Box, { flexDirection: 'column', marginBottom: 1 },
        React.createElement(Box, null,
            React.createElement(Text, { color: statusColor, bold: true }, statusIcon),
            React.createElement(Text, null, ' '),
            React.createElement(Text, { color: isPassed ? 'gray' : 'white' },
                `[${index + 1}/${total}] ${test.name}`
            )
        ),
        !isPassed && test.error && React.createElement(Box, { marginLeft: 3, flexDirection: 'column' },
            Object.entries(test.error).map(([key, value]) =>
                React.createElement(Box, { key: key, marginTop: 0 },
                    React.createElement(Text, { color: 'gray', dimColor: true },
                        `${key.padEnd(12)}:`
                    ),
                    React.createElement(Text, null, ' '),
                    React.createElement(Text, { color: 'yellow' },
                        typeof value === 'object' ? JSON.stringify(value) : String(value)
                    )
                )
            )
        )
    );
};

/**
 * Complexity validation result component
 */
const ComplexityResult = ({ validation }) => {
    const { solutionName, type, userAnswer, correctAnswer, isCorrect, isFilled } = validation;
    const statusColor = isCorrect ? 'green' : isFilled ? 'red' : 'yellow';
    const statusIcon = isCorrect ? '✓' : isFilled ? '✗' : '⚠';
    const statusText = isCorrect ? 'Correct!' : isFilled ? 'Incorrect' : 'Not filled in';
    
    return React.createElement(Box, { flexDirection: 'column', marginBottom: 1 },
        React.createElement(Box, null,
            React.createElement(Text, { color: statusColor, bold: true }, statusIcon),
            React.createElement(Text, null, ' '),
            React.createElement(Text, { bold: true },
                `${solutionName} - ${type} Complexity:`
            )
        ),
        React.createElement(Box, { marginLeft: 3, flexDirection: 'column' },
            React.createElement(Box, null,
                React.createElement(Text, { color: 'gray', dimColor: true }, 'Your answer:'),
                React.createElement(Text, null, ' '),
                React.createElement(Text, { color: isFilled ? 'white' : 'yellow' },
                    userAnswer || '(not filled in)'
                )
            ),
            React.createElement(Box, null,
                React.createElement(Text, { color: 'gray', dimColor: true }, 'Correct answer:'),
                React.createElement(Text, null, ' '),
                React.createElement(Text, { color: 'green' }, correctAnswer)
            ),
            React.createElement(Box, null,
                React.createElement(Text, { color: statusColor }, statusText)
            )
        )
    );
};

/**
 * Summary component
 */
const Summary = ({ tests, complexity }) => {
    const totalTests = tests.passed + tests.failed;
    const testPassRate = totalTests > 0 ? (tests.passed / totalTests * 100).toFixed(1) : 0;
    const complexityPassRate = complexity.total > 0 
        ? (complexity.passed / complexity.total * 100).toFixed(1) 
        : 0;
    
    return React.createElement(Box, { flexDirection: 'column' },
        React.createElement(Box, { borderStyle: 'round', borderColor: 'cyan', paddingX: 1, marginBottom: 1 },
            React.createElement(Text, { color: 'cyan', bold: true }, 'TEST SUMMARY')
        ),
        React.createElement(Box, { flexDirection: 'column', marginBottom: 1 },
            React.createElement(Box, null,
                React.createElement(Text, { bold: true }, 'Algorithm Tests: '),
                React.createElement(Text, { color: tests.failed === 0 ? 'green' : 'red' },
                    `${tests.passed}/${totalTests} passed`
                ),
                React.createElement(Text, { color: 'gray', dimColor: true },
                    ` (${testPassRate}%)`
                )
            ),
            complexity.total > 0 && React.createElement(Box, null,
                React.createElement(Text, { bold: true }, 'Complexity Analysis: '),
                React.createElement(Text, { color: complexity.passed === complexity.total ? 'green' : 'red' },
                    `${complexity.passed}/${complexity.total} correct`
                ),
                React.createElement(Text, { color: 'gray', dimColor: true },
                    ` (${complexityPassRate}%)`
                )
            )
        ),
        React.createElement(Box, { marginTop: 1 },
            tests.failed === 0 && (complexity.total === 0 || complexity.passed === complexity.total)
                ? React.createElement(Text, { color: 'green', bold: true }, '✓ All tests passed!')
                : React.createElement(Box, { flexDirection: 'column' },
                    tests.failed > 0 && React.createElement(Text, { color: 'red', bold: true },
                        '✗ Some algorithm tests failed'
                    ),
                    complexity.total > 0 && complexity.passed !== complexity.total && React.createElement(Text, { color: 'red', bold: true },
                        '✗ Some complexity answers are incorrect'
                    )
                )
        )
    );
};

/**
 * Main test suite component
 */
const TestSuite = ({ title, subtitle, tests, complexity }) => {
    return React.createElement(Box, { flexDirection: 'column' },
        React.createElement(Box, { marginBottom: 1 },
            React.createElement(Text, { color: 'cyan', bold: true }, title)
        ),
        subtitle && React.createElement(Box, { marginBottom: 1 },
            React.createElement(Text, { color: 'gray', dimColor: true }, subtitle)
        ),
        React.createElement(Box, { marginTop: 1, marginBottom: 1, flexDirection: 'column' },
            tests.map((test, index) =>
                React.createElement(TestResult, {
                    key: index,
                    test: test,
                    index: index,
                    total: tests.length
                })
            )
        ),
        complexity && complexity.validations.length > 0 && React.createElement(Box, { marginTop: 1, marginBottom: 1, flexDirection: 'column' },
            React.createElement(Box, { marginBottom: 1 },
                React.createElement(Text, { color: 'cyan', bold: true }, 'Big O Complexity Validation:')
            ),
            complexity.validations.map((validation, index) =>
                React.createElement(ComplexityResult, { key: index, validation: validation })
            )
        ),
        React.createElement(Box, { marginTop: 1 },
            React.createElement(Summary, {
                tests: { passed: tests.filter(t => t.passed).length, failed: tests.filter(t => !t.passed).length },
                complexity: complexity || { passed: 0, total: 0 }
            })
        )
    );
};

/**
 * Render test results using Ink
 * @param {Object} config - Test configuration
 * @param {string} config.title - Test suite title
 * @param {string} [config.subtitle] - Optional subtitle
 * @param {Array} config.tests - Array of test results
 * @param {Object} [config.complexity] - Complexity validation results
 * @returns {Promise} Resolves when rendering is complete
 */
async function renderTestResults(config) {
    await ensureInkLoaded();
    
    return new Promise((resolve) => {
        const passed = config.tests.filter(t => t.passed).length;
        const failed = config.tests.filter(t => !t.passed).length;
        
        const { unmount, waitUntilExit } = render(
            React.createElement(TestSuite, {
                title: config.title,
                subtitle: config.subtitle,
                tests: config.tests,
                complexity: config.complexity
            })
        );
        
        // Auto-unmount after a brief delay to ensure rendering completes
        setTimeout(() => {
            unmount();
            resolve();
        }, 100);
        
        // Also resolve when user exits (Ctrl+C)
        waitUntilExit().then(() => resolve()).catch(() => resolve());
    });
}

module.exports = {
    renderTestResults,
    TestSuite,
    TestResult,
    ComplexityResult,
    Summary
};
