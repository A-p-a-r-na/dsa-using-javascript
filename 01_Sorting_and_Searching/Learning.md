# DSA — Sorting & Searching in JavaScript
### Complete Notes, Algorithms, Methods & Interview Questions

---

## Table of Contents

### SORTING
1. [What is Sorting?](#1-what-is-sorting)
2. [Sorting Terminology](#2-sorting-terminology)
3. [Bubble Sort](#3-bubble-sort)
4. [Selection Sort](#4-selection-sort)
5. [Insertion Sort](#5-insertion-sort)
6. [Merge Sort](#6-merge-sort)
7. [Quick Sort](#7-quick-sort)
8. [Heap Sort](#8-heap-sort)
9. [Counting Sort](#9-counting-sort)
10. [Radix Sort](#10-radix-sort)
11. [Bucket Sort](#11-bucket-sort)
12. [Shell Sort](#12-shell-sort)
13. [JavaScript Built-in Sort](#13-javascript-built-in-sort)
14. [Sorting Algorithm Comparison](#14-sorting-algorithm-comparison)

### SEARCHING
15. [What is Searching?](#15-what-is-searching)
16. [Linear Search](#16-linear-search)
17. [Binary Search](#17-binary-search)
18. [Binary Search Variants](#18-binary-search-variants)
19. [Jump Search](#19-jump-search)
20. [Interpolation Search](#20-interpolation-search)
21. [Exponential Search](#21-exponential-search)
22. [Ternary Search](#22-ternary-search)
23. [Searching in 2D Arrays](#23-searching-in-2d-arrays)
24. [Searching Algorithm Comparison](#24-searching-algorithm-comparison)

### INTERVIEW PROBLEMS
25. [Sorting Interview Problems](#25-sorting-interview-problems)
26. [Searching Interview Problems](#26-searching-interview-problems)
27. [Mixed Problems](#27-mixed-problems)
28. [Pattern Recognition Guide](#28-pattern-recognition-guide)

---

# SORTING

---

## 1. What is Sorting?

Sorting is the process of **arranging elements in a specific order** — typically ascending or descending.

### Why Sorting Matters in DSA
- Makes **searching faster** (binary search requires sorted input)
- Helps **eliminate duplicates**
- Enables **two-pointer** and **sliding window** techniques
- Required for many **greedy algorithms**
- Simplifies many **interval** problems

### Two Broad Categories

| Category | Description | Examples |
|---|---|---|
| **Comparison-based** | Compare elements pairwise | Bubble, Selection, Merge, Quick, Heap |
| **Non-comparison** | Use element values directly | Counting, Radix, Bucket |

> **Lower bound for comparison sorts: O(n log n)** — proven mathematically. Non-comparison sorts can beat this.

---

## 2. Sorting Terminology

```
Stable Sort    — Equal elements maintain their original relative order
               — [3a, 1, 3b] sorted → [1, 3a, 3b] (a before b preserved)

In-place Sort  — Sorts within the original array, O(1) extra space
               — Bubble, Selection, Insertion, Heap, Quick (mostly)

Adaptive Sort  — Performs better when input is partially sorted
               — Insertion Sort, Timsort

Online Sort    — Can sort a stream of data as it arrives
               — Insertion Sort

External Sort  — Designed for data too large for RAM (uses disk)
               — External Merge Sort
```

---

## 3. Bubble Sort

### Concept
Repeatedly **compares adjacent elements** and swaps them if they are in the wrong order. The largest element "bubbles up" to the end in each pass.

### Visualization
```
[5, 3, 8, 1, 2]

Pass 1: [3,5,8,1,2] → [3,5,8,1,2] → [3,5,1,8,2] → [3,5,1,2,8] ← 8 in place
Pass 2: [3,5,1,2,8] → [3,1,5,2,8] → [3,1,2,5,8] ← 5 in place
Pass 3: [1,3,2,5,8] → [1,2,3,5,8] ← 3 in place
Pass 4: [1,2,3,5,8] ← already sorted
```

### Implementation

```js
// Basic Bubble Sort
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Optimized Bubble Sort — stops early if already sorted
function bubbleSortOptimized(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps in a pass — array is sorted, stop early
    if (!swapped) break;
  }
  return arr;
}

// Test
console.log(bubbleSortOptimized([5, 3, 8, 1, 2])); // [1, 2, 3, 5, 8]
console.log(bubbleSortOptimized([1, 2, 3, 4, 5])); // Already sorted — O(n)
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best (sorted) | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst (reverse) | O(n²) | O(1) |

**Properties:** Stable ✅ | In-place ✅ | Adaptive ✅ (optimized version)

**When to use:** Teaching purposes, nearly-sorted small arrays. Almost never in production.

---

## 4. Selection Sort

### Concept
Divides the array into **sorted** and **unsorted** portions. Repeatedly **finds the minimum** from the unsorted portion and places it at the beginning of the unsorted portion.

### Visualization
```
[5, 3, 8, 1, 2]

Pass 1: find min(5,3,8,1,2)=1 → swap with index 0 → [1, 3, 8, 5, 2]
Pass 2: find min(3,8,5,2)=2   → swap with index 1 → [1, 2, 8, 5, 3]
Pass 3: find min(8,5,3)=3     → swap with index 2 → [1, 2, 3, 5, 8]
Pass 4: find min(5,8)=5       → already in place  → [1, 2, 3, 5, 8]
```

### Implementation

```js
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i; // Assume current position has minimum

    // Find actual minimum in unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap minimum to its correct position
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

// Variation: Selection Sort finding maximum (place at end)
function selectionSortMax(arr) {
  const n = arr.length;

  for (let i = n - 1; i > 0; i--) {
    let maxIndex = 0;

    for (let j = 1; j <= i; j++) {
      if (arr[j] > arr[maxIndex]) maxIndex = j;
    }

    [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
  }
  return arr;
}

console.log(selectionSort([5, 3, 8, 1, 2])); // [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(n²) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

**Properties:** Stable ❌ (default) | In-place ✅ | Adaptive ❌

**Key insight:** Makes exactly O(n) swaps — useful when write operations are expensive.

---

## 5. Insertion Sort

### Concept
Builds the sorted array **one element at a time** by picking elements from the unsorted portion and **inserting them into their correct position** in the sorted portion.

### Visualization
```
[5, 3, 8, 1, 2]

Start:  [5] | [3, 8, 1, 2]
Step 1: [3, 5] | [8, 1, 2]       — insert 3 before 5
Step 2: [3, 5, 8] | [1, 2]       — 8 already in place
Step 3: [1, 3, 5, 8] | [2]       — insert 1 at beginning
Step 4: [1, 2, 3, 5, 8]          — insert 2 between 1 and 3
```

### Implementation

```js
// Basic Insertion Sort
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i]; // Element to insert
    let j = i - 1;

    // Shift elements greater than key one position right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key; // Insert key at correct position
  }
  return arr;
}

// Binary Insertion Sort — uses binary search to find insertion position
function binaryInsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let left = 0;
    let right = i - 1;

    // Binary search for insertion position
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > key) right = mid - 1;
      else left = mid + 1;
    }

    // Shift elements to make room
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = key;
  }
  return arr;
}

console.log(insertionSort([5, 3, 8, 1, 2])); // [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best (sorted) | O(n) | O(1) |
| Average | O(n²) | O(1) |
| Worst (reverse) | O(n²) | O(1) |

**Properties:** Stable ✅ | In-place ✅ | Adaptive ✅ | Online ✅

**When to use:** Small arrays (< 20 elements), nearly-sorted data, online sorting. Used in **Timsort** (Python/Java's built-in sort) for small subarrays.

---

## 6. Merge Sort

### Concept
**Divide and Conquer** approach:
1. **Divide** array in half recursively until single elements
2. **Merge** the sorted halves back together

### Visualization
```
[5, 3, 8, 1, 2]

         [5, 3, 8, 1, 2]
        /               \
    [5, 3, 8]         [1, 2]
    /       \          /   \
  [5, 3]   [8]      [1]   [2]
  /    \
[5]   [3]

Merge up:
[3, 5] + [8] → [3, 5, 8]
[1] + [2]   → [1, 2]
[3,5,8] + [1,2] → [1, 2, 3, 5, 8]
```

### Implementation

```js
// Recursive Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // Base case

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append remaining elements
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// In-place Merge Sort (O(1) extra space — more complex)
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  mergeSortInPlace(arr, left, mid);
  mergeSortInPlace(arr, mid + 1, right);
  mergeInPlace(arr, left, mid, right);

  return arr;
}

function mergeInPlace(arr, left, mid, right) {
  const temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) temp.push(arr[i++]);
    else temp.push(arr[j++]);
  }

  while (i <= mid) temp.push(arr[i++]);
  while (j <= right) temp.push(arr[j++]);

  for (let k = 0; k < temp.length; k++) {
    arr[left + k] = temp[k];
  }
}

// Count inversions using Merge Sort
function countInversions(arr) {
  let count = 0;

  function mergeSortCount(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortCount(arr.slice(0, mid));
    const right = mergeSortCount(arr.slice(mid));
    return mergeCount(left, right);
  }

  function mergeCount(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        count += left.length - i; // All remaining left elements form inversions
        result.push(right[j++]);
      }
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }

  mergeSortCount(arr);
  return count;
}

console.log(mergeSort([5, 3, 8, 1, 2]));    // [1, 2, 3, 5, 8]
console.log(countInversions([5, 3, 8, 1, 2])); // 6
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(n log n) | O(n) |
| Average | O(n log n) | O(n) |
| Worst | O(n log n) | O(n) |

**Properties:** Stable ✅ | In-place ❌ (O(n) space) | Adaptive ❌

**When to use:** When stability is required, linked lists, external sorting, counting inversions. **Guaranteed O(n log n)** — never degrades.

---

## 7. Quick Sort

### Concept
**Divide and Conquer**:
1. Pick a **pivot** element
2. **Partition** — elements less than pivot go left, greater go right
3. **Recursively sort** both partitions

### Visualization
```
[5, 3, 8, 1, 2]  pivot = 5

Partition: [3, 1, 2] | 5 | [8]
              ↓               ↓
Partition: [1,2,3] | 5 | [8]

Result: [1, 2, 3, 5, 8]
```

### Implementation

```js
// Quick Sort with Lomuto partition scheme
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);  // Sort left partition
    quickSort(arr, pivotIndex + 1, high); // Sort right partition
  }
  return arr;
}

// Lomuto Partition — last element as pivot
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1; // Index of smaller element

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot
  return i + 1;
}

// Hoare Partition — more efficient (fewer swaps)
function quickSortHoare(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const p = hoarePartition(arr, low, high);
    quickSortHoare(arr, low, p);
    quickSortHoare(arr, p + 1, high);
  }
  return arr;
}

function hoarePartition(arr, low, high) {
  const pivot = arr[low];
  let i = low - 1;
  let j = high + 1;

  while (true) {
    do { i++; } while (arr[i] < pivot);
    do { j--; } while (arr[j] > pivot);
    if (i >= j) return j;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Randomized Quick Sort — avoids worst case on sorted input
function quickSortRandom(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Random pivot selection
    const randIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    [arr[randIndex], arr[high]] = [arr[high], arr[randIndex]];

    const pivotIndex = partition(arr, low, high);
    quickSortRandom(arr, low, pivotIndex - 1);
    quickSortRandom(arr, pivotIndex + 1, high);
  }
  return arr;
}

// 3-Way Quick Sort (Dutch National Flag) — handles duplicates efficiently
function quickSort3Way(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return arr;

  const pivot = arr[low];
  let lt = low;   // arr[low..lt-1] < pivot
  let gt = high;  // arr[gt+1..high] > pivot
  let i = low + 1;

  while (i <= gt) {
    if (arr[i] < pivot) {
      [arr[lt], arr[i]] = [arr[i], arr[lt]];
      lt++;
      i++;
    } else if (arr[i] > pivot) {
      [arr[i], arr[gt]] = [arr[gt], arr[i]];
      gt--;
    } else {
      i++;
    }
  }

  quickSort3Way(arr, low, lt - 1);
  quickSort3Way(arr, gt + 1, high);
  return arr;
}

console.log(quickSort([5, 3, 8, 1, 2]));        // [1, 2, 3, 5, 8]
console.log(quickSort3Way([3, 3, 1, 5, 3, 2])); // [1, 2, 3, 3, 3, 5]
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(n log n) | O(log n) |
| Average | O(n log n) | O(log n) |
| Worst (sorted + bad pivot) | O(n²) | O(n) |

**Properties:** Stable ❌ | In-place ✅ | Adaptive ❌

**When to use:** General purpose sorting when average performance matters. **Fastest in practice** due to cache efficiency. Use randomized pivot to avoid worst case.

---

## 8. Heap Sort

### Concept
1. Build a **Max Heap** from the array
2. Repeatedly **extract the maximum** (root) and place it at the end

### Implementation

```js
function heapSort(arr) {
  const n = arr.length;

  // Phase 1: Build Max Heap
  // Start from last non-leaf node and heapify down
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Phase 2: Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Move max to end
    heapify(arr, i, 0);                  // Restore heap property
  }

  return arr;
}

// Heapify subtree rooted at index i in array of size n
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest); // Recursively heapify the affected subtree
  }
}

// Min Heap Sort (ascending with min heap — for finding K smallest)
class MinHeap {
  constructor() { this.heap = []; }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown();
    }
    return min;
  }

  bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  siftDown() {
    let i = 0;
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }

  get size() { return this.heap.length; }
  peek() { return this.heap[0]; }
}

console.log(heapSort([5, 3, 8, 1, 2])); // [1, 2, 3, 5, 8]
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(n log n) | O(1) |
| Average | O(n log n) | O(1) |
| Worst | O(n log n) | O(1) |

**Properties:** Stable ❌ | In-place ✅ | Adaptive ❌

**When to use:** When guaranteed O(n log n) + O(1) space is needed. Great for **K largest/smallest** problems.

---

## 9. Counting Sort

### Concept
Not comparison-based. **Counts occurrences** of each value and reconstructs the sorted array. Works only for **integers within a known range**.

### Implementation

```js
// Basic Counting Sort
function countingSort(arr) {
  if (arr.length === 0) return arr;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Step 1: Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }

  // Step 2: Cumulative count (prefix sum)
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Build output (traverse in reverse for stability)
  for (let i = arr.length - 1; i >= 0; i--) {
    output[--count[arr[i] - min]] = arr[i];
  }

  return output;
}

// Counting Sort for strings by character at index d
function countingSortByChar(arr, d) {
  const R = 256; // ASCII range
  const count = new Array(R + 1).fill(0);
  const output = new Array(arr.length);

  for (const str of arr) {
    count[(str.charCodeAt(d) || 0) + 1]++;
  }
  for (let r = 0; r < R; r++) {
    count[r + 1] += count[r];
  }
  for (const str of arr) {
    output[count[str.charCodeAt(d) || 0]++] = str;
  }
  return output;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]
```

### Complexity

| Case | Time | Space |
|---|---|---|
| All cases | O(n + k) | O(n + k) |

where `k` = range of input values.

**Properties:** Stable ✅ | In-place ❌ | Adaptive ❌

**When to use:** Integer inputs with small range (k = O(n)). Fastest possible when applicable.

---

## 10. Radix Sort

### Concept
Sorts numbers **digit by digit** from least significant to most significant (LSD) or vice versa, using counting sort at each digit.

### Implementation

```js
// LSD Radix Sort
function radixSort(arr) {
  const max = Math.max(...arr);

  // Sort by each digit (1s, 10s, 100s, ...)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output (right to left for stability)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[--count[digit]] = arr[i];
  }

  for (let i = 0; i < n; i++) arr[i] = output[i];
}

// Radix Sort for strings (by character position)
function radixSortStrings(arr) {
  if (arr.length === 0) return arr;
  const maxLen = Math.max(...arr.map(s => s.length));

  // Pad strings to equal length
  const padded = arr.map(s => s.padEnd(maxLen, '\0'));

  // Sort from last character to first
  for (let d = maxLen - 1; d >= 0; d--) {
    padded.sort((a, b) => a.charCodeAt(d) - b.charCodeAt(d));
  }

  return padded.map(s => s.replace(/\0+$/, ''));
}

console.log(radixSort([170, 45, 75, 90, 802, 24, 2, 66]));
// [2, 24, 45, 66, 75, 90, 170, 802]
```

### Complexity

| Case | Time | Space |
|---|---|---|
| All cases | O(d × (n + k)) | O(n + k) |

where `d` = number of digits, `k` = base (10 for decimal).

**Properties:** Stable ✅ | In-place ❌

**When to use:** Large arrays of integers/strings with bounded length.

---

## 11. Bucket Sort

### Concept
Distributes elements into **buckets**, sorts each bucket individually (usually with insertion sort), then concatenates them.

### Implementation

```js
function bucketSort(arr, bucketCount = 5) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);

  // Create empty buckets
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (const num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize);
    const safeIndex = Math.min(bucketIndex, bucketCount - 1);
    buckets[safeIndex].push(num);
  }

  // Sort each bucket and concatenate
  return buckets.flatMap(bucket => bucket.sort((a, b) => a - b));
}

// Bucket Sort for floats in [0, 1)
function bucketSortFloat(arr) {
  const n = arr.length;
  const buckets = Array.from({ length: n }, () => []);

  for (const num of arr) {
    const idx = Math.floor(num * n);
    buckets[idx].push(num);
  }

  return buckets.flatMap(b => b.sort((a, b) => a - b));
}

console.log(bucketSort([5, 3, 8, 1, 2, 9, 4, 7, 6])); // [1,2,3,4,5,6,7,8,9]
console.log(bucketSortFloat([0.78, 0.17, 0.39, 0.26, 0.72])); // sorted
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best/Average | O(n + k) | O(n + k) |
| Worst | O(n²) | O(n + k) |

**When to use:** Uniformly distributed data, floating-point numbers.

---

## 12. Shell Sort

### Concept
Improved Insertion Sort. Sorts elements far apart first, then reduces the gap, ending with gap=1 (standard insertion sort). Allows elements to move long distances quickly.

### Implementation

```js
function shellSort(arr) {
  const n = arr.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    // Do gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}

// Shell Sort with Knuth's sequence (1, 4, 13, 40, 121, ...)
function shellSortKnuth(arr) {
  const n = arr.length;

  // Generate Knuth gap sequence
  let gap = 1;
  while (gap < Math.floor(n / 3)) gap = 3 * gap + 1;

  while (gap >= 1) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 3);
  }
  return arr;
}

console.log(shellSort([5, 3, 8, 1, 2])); // [1, 2, 3, 5, 8]
```

### Complexity

| Gap Sequence | Time |
|---|---|
| n/2, n/4, ... | O(n²) worst |
| Knuth's | O(n^(3/2)) |
| Ciura's | ~O(n log² n) |

---

## 13. JavaScript Built-in Sort

### `Array.prototype.sort()`

```js
// Default sort — converts to strings and sorts lexicographically
[10, 9, 2, 1, 100].sort(); // [1, 10, 100, 2, 9] ❌ WRONG for numbers!

// Correct numeric sort
[10, 9, 2, 1, 100].sort((a, b) => a - b); // [1, 2, 9, 10, 100] ✅ ascending
[10, 9, 2, 1, 100].sort((a, b) => b - a); // [100, 10, 9, 2, 1] ✅ descending

// Sort objects by property
const users = [
  { name: "Charlie", age: 35 },
  { name: "Alice",   age: 30 },
  { name: "Bob",     age: 25 },
];

// Sort by age ascending
users.sort((a, b) => a.age - b.age);

// Sort by name alphabetically
users.sort((a, b) => a.name.localeCompare(b.name));

// Multi-key sort (primary: age, secondary: name)
users.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));

// Sort strings
["banana", "apple", "cherry"].sort(); // ["apple", "banana", "cherry"]

// Sort by string length
["banana", "apple", "kiwi"].sort((a, b) => a.length - b.length);
// ["kiwi", "apple", "banana"]

// Sort with locale awareness
["ä", "z", "a"].sort((a, b) => a.localeCompare(b, "de")); // German locale

// Stable sort — guaranteed in modern JS engines (V8 >= 7.0, Node >= 11)
// Equal elements maintain original order
```

### Comparator Return Values

```
compareFn(a, b):
  < 0  →  a comes BEFORE b
  > 0  →  b comes BEFORE a
  = 0  →  order unchanged (stable)
```

---

## 14. Sorting Algorithm Comparison

| Algorithm | Best | Average | Worst | Space | Stable | Notes |
|---|---|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ | Teaching only |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ | Min swaps |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ | Best for small/nearly sorted |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ | Guaranteed, stable |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ | Fastest in practice |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ | In-place + guaranteed |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ | Integers only |
| Radix Sort | O(dn) | O(dn) | O(dn) | O(n+k) | ✅ | Integers/strings |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | O(n) | ✅ | Uniform data |
| Shell Sort | O(n log n) | varies | O(n²) | O(1) | ❌ | Good in practice |

### Which to Choose?

```
Need stable sort?              → Merge Sort or Timsort
Need O(1) space?               → Heap Sort or Quick Sort
Need guaranteed O(n log n)?    → Merge Sort or Heap Sort
Small array (< 20)?            → Insertion Sort
Nearly sorted?                 → Insertion Sort
Integer range known?           → Counting Sort or Radix Sort
General purpose?               → Quick Sort (randomized)
JavaScript built-in?           → Array.sort() — Timsort
```

---

# SEARCHING

---

## 15. What is Searching?

Searching is the process of **finding an element** (or its position) within a data structure.

### Types of Searching
- **Sequential / Linear** — check every element
- **Interval-based** — divide search space (Binary, Ternary)
- **Hashing** — O(1) average (Hash Maps)
- **Tree-based** — BST search O(log n)

---

## 16. Linear Search

### Concept
Check **each element one by one** until found or end of array.

### Implementation

```js
// Basic Linear Search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // Return index
  }
  return -1; // Not found
}

// Find all occurrences
function linearSearchAll(arr, target) {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) indices.push(i);
  }
  return indices;
}

// Linear Search with predicate
function linearSearchBy(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}

// Sentinel Linear Search — avoids checking boundary each iteration
function sentinelSearch(arr, target) {
  const n = arr.length;
  const last = arr[n - 1];
  arr[n - 1] = target; // Set sentinel

  let i = 0;
  while (arr[i] !== target) i++;

  arr[n - 1] = last; // Restore
  if (i < n - 1 || last === target) return i;
  return -1;
}

console.log(linearSearch([5, 3, 8, 1, 2], 8));  // 2
console.log(linearSearch([5, 3, 8, 1, 2], 99)); // -1
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(1) | O(1) |
| Average | O(n) | O(1) |
| Worst | O(n) | O(1) |

**When to use:** Unsorted arrays, small arrays, single search on unsorted data.

---

## 17. Binary Search

### Concept
Works on **sorted arrays**. Divides the search space in half at each step by comparing the target with the middle element.

### Visualization
```
arr = [1, 2, 3, 5, 8, 13, 21], target = 8

left=0, right=6, mid=3 → arr[3]=5 < 8 → search right half
left=4, right=6, mid=5 → arr[5]=13 > 8 → search left half
left=4, right=4, mid=4 → arr[4]=8 = 8 → FOUND at index 4
```

### Implementation

```js
// Iterative Binary Search — preferred (no stack overflow risk)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // const mid = left + Math.floor((right - left) / 2); // Overflow-safe

    if (arr[mid] === target) return mid;      // Found
    if (arr[mid] < target)  left = mid + 1;  // Search right
    else                    right = mid - 1; // Search left
  }

  return -1; // Not found
}

// Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1; // Base case: not found

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target)  return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

// Binary Search returning insertion point (like Python's bisect)
function bisectLeft(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left; // Leftmost insertion position
}

function bisectRight(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) left = mid + 1;
    else right = mid;
  }
  return left; // Rightmost insertion position
}

const arr = [1, 2, 3, 5, 8, 13, 21];
console.log(binarySearch(arr, 8));  // 4
console.log(binarySearch(arr, 99)); // -1
console.log(bisectLeft([1,2,3,3,3,5], 3));  // 2
console.log(bisectRight([1,2,3,3,3,5], 3)); // 5
```

### Complexity

| Case | Time | Space (iterative) |
|---|---|---|
| Best | O(1) | O(1) |
| Average | O(log n) | O(1) |
| Worst | O(log n) | O(1) |

**When to use:** Any sorted array search problem. Very commonly tested in interviews.

---

## 18. Binary Search Variants

These are the most important patterns for interviews:

```js
// ── VARIANT 1: Find First Occurrence ──────────────────────
function findFirst(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // Keep searching LEFT for earlier occurrence
    } else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}

// ── VARIANT 2: Find Last Occurrence ───────────────────────
function findLast(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      left = mid + 1; // Keep searching RIGHT for later occurrence
    } else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}

// ── VARIANT 3: Count occurrences of target ─────────────────
function countOccurrences(arr, target) {
  const first = findFirst(arr, target);
  if (first === -1) return 0;
  return findLast(arr, target) - first + 1;
}

// ── VARIANT 4: Find floor (largest element ≤ target) ──────
function floor(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      result = arr[mid];
      left = mid + 1;
    } else right = mid - 1;
  }
  return result;
}

// ── VARIANT 5: Find ceil (smallest element ≥ target) ──────
function ceil(arr, target) {
  let left = 0, right = arr.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) {
      result = arr[mid];
      right = mid - 1;
    } else left = mid + 1;
  }
  return result;
}

// ── VARIANT 6: Search in Rotated Sorted Array ─────────────
function searchRotated(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    // Check which half is sorted
    if (arr[left] <= arr[mid]) { // Left half is sorted
      if (target >= arr[left] && target < arr[mid]) right = mid - 1;
      else left = mid + 1;
    } else { // Right half is sorted
      if (target > arr[mid] && target <= arr[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

// ── VARIANT 7: Find Peak Element ──────────────────────────
function findPeak(arr) {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < arr[mid + 1]) left = mid + 1;  // Peak is on the right
    else right = mid;                               // Peak is on the left (or mid)
  }
  return left; // Index of peak
}

// ── VARIANT 8: Find minimum in rotated sorted array ───────
function findMinRotated(arr) {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[right]) left = mid + 1; // Min is in right half
    else right = mid;                           // Min is in left half (or mid)
  }
  return arr[left];
}

// ── VARIANT 9: Binary Search on Answer ────────────────────
// Find smallest x such that f(x) is true (f is monotone)
function binarySearchOnAnswer(lo, hi, isValid) {
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (isValid(mid)) hi = mid;  // mid works, try smaller
    else lo = mid + 1;           // mid doesn't work, try larger
  }
  return lo;
}

// Example: Minimum days to make m bouquets
function minDays(bloomDay, m, k) {
  const canMake = (days) => {
    let bouquets = 0, flowers = 0;
    for (const d of bloomDay) {
      if (d <= days) { flowers++; if (flowers === k) { bouquets++; flowers = 0; } }
      else flowers = 0;
    }
    return bouquets >= m;
  };

  return binarySearchOnAnswer(1, Math.max(...bloomDay), canMake);
}

// ── VARIANT 10: Square Root using Binary Search ────────────
function sqrtBinary(n) {
  if (n < 2) return n;
  let left = 1, right = Math.floor(n / 2);
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * mid <= n) { result = mid; left = mid + 1; }
    else right = mid - 1;
  }
  return result;
}

const sorted = [1, 2, 2, 2, 3, 4, 5];
console.log(findFirst(sorted, 2));       // 1
console.log(findLast(sorted, 2));        // 3
console.log(countOccurrences(sorted, 2)); // 3
console.log(searchRotated([4,5,6,7,0,1,2], 0)); // 4
console.log(findPeak([1,2,3,1]));        // 2
console.log(sqrtBinary(16));             // 4
```

---

## 19. Jump Search

### Concept
Checks elements at fixed **jump intervals** (√n), then does linear search in the identified block. Works on **sorted arrays**.

### Implementation

```js
function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n)); // Optimal jump size
  let prev = 0;
  let curr = step;

  // Jump until we find a block where target could be
  while (curr < n && arr[curr] <= target) {
    prev = curr;
    curr += step;
  }

  // Linear search in the block [prev, min(curr, n-1)]
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (arr[i] === target) return i;
    if (arr[i] > target) break;
  }

  return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(jumpSearch(arr, 13)); // 6
console.log(jumpSearch(arr, 6));  // -1
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(1) | O(1) |
| Average/Worst | O(√n) | O(1) |

**When to use:** When binary search's jumping back is costly (e.g., magnetic tapes). Between linear and binary search performance.

---

## 20. Interpolation Search

### Concept
Like binary search but uses **interpolation formula** to guess where the target might be, similar to how humans search a phone book.

### Implementation

```js
function interpolationSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right && target >= arr[left] && target <= arr[right]) {
    if (left === right) {
      return arr[left] === target ? left : -1;
    }

    // Interpolation formula
    const pos = left + Math.floor(
      ((target - arr[left]) / (arr[right] - arr[left])) * (right - left)
    );

    if (arr[pos] === target) return pos;
    if (arr[pos] < target) left = pos + 1;
    else right = pos - 1;
  }

  return -1;
}

const uniformArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(interpolationSearch(uniformArr, 70)); // 6
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(1) | O(1) |
| Average (uniform) | O(log log n) | O(1) |
| Worst (non-uniform) | O(n) | O(1) |

**When to use:** Large, uniformly distributed sorted arrays.

---

## 21. Exponential Search

### Concept
Find a range where the target might exist by **exponentially increasing** the index, then apply binary search in that range.

### Implementation

```js
function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;

  // Find range for binary search
  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i *= 2;
  }

  // Binary search in [i/2, min(i, n-1)]
  return binarySearchInRange(
    arr,
    target,
    Math.floor(i / 2),
    Math.min(i, arr.length - 1)
  );
}

function binarySearchInRange(arr, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log(exponentialSearch(arr, 9)); // 8
```

### Complexity

| Case | Time | Space |
|---|---|---|
| Best | O(1) | O(1) |
| Average/Worst | O(log n) | O(1) |

**When to use:** Unbounded arrays (unknown size), when target is near the beginning.

---

## 22. Ternary Search

### Concept
Like binary search but **divides into three parts**. Used for finding maximum/minimum of **unimodal functions**.

### Implementation

```js
// Ternary search on array — find index of maximum in unimodal array
function ternarySearch(arr, left = 0, right = arr.length - 1) {
  if (right - left < 3) {
    let maxIdx = left;
    for (let i = left + 1; i <= right; i++) {
      if (arr[i] > arr[maxIdx]) maxIdx = i;
    }
    return maxIdx;
  }

  const mid1 = left + Math.floor((right - left) / 3);
  const mid2 = right - Math.floor((right - left) / 3);

  if (arr[mid1] < arr[mid2]) return ternarySearch(arr, mid1 + 1, right);
  if (arr[mid1] > arr[mid2]) return ternarySearch(arr, left, mid2 - 1);
  return ternarySearch(arr, mid1 + 1, mid2 - 1);
}

// Ternary search on continuous function to find maximum
function ternarySearchFunction(lo, hi, f, eps = 1e-9) {
  while (hi - lo > eps) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    if (f(m1) < f(m2)) lo = m1;
    else hi = m2;
  }
  return (lo + hi) / 2;
}

// Example: Find x that maximizes -(x-3)² + 9
const maxX = ternarySearchFunction(-10, 10, x => -(x-3)**2 + 9);
console.log(maxX.toFixed(4)); // ~3.0000
```

### Complexity: O(log₃ n) — slightly worse than binary search for sorted arrays.

---

## 23. Searching in 2D Arrays

```js
// ── Search in Row-wise & Column-wise Sorted Matrix ──────────
// Start from top-right corner: O(m + n)
function searchMatrix(matrix, target) {
  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return [row, col];
    if (matrix[row][col] > target) col--; // Go left
    else row++;                            // Go down
  }
  return [-1, -1];
}

// ── Search in Fully Sorted Matrix (each row continuation of prev) ──
// Treat as 1D array: O(log(m*n))
function searchSortedMatrix(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0, right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n];

    if (val === target) return true;
    if (val < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}

// ── Binary Search on each row ──────────────────────────────
function searchMatrixByRow(matrix, target) {
  for (let row = 0; row < matrix.length; row++) {
    const idx = binarySearch(matrix[row], target);
    if (idx !== -1) return [row, idx];
  }
  return [-1, -1];
}

const matrix = [
  [1,  4,  7,  11],
  [2,  5,  8,  12],
  [3,  6,  9,  16],
  [10, 13, 14, 17],
];
console.log(searchMatrix(matrix, 5));  // [1, 1]
console.log(searchMatrix(matrix, 20)); // [-1, -1]
```

---

## 24. Searching Algorithm Comparison

| Algorithm | Time (avg) | Time (worst) | Space | Requires Sorted |
|---|---|---|---|---|
| Linear Search | O(n) | O(n) | O(1) | No |
| Binary Search | O(log n) | O(log n) | O(1) | Yes |
| Jump Search | O(√n) | O(√n) | O(1) | Yes |
| Interpolation | O(log log n) | O(n) | O(1) | Yes (uniform) |
| Exponential | O(log n) | O(log n) | O(1) | Yes |
| Ternary Search | O(log n) | O(log n) | O(1) | Unimodal |

---

# INTERVIEW PROBLEMS

---

## 25. Sorting Interview Problems

---

### Problem 1: Sort Colors (Dutch National Flag)
**Problem:** Given array with 0s, 1s, 2s — sort in-place in one pass.

```js
function sortColors(nums) {
  let low = 0;               // Boundary for 0s
  let mid = 0;               // Current element
  let high = nums.length - 1; // Boundary for 2s

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else { // nums[mid] === 2
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // Don't increment mid — need to check swapped element
    }
  }
  return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]
```
**Time:** O(n) | **Space:** O(1)

---

### Problem 2: Merge Intervals
**Problem:** Merge all overlapping intervals.

```js
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const current = intervals[i];

    if (current[0] <= last[1]) {
      // Overlapping — extend the last interval
      last[1] = Math.max(last[1], current[1]);
    } else {
      // Non-overlapping — add new interval
      result.push(current);
    }
  }
  return result;
}

console.log(mergeIntervals([[1,3],[2,6],[8,10],[15,18]]));
// [[1,6],[8,10],[15,18]]
```
**Time:** O(n log n) | **Space:** O(n)

---

### Problem 3: K Largest Elements
**Problem:** Find k largest elements in an array.

```js
// Method 1: Sort (simple)
function kLargestSort(arr, k) {
  return arr.sort((a, b) => b - a).slice(0, k);
}

// Method 2: Min Heap of size k — O(n log k)
function kLargestHeap(arr, k) {
  const heap = new MinHeap();

  for (const num of arr) {
    heap.push(num);
    if (heap.size > k) heap.pop(); // Keep only k largest
  }

  return heap.heap; // All k largest elements
}

// Method 3: Quickselect — O(n) average
function kLargest(arr, k) {
  return quickselect(arr, 0, arr.length - 1, arr.length - k);
}

function quickselect(arr, low, high, k) {
  if (low === high) return arr[low];

  const pivotIdx = partition(arr, low, high);

  if (pivotIdx === k) return arr[k];
  if (pivotIdx < k) return quickselect(arr, pivotIdx + 1, high, k);
  return quickselect(arr, low, pivotIdx - 1, k);
}

// Kth Largest Element
function findKthLargest(nums, k) {
  return quickselect(nums, 0, nums.length - 1, nums.length - k);
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
```

---

### Problem 4: Meeting Rooms — Can Attend All?
**Problem:** Given intervals of meetings, check if a person can attend all.

```js
function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}

// Minimum Meeting Rooms Required
function minMeetingRooms(intervals) {
  const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
  const ends   = intervals.map(i => i[1]).sort((a, b) => a - b);

  let rooms = 0, maxRooms = 0, j = 0;

  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[j]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
    } else {
      rooms--;
      j++;
    }
  }
  return maxRooms;
}

console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
console.log(minMeetingRooms([[0,30],[5,10],[15,20]]));   // 2
```

---

### Problem 5: Largest Number from Array of Numbers
**Problem:** Arrange numbers to form the largest possible number.

```js
function largestNumber(nums) {
  const result = nums
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b))
    .join('');

  return result[0] === '0' ? '0' : result; // Handle all zeros case
}

console.log(largestNumber([3, 30, 34, 5, 9])); // "9534330"
console.log(largestNumber([10, 2]));            // "210"
```

---

### Problem 6: Find Duplicate in O(n) time O(1) space
**Problem:** Array contains n+1 numbers from 1 to n. Find the duplicate.

```js
// Floyd's Cycle Detection (Tortoise and Hare)
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  // Phase 1: Detect cycle
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find entry point of cycle
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}

console.log(findDuplicate([1, 3, 4, 2, 2])); // 2
console.log(findDuplicate([3, 1, 3, 4, 2])); // 3
```

---

### Problem 7: Sort Array By Parity
**Problem:** Move even numbers before odd numbers.

```js
// Two-pointer approach
function sortArrayByParity(arr) {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    while (left < right && arr[left] % 2 === 0) left++;
    while (left < right && arr[right] % 2 !== 0) right--;
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    }
  }
  return arr;
}

console.log(sortArrayByParity([3, 1, 2, 4])); // [4, 2, 1, 3]
```

---

## 26. Searching Interview Problems

---

### Problem 8: Binary Search on Answer — Koko Eating Bananas
**Problem:** Find minimum eating speed k such that Koko can eat all bananas in h hours.

```js
function minEatingSpeed(piles, h) {
  const canFinish = (speed) => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };

  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canFinish(mid)) right = mid; // Can finish — try slower
    else left = mid + 1;             // Too slow — try faster
  }
  return left;
}

console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
```

---

### Problem 9: Find Median of Two Sorted Arrays
**Problem:** Find median of two sorted arrays in O(log(min(m,n))).

```js
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);

  const m = nums1.length;
  const n = nums2.length;
  let left = 0, right = m;

  while (left <= right) {
    const partX = Math.floor((left + right) / 2);
    const partY = Math.floor((m + n + 1) / 2) - partX;

    const maxLeftX  = partX === 0 ? -Infinity : nums1[partX - 1];
    const minRightX = partX === m ?  Infinity : nums1[partX];
    const maxLeftY  = partY === 0 ? -Infinity : nums2[partY - 1];
    const minRightY = partY === n ?  Infinity : nums2[partY];

    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      }
      return Math.max(maxLeftX, maxLeftY);
    } else if (maxLeftX > minRightY) {
      right = partX - 1;
    } else {
      left = partX + 1;
    }
  }
}

console.log(findMedianSortedArrays([1, 3], [2]));       // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4]));    // 2.5
```

---

### Problem 10: Search in Rotated Sorted Array II (with duplicates)
**Problem:** Search in rotated sorted array that may have duplicates.

```js
function searchRotatedWithDupes(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return true;

    // Handle duplicates — can't determine sorted half
    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) { // Left half sorted
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else { // Right half sorted
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return false;
}

console.log(searchRotatedWithDupes([2,5,6,0,0,1,2], 0)); // true
console.log(searchRotatedWithDupes([2,5,6,0,0,1,2], 3)); // false
```

---

### Problem 11: Find K Closest Elements
**Problem:** Find k elements closest to x in a sorted array.

```js
function findClosestElements(arr, k, x) {
  let left = 0;
  let right = arr.length - k;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // Compare distances of left and right boundaries
    if (x - arr[mid] > arr[mid + k] - x) left = mid + 1;
    else right = mid;
  }

  return arr.slice(left, left + k);
}

console.log(findClosestElements([1,2,3,4,5], 4, 3)); // [1,2,3,4]
console.log(findClosestElements([1,2,3,4,5], 4, -1)); // [1,2,3,4]
```

---

### Problem 12: First Bad Version
**Problem:** Binary search to find first bad version given `isBadVersion(v)` API.

```js
function solution(isBadVersion) {
  return function(n) {
    let left = 1, right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (isBadVersion(mid)) right = mid;   // Bad — check left half
      else left = mid + 1;                   // Good — check right half
    }
    return left;
  };
}
```

---

### Problem 13: Capacity to Ship Packages Within D Days
**Problem:** Binary search on answer — find minimum capacity to ship all packages in D days.

```js
function shipWithinDays(weights, days) {
  const canShip = (capacity) => {
    let daysNeeded = 1, current = 0;
    for (const w of weights) {
      if (current + w > capacity) { daysNeeded++; current = 0; }
      current += w;
    }
    return daysNeeded <= days;
  };

  let left = Math.max(...weights);        // Min capacity = heaviest package
  let right = weights.reduce((a,b) => a+b, 0); // Max = ship all in 1 day

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canShip(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}

console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5)); // 15
```

---

## 27. Mixed Problems

---

### Problem 14: Two Sum (Sorted Array)
**Problem:** Find two numbers that add up to target in a sorted array.

```js
// Two pointers — O(n) time
function twoSumSorted(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left + 1, right + 1]; // 1-indexed
    if (sum < target) left++;
    else right--;
  }
  return [];
}

// Unsorted — using hash map O(n)
function twoSum(nums, target) {
  const map = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
```

---

### Problem 15: Aggressive Cows — Maximum Minimum Distance
**Problem:** Place C cows in N stalls to maximize minimum distance between any two cows.

```js
function aggressiveCows(stalls, c) {
  stalls.sort((a, b) => a - b);
  const n = stalls.length;

  const canPlace = (minDist) => {
    let count = 1;
    let last = stalls[0];

    for (let i = 1; i < n; i++) {
      if (stalls[i] - last >= minDist) {
        count++;
        last = stalls[i];
        if (count === c) return true;
      }
    }
    return false;
  };

  let left = 1;
  let right = stalls[n - 1] - stalls[0];
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canPlace(mid)) { result = mid; left = mid + 1; }
    else right = mid - 1;
  }
  return result;
}

console.log(aggressiveCows([1, 2, 4, 8, 9], 3)); // 3
```

---

### Problem 16: Find the Rotation Count in Sorted Array
**Problem:** Find how many times a sorted array was rotated.

```js
function rotationCount(arr) {
  let left = 0, right = arr.length - 1;

  // No rotation — already sorted
  if (arr[left] <= arr[right]) return 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[mid + 1]) return mid + 1; // Next is minimum
    if (arr[mid] < arr[mid - 1]) return mid;      // Current is minimum

    if (arr[left] <= arr[mid]) left = mid + 1;
    else right = mid - 1;
  }
  return 0;
}

console.log(rotationCount([4, 5, 1, 2, 3])); // 2
console.log(rotationCount([1, 2, 3, 4, 5])); // 0
```

---

### Problem 17: Allocate Books (Binary Search on Answer)
**Problem:** Given n books, allocate to m students to minimize maximum pages any student reads.

```js
function allocateBooks(pages, m) {
  if (pages.length < m) return -1;

  const canAllocate = (maxPages) => {
    let students = 1, currentPages = 0;
    for (const p of pages) {
      if (p > maxPages) return false; // Single book exceeds limit
      if (currentPages + p > maxPages) { students++; currentPages = 0; }
      currentPages += p;
    }
    return students <= m;
  };

  let left = Math.max(...pages);
  let right = pages.reduce((a, b) => a + b, 0);
  let result = right;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canAllocate(mid)) { result = mid; right = mid - 1; }
    else left = mid + 1;
  }
  return result;
}

console.log(allocateBooks([12, 34, 67, 90], 2)); // 113
```

---

## 28. Pattern Recognition Guide

Use this to quickly identify which algorithm to apply in an interview.

---

### Sorting Patterns

```
"Sort and then..." →
  Sort first to enable two-pointer / binary search

"Rearrange array in O(n)" →
  Counting sort / Dutch National Flag / cyclic sort

"K largest/smallest" →
  Min/Max heap O(n log k) or Quickselect O(n)

"Merge sorted arrays/lists" →
  Merge step from Merge Sort

"Count inversions" →
  Modified Merge Sort

"Overlapping intervals" →
  Sort by start, then greedy merge

"Stable sort required" →
  Merge Sort (not Quick/Heap)

"Sort with limited range integers" →
  Counting Sort or Radix Sort
```

---

### Searching Patterns

```
"Search in sorted array" →
  Binary Search O(log n)

"Find first/last occurrence" →
  Binary Search with result tracking (findFirst/findLast)

"Search in rotated sorted array" →
  Modified Binary Search (check which half is sorted)

"Find peak element" →
  Binary Search on slope

"Minimum/maximum that satisfies condition" →
  Binary Search on Answer (binarySearchOnAnswer)

"Unsorted array, find element" →
  Linear Search or Hash Map

"2D matrix search" →
  Start top-right if row+col sorted
  Treat as 1D if fully sorted

"Find missing/duplicate number" →
  XOR trick or cyclic sort or Floyd's cycle detection

"Closest elements" →
  Binary Search + two pointers

"Infinite/unknown size array" →
  Exponential Search

"Unimodal function — find max" →
  Ternary Search
```

---

### Binary Search on Answer Template

Use when:
- You need to **minimize the maximum** or **maximize the minimum**
- Answer lies in a monotonic range
- You can write an `isValid(mid)` check function

```js
function binarySearchOnAnswer(lo, hi, isValid) {
  // Find minimum valid answer
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (isValid(mid)) hi = mid;   // mid works → try smaller
    else lo = mid + 1;             // mid fails → need larger
  }
  return lo;
}

// Find maximum valid answer
function binarySearchOnAnswerMax(lo, hi, isValid) {
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2); // Upper mid prevents infinite loop
    if (isValid(mid)) lo = mid;    // mid works → try larger
    else hi = mid - 1;             // mid fails → need smaller
  }
  return lo;
}
```

---

### Complexity Quick Reference

```
O(1)        — Hash map lookup, array access
O(log n)    — Binary Search
O(√n)       — Jump Search
O(n)        — Linear Search, Counting Sort
O(n log n)  — Merge Sort, Quick Sort (avg), Heap Sort
O(n²)       — Bubble, Selection, Insertion (worst)
O(n + k)    — Counting Sort (k = range)
O(d × n)    — Radix Sort (d = digits)
```

---

### Must-Know Binary Search Problems List

| Problem | Pattern |
|---|---|
| Binary Search | Basic |
| Search Insert Position | bisectLeft |
| Find First/Last Position | findFirst + findLast |
| Search in Rotated Array | Modified BS |
| Find Minimum in Rotated | Modified BS |
| Peak Index / Find Peak | Slope BS |
| Koko Eating Bananas | BS on Answer |
| Capacity to Ship | BS on Answer |
| Allocate Books | BS on Answer |
| Aggressive Cows | BS on Answer |
| First Bad Version | BS on Answer |
| Sqrt(x) | BS on Answer |
| Median of Two Sorted Arrays | Hard BS |
| K Closest Elements | BS + Window |

---

*This document covers every major sorting and searching algorithm with full implementations, all key variants, and 17+ interview problems — all in JavaScript.*