What is a prefix sum? #prefix-sum
---
An array where prefix[i] equals the sum of all elements from index 0 through i.
===

What key ability do prefix sums give you? #prefix-sum
---
They let you compute any subarray sum in O(1).
===

What formula gives the sum of a subarray from i to j using prefix sums? #prefix-sum
---
prefix[j] − prefix[i−1] (or prefix[j] − prefix[i] + nums[i] when i = 0).
===

Why does prefix[j] − prefix[i−1] yield the subarray sum? #prefix-sum
---
Subtracting all elements before i leaves only the elements from i through j.
===

What is the time cost to build a prefix sum array? #prefix-sum
---
O(n).
===

What is the time cost to answer each subarray-sum query using prefix sums? #prefix-sum
---
O(1).
===

What is the total time complexity for m subarray queries on an array of length n? #prefix-sum
---
O(n + m).
===

What is the space complexity of storing a prefix sum array? #prefix-sum
---
O(n).
===

When are prefix sums most useful? #prefix-sum
---
When solving problems that repeatedly ask for subarray sums.
===

Why do prefix sums often improve an algorithm by a factor of O(n)? #prefix-sum
---
They replace each O(n) range-sum calculation with an O(1) lookup.
===

What is preprocessing in algorithm design? #prefix-sum
---
Computing helper information upfront to speed up later operations.
===

Why are prefix sums considered preprocessing? #prefix-sum
---
You pay O(n) once to enable fast O(1) queries later.
===

When can the full prefix array be avoided? #prefix-sum
---
When you only need prefix values in increasing order (e.g., running sums).
===

How can you compute the sum of the “right side” of a split without prefix[i]? #prefix-sum
---
Use total − leftSection.
===

Why is tracking prefix sums with one running variable valid? #prefix-sum
---
Each prefix equals the previous prefix plus the current element.
===

What advantage does a running prefix sum have over storing the prefix array? #prefix-sum
---
It reduces space from O(n) to O(1).
===

What structural property of sums enables prefix sum techniques? #prefix-sum
---
Range sums are decomposable: sum(i, j) = prefix[j] − prefix[i−1].
===

What should you check before deciding to use prefix sums? #prefix-sum
---
Whether your problem needs fast repeated subarray-sum queries.
===
