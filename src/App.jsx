import React, { useState, useEffect } from "react";
import ArrayBar from "./ArrayBar";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
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

  const generateArray = (size = 10) => {
    const arr = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 100),
      color: "skyblue",
    }));
    setArray(arr);
  };

  useEffect(() => {
    generateArray();
  }, []);

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

      {/* Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => generateArray()} disabled={isRunning}>
          Generate Array
        </button>
        <button onClick={handleStart} disabled={isRunning}>
          {mode === "Sorting" ? "Sort" : "Search"}
        </button>
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
          <ArrayBar key={index} value={bar.value} color={bar.color} />
        ))}
      </div>
    </div>
  );
}
