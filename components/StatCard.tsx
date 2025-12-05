'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  color?: 'green' | 'blue' | 'amber' | 'red';
}

export function StatCard({ title, value, subtitle, icon, trend, color = 'green' }: StatCardProps) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    red: 'bg-red-50 text-red-600 border-red-200',
  };

  const iconBgClasses = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    amber: 'bg-amber-100',
    red: 'bg-red-100',
  };

  return (
    <div className={cn('rounded-2xl p-5 border', colorClasses[color])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {subtitle && <p className="text-sm mt-1 opacity-70">{subtitle}</p>}
          {trend && (
            <div className={cn('flex items-center gap-1 mt-2 text-sm', trend.positive ? 'text-green-600' : 'text-red-600')}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={trend.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
                />
              </svg>
              <span>{trend.positive ? '+' : ''}{trend.value}%</span>
              <span className="opacity-70">전일 대비</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBgClasses[color])}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface MiniStatProps {
  label: string;
  value: string | number;
  icon?: string;
}

export function MiniStat({ label, value, icon }: MiniStatProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-3 border border-green-100">
      {icon && (
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      )}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-800">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      </div>
    </div>
  );
}
