import React, { useState, useEffect } from "react";
import ArrayBar from "./ArrayBar";
import {
  bubbleSort,
  mergeSort,
  quickSort,
  insertionSort,
  selectionSort,
  heapSort,
} from "./sortingAlgorithms";
import { linearSearch, binarySearch } from "./searchingAlgorithms";
import "./App.css";

export default function App() {
  const [array, setArray] = useState([]);
  const [mode, setMode] = useState("Sorting"); // Sorting or Searching
  const [algo, setAlgo] = useState("Bubble Sort");
  const [speed, setSpeed] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [target, setTarget] = useState(0);
  const [arraySize, setArraySize] = useState(10);

  // Map algorithm to time complexity
  const complexities = {
    "Bubble Sort": "O(n²)",
    "Insertion Sort": "O(n²)",
    "Selection Sort": "O(n²)",
    "Merge Sort": "O(n log n)",
    "Quick Sort": "O(n log n)",
    "Heap Sort": "O(n log n)",
    "Linear Search": "O(n)",
    "Binary Search": "O(log n)",
  };

  // Generate random array
  const generateArray = (size = arraySize) => {
    const arr = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 100),
      color: "skyblue",
    }));
    setArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const handleStart = async () => {
    setIsRunning(true);

    if (mode === "Sorting") {
      switch (algo) {
        case "Bubble Sort":
          await bubbleSort(array, setArray, speed);
          break;
        case "Insertion Sort":
          await insertionSort(array, setArray, speed);
          break;
        case "Selection Sort":
          await selectionSort(array, setArray, speed);
          break;
        case "Merge Sort":
          await mergeSort(array, setArray, speed);
          break;
        case "Quick Sort":
          await quickSort(array, setArray, speed);
          break;
        case "Heap Sort":
          await heapSort(array, setArray, speed);
          break;
        default:
          break;
      }
    } else if (mode === "Searching") {
      switch (algo) {
        case "Linear Search":
          await linearSearch(array, target, setArray, speed);
          break;
        case "Binary Search":
          await binarySearch(array, target, setArray, speed);
          break;
        default:
          break;
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="App">
      <h1>Algorithm Visualizer</h1>

      {/* Mode Selector */}
      <div>
        <label>Mode: </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          disabled={isRunning}
        >
          <option>Sorting</option>
          <option>Searching</option>
        </select>
      </div>

      {/* Algorithm Selector */}
      <div>
        <label>Algorithm: </label>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          disabled={isRunning}
        >
          {mode === "Sorting" ? (
            <>
              <option>Select</option>
              <option>Bubble Sort</option>
              <option>Insertion Sort</option>
              <option>Selection Sort</option>
              <option>Merge Sort</option>
              <option>Quick Sort</option>
              <option>Heap Sort</option>
            </>
          ) : (
            <>
              <option>Select</option>
              <option>Linear Search</option>
              <option>Binary Search</option>
            </>
          )}
        </select>
      </div>

      {/* Target input for searching */}
      {mode === "Searching" && (
        <div>
          <label>Target: </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>
      )}

      {/* Speed slider */}
      <div>
        <label>Speed: </label>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <span> {speed} ms</span>
      </div>

      {/* Array size slider */}
      <div>
        <label>Array Size: </label>
        <input
          type="range"
          min="5"
          max="50"
          step="1"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isRunning}
        />
        <span> {arraySize} elements</span>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => generateArray()} disabled={isRunning}>
          Generate Array
        </button>
        <button onClick={handleStart} disabled={isRunning}>
          {mode === "Sorting" ? "Sort" : "Search"}
        </button>
      </div>

      {/* Complexity Display */}
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>
        Time Complexity: {complexities[algo]}
      </div>

      {/* Legend */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap", // allow wrapping
          gap: "10px",
          rowGap: "8px",
        }}
      >
        {[
          { color: "skyblue", label: "Unvisited" },
          { color: "yellow", label: "Comparing" },
          { color: "red", label: "Not Found" },
          { color: "green", label: "Sorted / Found" },
          { color: "orange", label: "Pivot Element" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              minWidth: "120px", // keeps items balanced
              fontSize: "0.85rem", // smaller text for mobile
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                background: item.color,
                borderRadius: "2px",
              }}
            ></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>


      {/* Array Visualization */}
      <div
        className="array-container"
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "300px",
        }}
      >
        {array.map((bar, index) => (
          <ArrayBar
            key={index}
            value={bar.value}
            color={bar.color}
            size={array.length}
          />
        ))}
      </div>
    </div>
  );
}
