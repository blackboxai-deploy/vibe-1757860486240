"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface AlgorithmControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  arrayInput: string;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onArrayInputChange: (value: string) => void;
  onGenerateRandom: () => void;
  onApplyArray: () => void;
  isValidArray: boolean;
}

export default function AlgorithmControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  arrayInput,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
  onArrayInputChange,
  onGenerateRandom,
  onApplyArray,
  isValidArray
}: AlgorithmControlsProps) {
  
  const canStepBackward = currentStep > 0;
  const canStepForward = currentStep < totalSteps - 1;
  const isAtEnd = currentStep === totalSteps - 1;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Array Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Array Configuration</h3>
          
          <div className="space-y-2">
            <Label htmlFor="array-input" className="text-sm font-medium">
              Enter Numbers (comma-separated, max 20)
            </Label>
            <Input
              id="array-input"
              type="text"
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
              value={arrayInput}
              onChange={(e) => onArrayInputChange(e.target.value)}
              className={`${!isValidArray && arrayInput ? 'border-red-500' : ''}`}
            />
            {!isValidArray && arrayInput && (
              <p className="text-red-500 text-xs">
                Please enter valid numbers separated by commas (max 20 numbers)
              </p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={onApplyArray}
              disabled={!isValidArray || !arrayInput.trim()}
              className="flex-1"
              variant="outline"
            >
              Apply Array
            </Button>
            <Button
              onClick={onGenerateRandom}
              variant="outline"
              className="flex-1"
            >
              Generate Random
            </Button>
          </div>
        </div>

        {/* Control Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Playback Controls</h3>
          
          {/* Main Controls */}
          <div className="flex space-x-2">
            <Button
              onClick={onStepBackward}
              disabled={!canStepBackward}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              ← Prev
            </Button>
            
            {!isPlaying ? (
              <Button
                onClick={onPlay}
                disabled={isAtEnd}
                className="flex-2 bg-green-600 hover:bg-green-700"
                size="sm"
              >
                ▶ Play
              </Button>
            ) : (
              <Button
                onClick={onPause}
                className="flex-2 bg-yellow-600 hover:bg-yellow-700"
                size="sm"
              >
                ⏸ Pause
              </Button>
            )}
            
            <Button
              onClick={onStepForward}
              disabled={!canStepForward}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Next →
            </Button>
          </div>
          
          <Button
            onClick={onReset}
            variant="destructive"
            size="sm"
            className="w-full"
          >
            🔄 Reset
          </Button>
          
          {/* Speed Control */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Animation Speed: {speed}ms delay
            </Label>
            <Slider
              value={[speed]}
              onValueChange={(values) => onSpeedChange(values[0])}
              min={100}
              max={2000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Fast (100ms)</span>
              <span>Slow (2000ms)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Progress</Label>
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}