"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { QuickSortVisualizer, parseArrayInput, generateRandomArray, SortStep } from '@/lib/quicksort';
import ArrayBar from './ArrayBar';
import AlgorithmControls from './AlgorithmControls';
import CodeDisplay from './CodeDisplay';
import StepExplanation from './StepExplanation';

export default function QuickSortVisualizerComponent() {
  // State management
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [arrayInput, setArrayInput] = useState('64, 34, 25, 12, 22, 11, 90');
  const [isValidArray, setIsValidArray] = useState(true);
  
  // Initialize with default array
  useEffect(() => {
    initializeSort([64, 34, 25, 12, 22, 11, 90]);
  }, []);

  // Validate array input
  useEffect(() => {
    if (!arrayInput.trim()) {
      setIsValidArray(true);
      return;
    }
    
    const parsed = parseArrayInput(arrayInput);
    setIsValidArray(parsed !== null);
  }, [arrayInput]);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStepIndex < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  // Initialize sorting process
  const initializeSort = useCallback((array: number[]) => {
    const visualizer = new QuickSortVisualizer();
    const result = visualizer.sort(array);
    setSteps(result.steps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  // Control handlers
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };
  
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };
  
  const handleArrayInputChange = (value: string) => {
    setArrayInput(value);
  };
  
  const handleGenerateRandom = () => {
    const randomArray = generateRandomArray(8, 5, 99);
    setArrayInput(randomArray.join(', '));
    initializeSort(randomArray);
  };
  
  const handleApplyArray = () => {
    const parsed = parseArrayInput(arrayInput);
    if (parsed) {
      initializeSort(parsed);
    }
  };

  // Get current step data
  const currentStep = steps[currentStepIndex];
  const maxValue = steps.length > 0 ? Math.max(...steps[0].array) : 100;

  if (steps.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading visualization...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">
          Interactive QuickSort Visualization
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch how the QuickSort algorithm efficiently sorts an array using the divide-and-conquer approach. 
          Each step shows the partitioning process and recursive sorting.
        </p>
      </div>

      {/* Controls */}
      <AlgorithmControls
        isPlaying={isPlaying}
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        speed={speed}
        arrayInput={arrayInput}
        onPlay={handlePlay}
        onPause={handlePause}
        onStepForward={handleStepForward}
        onStepBackward={handleStepBackward}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
        onArrayInputChange={handleArrayInputChange}
        onGenerateRandom={handleGenerateRandom}
        onApplyArray={handleApplyArray}
        isValidArray={isValidArray}
      />

      {/* Visualization */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Array Visualization</h3>
          <div className="text-sm text-gray-600">
            Current Array: [{currentStep.array.join(', ')}]
          </div>
        </div>
        
        <div className="relative bg-gray-50 rounded-lg p-4" style={{ minHeight: '300px' }}>
          <div className="flex items-end justify-center space-x-1 h-full">
            {currentStep.array.map((value, index) => {
              const isPivot = index === currentStep.pivotIndex;
              const isComparing = currentStep.comparing.includes(index);
              const isSwapping = currentStep.swapping.includes(index);
              const isInRange = currentStep.left !== -1 && currentStep.right !== -1 && 
                               index >= currentStep.left && index <= currentStep.right;
              const isPartitioned = currentStep.partitioned && index === currentStep.pivotIndex;
              
              return (
                <ArrayBar
                  key={`${index}-${value}-${currentStepIndex}`}
                  value={value}
                  index={index}
                  maxValue={maxValue}
                  isPivot={isPivot}
                  isComparing={isComparing}
                  isSwapping={isSwapping}
                  isInRange={isInRange}
                  isPartitioned={isPartitioned}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Explanation and Code */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StepExplanation
          explanation={currentStep.explanation}
          comparisons={currentStep.comparisons}
          swaps={currentStep.swaps}
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          isCompleted={currentStep.completed}
        />
        
        <CodeDisplay />
      </div>

      {/* Educational Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">
          How QuickSort Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Algorithm Steps:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Choose a pivot element (usually the last element)</li>
              <li>Partition: rearrange array so smaller elements come before pivot</li>
              <li>Place pivot in its final sorted position</li>
              <li>Recursively apply QuickSort to sub-arrays</li>
              <li>Continue until all elements are in correct positions</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Advantages:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Fast average-case performance: O(n log n)</li>
              <li>In-place sorting (minimal extra memory)</li>
              <li>Cache-efficient due to good locality of reference</li>
              <li>Widely used in standard libraries</li>
              <li>Performs well on already partially sorted data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}