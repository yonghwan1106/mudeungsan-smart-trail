'use client';

import { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getTimeAgo } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
  onResolve?: (id: string) => void;
}

export function AlertCard({ alert, onResolve }: AlertCardProps) {
  const typeStyles = {
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'bg-red-100 text-red-600',
      badge: 'bg-red-100 text-red-700',
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'bg-amber-100 text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-100 text-blue-600',
      badge: 'bg-blue-100 text-blue-700',
    },
  };

  const styles = typeStyles[alert.type];

  const icons = {
    danger: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    warning: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  return (
    <div className={cn('rounded-xl p-4 border', styles.bg, styles.border)}>
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg shrink-0', styles.icon)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[alert.type]} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', styles.badge)}>
              {alert.trailName}
            </span>
            <span className="text-xs text-gray-500">{getTimeAgo(alert.timestamp)}</span>
          </div>
          <p className="text-sm text-gray-800 font-medium">{alert.message}</p>
        </div>
        {alert.status === 'active' && onResolve && (
          <button
            onClick={() => onResolve(alert.id)}
            className="shrink-0 text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            해결
          </button>
        )}
      </div>
    </div>
  );
}

interface AlertBannerProps {
  count: number;
  onClick?: () => void;
}

export function AlertBanner({ count, onClick }: AlertBannerProps) {
  if (count === 0) return null;

  return (
    <div
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-red-600 transition-colors"
    >
      <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="font-medium">{count}건의 긴급 알림이 있습니다</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
