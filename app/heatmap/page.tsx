'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { CrowdBadge } from '@/components/CrowdGauge';
import { MapSkeleton } from '@/components/Skeleton';
import { generateCurrentCrowdData } from '@/lib/mock-data';
import { Trail, getCrowdLevel, getCrowdLevelColor } from '@/lib/types';
import { cn } from '@/lib/utils';

// Dynamic import of TrailMap to avoid SSR issues with Leaflet
const TrailMap = dynamic(
  () => import('@/components/TrailMap').then((mod) => mod.TrailMap),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

export default function HeatmapPage() {
  const [trailData, setTrailData] = useState<Trail[]>([]);
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const loadTimer = setTimeout(() => {
      const trails = generateCurrentCrowdData();
      setTrailData(trails);
      setIsLoading(false);
    }, 500);

    const interval = setInterval(() => {
      setTrailData(generateCurrentCrowdData());
      setCurrentTime(new Date());
    }, 5000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">탐방로 히트맵</h1>
          <p className="text-sm text-gray-500 mt-1">
            {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} 기준 실시간 혼잡도
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-4 border border-green-100 shadow-sm">
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ height: '550px' }}
                role="img"
                aria-label="무등산 탐방로 혼잡도 지도"
              >
                {isLoading ? (
                  <MapSkeleton />
                ) : (
                  <TrailMap
                    trails={trailData}
                    selectedTrail={selectedTrail}
                    onSelectTrail={setSelectedTrail}
                  />
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-gray-700">여유</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {trailData.filter(t => getCrowdLevel(t.currentCount, t.capacity) === 'low').length}개
                </p>
                <p className="text-xs text-gray-500 mt-1">코스</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm font-medium text-gray-700">보통</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">
                  {trailData.filter(t => getCrowdLevel(t.currentCount, t.capacity) === 'medium').length}개
                </p>
                <p className="text-xs text-gray-500 mt-1">코스</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">혼잡</span>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {trailData.filter(t => getCrowdLevel(t.currentCount, t.capacity) === 'high').length}개
                </p>
                <p className="text-xs text-gray-500 mt-1">코스</p>
              </div>
            </div>
          </div>

          {/* Trail List */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                탐방로 목록
              </h2>
              <div className="space-y-3">
                {trailData.map((trail) => {
                  const level = getCrowdLevel(trail.currentCount, trail.capacity);
                  const percentage = Math.round((trail.currentCount / trail.capacity) * 100);

                  return (
                    <div
                      key={trail.id}
                      onClick={() => setSelectedTrail(trail)}
                      className={cn(
                        'p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                        selectedTrail?.id === trail.id
                          ? 'border-green-400 bg-green-50 shadow-md'
                          : 'border-gray-100 hover:border-green-200 hover:bg-green-50/50 hover:shadow-sm'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{trail.name}</span>
                        <CrowdBadge level={level} size="sm" />
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">{trail.distance} · {trail.difficulty === 'easy' ? '쉬움' : trail.difficulty === 'medium' ? '보통' : '어려움'}</span>
                        <span className="font-bold" style={{ color: getCrowdLevelColor(level) }}>
                          {trail.currentCount.toLocaleString()}명
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: getCrowdLevelColor(level),
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-xs text-gray-400">0%</span>
                        <span className="text-xs font-medium" style={{ color: getCrowdLevelColor(level) }}>{percentage}%</span>
                        <span className="text-xs text-gray-400">100%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Trail Detail */}
            {selectedTrail && (
              <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-800">{selectedTrail.name} 상세</h2>
                  <button
                    onClick={() => setSelectedTrail(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="닫기"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">{selectedTrail.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      현재 탐방객
                    </span>
                    <span className="font-bold text-lg" style={{ color: getCrowdLevelColor(getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity)) }}>
                      {selectedTrail.currentCount.toLocaleString()}명
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      적정 수용인원
                    </span>
                    <span className="font-bold">{selectedTrail.capacity.toLocaleString()}명</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      코스 거리
                    </span>
                    <span className="font-bold">{selectedTrail.distance}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-500 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      난이도
                    </span>
                    <span className={cn(
                      'font-bold px-3 py-1 rounded-full text-sm',
                      selectedTrail.difficulty === 'easy' && 'bg-green-100 text-green-700',
                      selectedTrail.difficulty === 'medium' && 'bg-amber-100 text-amber-700',
                      selectedTrail.difficulty === 'hard' && 'bg-red-100 text-red-700'
                    )}>
                      {selectedTrail.difficulty === 'easy' ? '쉬움' : selectedTrail.difficulty === 'medium' ? '보통' : '어려움'}
                    </span>
                  </div>
                </div>

                <div className={cn(
                  'mt-4 p-4 rounded-xl flex items-center gap-3',
                  getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity) === 'low' && 'bg-green-50 border border-green-200',
                  getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity) === 'medium' && 'bg-amber-50 border border-amber-200',
                  getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity) === 'high' && 'bg-red-50 border border-red-200'
                )}>
                  {getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity) === 'low' && (
                    <>
                      <span className="text-2xl">✅</span>
                      <p className="text-sm text-green-700 font-medium">현재 여유롭습니다. 방문을 권장합니다!</p>
                    </>
                  )}
                  {getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity) === 'medium' && (
                    <>
                      <span className="text-2xl">⚠️</span>
                      <p className="text-sm text-amber-700 font-medium">보통 수준입니다. 1-2시간 후 재확인을 권장합니다.</p>
                    </>
                  )}
                  {getCrowdLevel(selectedTrail.currentCount, selectedTrail.capacity) === 'high' && (
                    <>
                      <span className="text-2xl">🚫</span>
                      <p className="text-sm text-red-700 font-medium">혼잡합니다. 다른 코스를 추천드립니다.</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* AI Recommendation */}
            {!selectedTrail && (
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-bold">AI 추천</span>
                </div>
                <p className="text-sm text-white/90 mb-3">
                  현재 시간대에 가장 여유로운 코스를 추천합니다.
                </p>
                {trailData.length > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="font-semibold mb-1">
                      {trailData.reduce((min, t) =>
                        (t.currentCount / t.capacity) < (min.currentCount / min.capacity) ? t : min
                      ).name}
                    </p>
                    <p className="text-xs text-white/80">
                      현재 가장 한적한 코스입니다
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
