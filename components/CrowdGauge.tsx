'use client';

import { getCrowdLevel, getCrowdLevelColor, getCrowdLevelText, CrowdLevel } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CrowdGaugeProps {
  current: number;
  capacity: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function CrowdGauge({ current, capacity, size = 'md', showLabel = true }: CrowdGaugeProps) {
  const percentage = Math.min((current / capacity) * 100, 120);
  const level = getCrowdLevel(current, capacity);
  const color = getCrowdLevelColor(level);
  const label = getCrowdLevelText(level);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span
            className={cn(
              'font-semibold text-sm',
              level === 'low' && 'text-green-600',
              level === 'medium' && 'text-amber-500',
              level === 'high' && 'text-red-500'
            )}
          >
            {label}
          </span>
          <span className="text-xs text-gray-500">
            {current.toLocaleString()} / {capacity.toLocaleString()}명
          </span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            level === 'low' && 'bg-green-500',
            level === 'medium' && 'bg-amber-500',
            level === 'high' && 'bg-red-500'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">0%</span>
        <span className="text-xs text-gray-400">50%</span>
        <span className="text-xs text-gray-400">100%</span>
      </div>
    </div>
  );
}

interface CrowdBadgeProps {
  level: CrowdLevel;
  size?: 'sm' | 'md';
}

export function CrowdBadge({ level, size = 'md' }: CrowdBadgeProps) {
  const label = getCrowdLevelText(level);

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        level === 'low' && 'bg-green-100 text-green-700',
        level === 'medium' && 'bg-amber-100 text-amber-700',
        level === 'high' && 'bg-red-100 text-red-700'
      )}
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full mr-1.5',
          level === 'low' && 'bg-green-500',
          level === 'medium' && 'bg-amber-500',
          level === 'high' && 'bg-red-500 animate-pulse'
        )}
      />
      {label}
    </span>
  );
}
