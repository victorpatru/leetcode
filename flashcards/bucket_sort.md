What is the core idea of bucket sort? #bucket-sort
---
Count how many times each value in a known range appears, then rewrite the array in sorted order using these counts.
===

When is bucket sort a good choice? #bucket-sort
---
When all input values fit inside a small, fixed, known range.
===

Why can bucket sort run in O(n) time? #bucket-sort
---
Because counting frequencies and rewriting elements together require only one pass each.
===

Why isn’t the nested loop in bucket sort O(n²)? #bucket-sort
---
Each inner loop runs only counts[value] times, and the total of all counts equals n.
===

What space does bucket sort require? #bucket-sort
---
O(k) for k buckets, where k is the range size.
===

Is bucket sort stable? #bucket-sort
---
No — rewriting the array destroys the original relative order.
===

What is a major limitation of bucket sort? #bucket-sort
---
It only works efficiently when the value range is small relative to n.
===

What key limitation makes bucket sort less practical than merge sort or quicksort? #bucket-sort
---
Bucket sort needs data to fall into a known, limited range; comparison sorts don’t assume this
===
