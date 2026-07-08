function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((right + left) / 2);

    if (target === arr[middle]) {
      return middle;
    } else if (target < arr[middle]) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return -1;
}

let arr = [4, 5, 6, 7, 8];
let result = binarySearch(arr, 8);
console.log("Element found at index", result);