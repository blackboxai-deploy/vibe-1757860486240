"use client";

import React from 'react';

interface CodeDisplayProps {
  className?: string;
}

export default function CodeDisplay({ className = '' }: CodeDisplayProps) {
  const quickSortCode = `function quickSort(arr, low, high) {
  if (low < high) {
    // Choose pivot (rightmost element)
    let pivotIndex = high;
    
    // Partition the array around pivot
    let partitionIndex = partition(arr, low, high);
    
    // Recursively sort elements before partition
    quickSort(arr, low, partitionIndex - 1);
    
    // Recursively sort elements after partition  
    quickSort(arr, partitionIndex + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];  // Choose rightmost as pivot
  let i = low - 1;        // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // If current element <= pivot
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  
  // Place pivot in correct position
  swap(arr, i + 1, high);
  return i + 1;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}`;

  return (
    <div className={`bg-gray-900 rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <h3 className="text-white font-semibold text-sm">QuickSort Implementation</h3>
      </div>
      
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono leading-relaxed">
          <code className="language-javascript">
            {quickSortCode}
          </code>
        </pre>
      </div>
      
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <h4 className="text-white font-semibold mb-1">Time Complexity</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Best Case: O(n log n)</li>
              <li>Average: O(n log n)</li>
              <li>Worst Case: O(n²)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Space Complexity</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Best/Avg: O(log n)</li>
              <li>Worst: O(n)</li>
              <li>In-place: Yes</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">Key Features</h4>
            <ul className="text-gray-300 space-y-1">
              <li>Divide & Conquer</li>
              <li>Unstable Sort</li>
              <li>Cache Efficient</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}