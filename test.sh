#!/bin/bash
# LeetCode test runner - run tests by problem number or name
# Usage: ./test.sh 739, ./test.sh 1, ./test.sh encodeDecodeStrings

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" && node run-test.js "$@"

