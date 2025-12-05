'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TrailCard } from '@/components/TrailCard';
import { StatCard, MiniStat } from '@/components/StatCard';
import { AlertBanner, AlertCard } from '@/components/AlertCard';
import { TotalForecastChart } from '@/components/ForecastChart';
import { generateCurrentCrowdData, generateForecastData, generateAlerts, weatherData, statsData } from '@/lib/mock-data';
import { Trail, Alert, ForecastData } from '@/lib/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [trailData, setTrailData] = useState<Trail[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initial data load
    const trails = generateCurrentCrowdData();
    setTrailData(trails);
    setAlerts(generateAlerts(trails));
    setForecast(generateForecastData());

    // Update every 5 seconds
    const interval = setInterval(() => {
      const newTrails = generateCurrentCrowdData();
      setTrailData(newTrails);
      setAlerts(generateAlerts(newTrails));
      setCurrentTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalVisitors = trailData.reduce((sum, t) => sum + t.currentCount, 0);
  const dangerAlerts = alerts.filter(a => a.type === 'danger').length;

  return (
    <div className="min-h-screen">
      {dangerAlerts > 0 && (
        <Link href="/alerts">
          <AlertBanner count={dangerAlerts} />
        </Link>
      )}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">실시간 현황</h1>
              <p className="text-sm text-gray-500 mt-1">
                {currentTime.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}
                {' '}
                {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 기준
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-green-100">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{weatherData.current.condition}</span>
              <span className="text-lg font-bold text-gray-800">{weatherData.current.temp}°C</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="현재 총 탐방객"
            value={totalVisitors}
            subtitle="명"
            icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            trend={{ value: Math.round((totalVisitors - statsData.yesterdayTotal) / statsData.yesterdayTotal * 100), positive: totalVisitors > statsData.yesterdayTotal }}
            color="green"
          />
          <StatCard
            title="오늘 누적"
            value={statsData.todayTotal}
            subtitle="명"
            icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            color="blue"
          />
          <StatCard
            title="예상 피크"
            value={statsData.peakTime}
            subtitle="시간대"
            icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            color="amber"
          />
          <StatCard
            title="추천 코스"
            value={statsData.recommendedTrail}
            icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            color="green"
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trail Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">탐방로별 현황</h2>
                <Link
                  href="/heatmap"
                  className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  지도 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {trailData.map((trail) => (
                  <TrailCard key={trail.id} trail={trail} compact />
                ))}
              </div>
            </div>

            {/* Forecast Preview */}
            <div className="bg-white rounded-2xl p-6 border border-green-100 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">24시간 예측</h2>
                <Link
                  href="/forecast"
                  className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  상세 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <TotalForecastChart data={forecast} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Card */}
            <div className="bg-gradient-green rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">오늘의 날씨</h3>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">{weatherData.current.temp}°C</div>
              <p className="opacity-90">{weatherData.current.condition}</p>
              <div className="flex gap-4 mt-4 text-sm opacity-80">
                <span>습도 {weatherData.current.humidity}%</span>
                <span>풍속 {weatherData.current.wind}m/s</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-4">빠른 통계</h3>
              <div className="space-y-3">
                <MiniStat
                  label="주간 평균"
                  value={`${statsData.weeklyAverage.toLocaleString()}명`}
                  icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
                <MiniStat
                  label="어제 총계"
                  value={`${statsData.yesterdayTotal.toLocaleString()}명`}
                  icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-2xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">최근 알림</h3>
                <Link
                  href="/alerts"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  전체 보기
                </Link>
              </div>
              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.slice(0, 3).map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm">모든 탐방로가 원활합니다</p>
                </div>
              )}
            </div>

            {/* Simulation CTA */}
            <Link href="/simulation">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white cursor-pointer hover:from-green-700 hover:to-emerald-700 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="font-bold text-lg">분산 효과 시뮬레이션</h3>
                </div>
                <p className="text-sm opacity-90">AI 분산 유도 시스템 도입 시 예상되는 효과를 확인해보세요</p>
                <div className="flex items-center gap-1 mt-4 text-sm font-medium">
                  시뮬레이션 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
