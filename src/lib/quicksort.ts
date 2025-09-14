export interface SortStep {
  array: number[];
  pivotIndex: number;
  left: number;
  right: number;
  comparing: number[];
  swapping: number[];
  partitioned: boolean;
  completed: boolean;
  explanation: string;
  comparisons: number;
  swaps: number;
}

export interface QuickSortResult {
  steps: SortStep[];
  totalComparisons: number;
  totalSwaps: number;
  finalArray: number[];
}

export class QuickSortVisualizer {
  private steps: SortStep[] = [];
  private comparisons = 0;
  private swaps = 0;

  public sort(arr: number[]): QuickSortResult {
    this.steps = [];
    this.comparisons = 0;
    this.swaps = 0;
    
    const array = [...arr];
    
    // Initial step
    this.addStep(array, -1, 0, array.length - 1, [], [], false, false, 
      `Starting QuickSort with array [${array.join(', ')}]. We'll use the rightmost element as pivot.`);
    
    this.quickSort(array, 0, array.length - 1);
    
    // Final step
    this.addStep(array, -1, -1, -1, [], [], false, true,
      `QuickSort completed! Array is now sorted: [${array.join(', ')}]`);
    
    return {
      steps: this.steps,
      totalComparisons: this.comparisons,
      totalSwaps: this.swaps,
      finalArray: array
    };
  }

  private quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
      // Choose pivot (rightmost element)
      const pivotIndex = high;
      this.addStep([...arr], pivotIndex, low, high, [], [], false, false,
        `Sorting subarray from index ${low} to ${high}. Pivot is ${arr[pivotIndex]} at index ${pivotIndex}.`);
      
      // Partition the array
      const partitionIndex = this.partition(arr, low, high);
      
      // Mark partition complete
      this.addStep([...arr], partitionIndex, low, high, [], [], true, false,
        `Partition complete! Pivot ${arr[partitionIndex]} is now in its final position at index ${partitionIndex}.`);
      
      // Recursively sort elements before and after partition
      if (partitionIndex - 1 > low) {
        this.addStep([...arr], -1, low, partitionIndex - 1, [], [], false, false,
          `Now sorting left subarray from index ${low} to ${partitionIndex - 1}.`);
      }
      
      this.quickSort(arr, low, partitionIndex - 1);
      
      if (partitionIndex + 1 < high) {
        this.addStep([...arr], -1, partitionIndex + 1, high, [], [], false, false,
          `Now sorting right subarray from index ${partitionIndex + 1} to ${high}.`);
      }
      
      this.quickSort(arr, partitionIndex + 1, high);
    }
  }

  private partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      this.comparisons++;
      
      // Show comparison
      this.addStep([...arr], high, low, high, [j, high], [], false, false,
        `Comparing ${arr[j]} with pivot ${pivot}. ${arr[j]} ${arr[j] <= pivot ? '≤' : '>'} ${pivot}`);
      
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          // Show swap
          this.addStep([...arr], high, low, high, [], [i, j], false, false,
            `${arr[j]} ≤ ${pivot}, so swap ${arr[i]} and ${arr[j]}`);
          
          this.swap(arr, i, j);
          this.swaps++;
          
          // Show result of swap
          this.addStep([...arr], high, low, high, [], [], false, false,
            `After swap: ${arr[i]} and ${arr[j]} have been exchanged`);
        } else {
          this.addStep([...arr], high, low, high, [], [], false, false,
            `${arr[j]} ≤ ${pivot}, but no swap needed (elements are in same position)`);
        }
      }
    }

    // Place pivot in correct position
    if (i + 1 !== high) {
      this.addStep([...arr], high, low, high, [], [i + 1, high], false, false,
        `Placing pivot ${pivot} in its correct position by swapping with element at index ${i + 1}`);
      
      this.swap(arr, i + 1, high);
      this.swaps++;
    }

    return i + 1;
  }

  private swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  private addStep(
    array: number[],
    pivotIndex: number,
    left: number,
    right: number,
    comparing: number[],
    swapping: number[],
    partitioned: boolean,
    completed: boolean,
    explanation: string
  ): void {
    this.steps.push({
      array: [...array],
      pivotIndex,
      left,
      right,
      comparing: [...comparing],
      swapping: [...swapping],
      partitioned,
      completed,
      explanation,
      comparisons: this.comparisons,
      swaps: this.swaps
    });
  }
}

// Utility function to generate random array
export function generateRandomArray(size: number, min: number = 1, max: number = 100): number[] {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Utility function to validate array input
export function parseArrayInput(input: string): number[] | null {
  try {
    const numbers = input.split(',').map(s => {
      const num = parseInt(s.trim());
      if (isNaN(num)) throw new Error('Invalid number');
      return num;
    });
    
    if (numbers.length === 0) return null;
    if (numbers.length > 20) return null; // Limit array size for visualization
    
    return numbers;
  } catch {
    return null;
  }
}