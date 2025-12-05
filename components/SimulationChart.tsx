'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { SimulationData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SimulationChartProps {
  data: SimulationData[];
}

export function SimulationChart({ data }: SimulationChartProps) {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAfter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const chartData = data.map(item => ({
    name: item.trailName,
    분산전: item.before,
    분산후: showAfter ? item.after : item.before,
  }));

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setShowAfter(false)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all',
            !showAfter
              ? 'bg-red-100 text-red-700 border-2 border-red-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          분산 전 (현재)
        </button>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <button
          onClick={() => setShowAfter(true)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all',
            showAfter
              ? 'bg-green-100 text-green-700 border-2 border-green-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          분산 후 (예상)
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" unit="%" />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" width={60} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-bold text-gray-800 mb-1">{payload[0].payload.name}</p>
                    <p className="text-sm text-red-600">분산 전: {payload[0].payload.분산전}%</p>
                    {showAfter && (
                      <p className="text-sm text-green-600">분산 후: {payload[0].payload.분산후}%</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey={showAfter ? '분산후' : '분산전'}
            radius={[0, 4, 4, 0]}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={showAfter
                  ? entry.분산후 > 50 ? '#f59e0b' : '#22c55e'
                  : entry.분산전 > 50 ? '#ef4444' : '#f59e0b'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h4 className="font-medium text-red-800 mb-2">분산 전 문제점</h4>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• 서석대 코스 70% 과밀</li>
            <li>• 생태계 답압 피해 심각</li>
            <li>• 탐방 만족도 저하</li>
          </ul>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="font-medium text-green-800 mb-2">분산 후 기대효과</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 전 코스 균등 분배 (40-50%)</li>
            <li>• 생태 피해 30% 감소</li>
            <li>• 탐방 만족도 25% 향상</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

interface ComparisonSliderProps {
  data: SimulationData[];
}

export function ComparisonSlider({ data }: ComparisonSliderProps) {
  const [sliderValue, setSliderValue] = useState(0);

  const interpolatedData = data.map(item => ({
    ...item,
    current: Math.round(item.before + (item.after - item.before) * (sliderValue / 100)),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-red-600">분산 전</span>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <span className="text-sm font-medium text-green-600">분산 후</span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {interpolatedData.map((item) => (
          <div key={item.trailId} className="text-center">
            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden mb-2">
              <div
                className={cn(
                  'absolute bottom-0 w-full transition-all duration-300 rounded-t-lg',
                  item.current > 50 ? 'bg-amber-400' : 'bg-green-400',
                  item.current > 70 && 'bg-red-400'
                )}
                style={{ height: `${item.current}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-gray-700">
                {item.current}%
              </span>
            </div>
            <p className="text-xs font-medium text-gray-700">{item.trailName}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 text-green-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">
            분산 효과: 최대 집중도 {Math.max(...data.map(d => d.before))}% → {Math.max(...interpolatedData.map(d => d.current))}%
          </span>
        </div>
      </div>
    </div>
  );
}
