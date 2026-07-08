function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }

  return -1;
}

let arr = [4, 5, 1, 3, 9];
let result = linearSearch(arr, 5);
console.log("Element found at index", result);