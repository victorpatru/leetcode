/**
 * Dynamic Array (aka a resizable array) class, such as an ArrayList in Java or a vector in C++.
 * 
 * The DynamicArray class supports the following operations:
 * 
 * - DynamicArray(int capacity) will initialize an empty array with a capacity of capacity, where capacity > 0.
 * 
 * - int get(int i) will return the element at index i. Assume that index i is valid.
 * 
 * - void set(int i, int n) will set the element at index i to n. Assume that index i is valid.
 * 
 * - void pushback(int n) will push the element n to the end of the array.
 * 
 * - int popback() will pop and return the element at the end of the array. Assume that the array is non-empty.
 * 
 * - void resize() will double the capacity of the array.
 * 
 * - int getSize() will return the number of elements in the array.
 * 
 * - int getCapacity() will return the capacity of the array.
 * 
 * Note: If we call void pushback(int n) but the array is full, we should resize the array first.
 */
class DynamicArray {
    /**
     * @constructor
     * @param {number} capacity - Initial capacity of the array.
     */
    constructor(capacity) {
        // TODO: implement
    }

    /**
     * Get the value at the i-th index.
     * @param {number} i - The index to get the value from.
     * @returns {number} - The value at the i-th index.
     */
    get(i) {
        // TODO: implement
    }

    /**
     * Set a value at the i-th index.
     * @param {number} i - The index to insert the value at.
     * @param {number} n - The value to insert.
     * @returns {void}
     */
    set(i, n) {
        // TODO: implement
    }

    /**
     * Insert a value in the last position of the array.
     * @param {number} n - The value to insert.
     * @returns {void}
     */
    pushback(n) {
        // TODO: implement
    }

    /**
     * Remove the last element in the array.
     * @returns {number}
     */
    popback() {
        // TODO: implement
    }

    /**
     * Resize the array to double its current capacity.
     * @returns {void}
     */
    resize() {
        // TODO: implement
    }

    /**
     * Get the current size of the array.
     * @returns {number} - The current size.
     */
    getSize() {
        // TODO: implement
    }

    /**
     * Get the current capacity of the array.
     * @returns {number} - The current capacity.
     */
    getCapacity() {
        // TODO: implement
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DynamicArray };
}

