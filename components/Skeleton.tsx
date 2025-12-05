'use client';

import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
      style={style}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 border border-green-100">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function TrailCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 border border-green-100">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex justify-between mt-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] flex items-end justify-around gap-2 p-4">
      {[...Array(12)].map((_, i) => (
        <Skeleton
          key={i}
          className="w-full"
          style={{ height: `${Math.random() * 60 + 40}%` }}
        />
      ))}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="relative bg-gradient-to-b from-green-100 to-green-50 rounded-xl overflow-hidden h-[500px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-green-600 font-medium">지도 로딩 중...</p>
        </div>
      </div>
    </div>
  );
}

export function AlertSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Trail Cards */}
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid md:grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <TrailCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <Skeleton className="h-6 w-28 mb-4" />
            <ChartSkeleton />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Skeleton className="h-40 rounded-2xl" />
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <AlertSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
