// searchingAlgorithms.js

// Simple sleep function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Linear Search
export async function linearSearch(array, target, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));
  for (let i = 0; i < arr.length; i++) {
    arr[i].color = "yellow";
    setArray([...arr]);
    await sleep(speed);

    if (arr[i].value === target) {
      arr[i].color = "green";
      setArray([...arr]);
      return;
    } else {
      arr[i].color = "red";
      setArray([...arr]);
      await sleep(speed);
      arr[i].color = "skyblue";
      setArray([...arr]);
    }
  }
}

// Binary Search
export async function binarySearch(array, target, setArray, speed) {
  let arr = array
    .map((v) => ({ value: v.value ?? v, color: "skyblue" }))
    .sort((a, b) => a.value - b.value);

  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    arr[mid].color = "yellow";
    setArray([...arr]);
    await sleep(speed);

    if (arr[mid].value === target) {
      arr[mid].color = "green";
      setArray([...arr]);
      return;
    } else if (arr[mid].value < target) low = mid + 1;
    else high = mid - 1;

    arr[mid].color = "skyblue";
    setArray([...arr]);
  }
}
