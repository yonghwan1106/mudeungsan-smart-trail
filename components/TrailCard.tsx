'use client';

import { Trail, getCrowdLevel } from '@/lib/types';
import { CrowdGauge, CrowdBadge } from './CrowdGauge';
import { cn } from '@/lib/utils';

interface TrailCardProps {
  trail: Trail;
  onClick?: () => void;
  compact?: boolean;
}

export function TrailCard({ trail, onClick, compact = false }: TrailCardProps) {
  const level = getCrowdLevel(trail.currentCount, trail.capacity);
  const percentage = Math.round((trail.currentCount / trail.capacity) * 100);

  const difficultyLabels = {
    easy: '쉬움',
    medium: '보통',
    hard: '어려움',
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700',
  };

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={cn(
          'bg-white rounded-xl p-4 border border-green-100 hover:border-green-300 transition-all cursor-pointer hover:shadow-md',
          level === 'high' && 'border-red-200 hover:border-red-300'
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800">{trail.shortName}</h3>
          <CrowdBadge level={level} size="sm" />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{trail.distance}</span>
          <span className="font-medium">{percentage}%</span>
        </div>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              level === 'low' && 'bg-green-500',
              level === 'medium' && 'bg-amber-500',
              level === 'high' && 'bg-red-500'
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl p-6 border-2 border-green-100 hover:border-green-300 transition-all cursor-pointer hover:shadow-lg',
        level === 'high' && 'border-red-200 hover:border-red-300'
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{trail.name}</h3>
          <p className="text-sm text-gray-500">{trail.description}</p>
        </div>
        <CrowdBadge level={level} />
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-sm text-gray-600">{trail.distance}</span>
        </div>
        <span className={cn('text-xs px-2 py-1 rounded-full', difficultyColors[trail.difficulty])}>
          {difficultyLabels[trail.difficulty]}
        </span>
      </div>

      <CrowdGauge current={trail.currentCount} capacity={trail.capacity} />

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">현재 탐방객</span>
          <span className="ml-2 font-bold text-lg text-gray-800">{trail.currentCount.toLocaleString()}명</span>
        </div>
        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
          상세보기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
