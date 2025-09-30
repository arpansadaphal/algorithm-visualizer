// Simple sleep
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Bubble Sort
export async function bubbleSort(array, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = arr[j + 1].color = "yellow";
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value > arr[j + 1].value) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

      arr[j].color = arr[j + 1].color = "skyblue";
      setArray([...arr]);
    }
    arr[arr.length - i - 1].color = "green";
  }
  arr[0].color = "green";
  setArray([...arr]);
}

// Insertion Sort
export async function insertionSort(array, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j].value > key.value) {
      arr[j + 1] = arr[j];
      arr[j].color = "yellow";
      setArray([...arr]);
      await sleep(speed);
      arr[j].color = "skyblue";
      j--;
    }
    arr[j + 1] = key;
    setArray([...arr]);
  }
  arr.forEach((b) => (b.color = "green"));
  setArray([...arr]);
}

// Selection Sort
export async function selectionSort(array, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].color = "yellow";
      setArray([...arr]);
      await sleep(speed);
      if (arr[j].value < arr[minIndex].value) minIndex = j;
      arr[j].color = "skyblue";
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    arr[i].color = "green";
    setArray([...arr]);
  }
}

// Merge Sort
export async function mergeSort(array, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));

  async function merge(l, m, r) {
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < L.length && j < R.length) {
      arr[k].color = "yellow";
      setArray([...arr]);
      await sleep(speed);
      if (L[i].value <= R[j].value) arr[k++] = L[i++];
      else arr[k++] = R[j++];
    }
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
    setArray([...arr]);
  }

  async function mergeSortHelper(l, r) {
    if (l >= r) return;
    let m = Math.floor((l + r) / 2);
    await mergeSortHelper(l, m);
    await mergeSortHelper(m + 1, r);
    await merge(l, m, r);
  }

  await mergeSortHelper(0, arr.length - 1);
  arr.forEach((b) => (b.color = "green"));
  setArray([...arr]);
}

// Quick Sort
// Quick Sort
export async function quickSort(array, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));

  async function partition(low, high) {
    let pivot = arr[high];
    arr[high].color = "orange"; // mark pivot
    setArray([...arr]);

    let i = low - 1;
    for (let j = low; j < high; j++) {
      arr[j].color = "yellow"; // comparing
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }

      arr[j].color = "skyblue"; // reset
    }

    // place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arr[high].color = "skyblue"; // reset old pivot
    arr[i + 1].color = "green"; // pivot is in final place
    setArray([...arr]);
    await sleep(speed);

    return i + 1;
  }

  async function quickSortHelper(low, high) {
    if (low < high) {
      let pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  }

  await quickSortHelper(0, arr.length - 1);

  // Ensure all sorted
  arr.forEach((b) => (b.color = "green"));
  setArray([...arr]);
}


// Heap Sort
export async function heapSort(array, setArray, speed) {
  let arr = array.map((v) => ({ value: v.value ?? v, color: "skyblue" }));

  async function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l].value > arr[largest].value) largest = l;
    if (r < n && arr[r].value > arr[largest].value) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep(speed);
      await heapify(n, largest);
    }
  }

  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    arr[i].color = "green";
    setArray([...arr]);
    await sleep(speed);
    await heapify(i, 0);
  }
  arr[0].color = "green";
  setArray([...arr]);
}
