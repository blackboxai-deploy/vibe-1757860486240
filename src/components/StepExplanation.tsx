"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepExplanationProps {
  explanation: string;
  comparisons: number;
  swaps: number;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
  className?: string;
}

export default function StepExplanation({
  explanation,
  comparisons,
  swaps,
  currentStep,
  totalSteps,
  isCompleted,
  className = ''
}: StepExplanationProps) {
  
  const getStepIcon = () => {
    if (isCompleted) return "🎉";
    if (explanation.includes("Comparing")) return "🔍";
    if (explanation.includes("swap")) return "🔄";
    if (explanation.includes("Pivot")) return "📍";
    if (explanation.includes("Partition")) return "✂️";
    if (explanation.includes("completed")) return "✅";
    return "📊";
  };

  const getProgressColor = () => {
    const progress = (currentStep / totalSteps) * 100;
    if (progress < 25) return "bg-red-500";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Card className={`bg-white shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center space-x-2">
            <span className="text-2xl">{getStepIcon()}</span>
            <span>Algorithm Step</span>
          </span>
          <Badge variant="outline" className="text-sm">
            Step {currentStep + 1}/{totalSteps}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Step Explanation */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-gray-800 leading-relaxed">
            {explanation}
          </p>
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{comparisons}</div>
            <div className="text-sm text-gray-600">Comparisons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{swaps}</div>
            <div className="text-sm text-gray-600">Swaps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{currentStep + 1}</div>
            <div className="text-sm text-gray-600">Current Step</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>
        
        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Algorithm Progress</span>
            <span>{currentStep + 1} / {totalSteps} steps</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{
                width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%`
              }}
            />
          </div>
        </div>
        
        {/* Legend */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Color Legend</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Pivot Element</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Partitioned</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
              <span>Active Range</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Inactive</span>
            </div>
          </div>
        </div>
        
        {isCompleted && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎉</span>
              <div>
                <h4 className="font-semibold text-green-800">Sorting Complete!</h4>
                <p className="text-green-700 text-sm">
                  The array has been successfully sorted using the QuickSort algorithm.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}