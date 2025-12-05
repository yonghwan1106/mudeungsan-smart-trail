'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ForecastChart, TotalForecastChart } from '@/components/ForecastChart';
import { generateForecastData, weatherData } from '@/lib/mock-data';
import { ForecastData } from '@/lib/types';
import { cn } from '@/lib/utils';

type ChartType = 'area' | 'line' | 'bar';

export default function ForecastPage() {
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [chartType, setChartType] = useState<ChartType>('area');
  const [showTotal, setShowTotal] = useState(false);

  useEffect(() => {
    setForecast(generateForecastData());
  }, []);

  const peakData = forecast.reduce((max, item) => (item.total > max.total ? item : max), forecast[0] || { time: '', total: 0 });
  const lowData = forecast.reduce((min, item) => (item.total < min.total ? item : min), forecast[0] || { time: '', total: Infinity });

  const trailPeaks = forecast.length > 0 ? {
    seoseokdae: forecast.reduce((max, item) => (item.seoseokdae > max.seoseokdae ? item : max), forecast[0]),
    ipseokdae: forecast.reduce((max, item) => (item.ipseokdae > max.ipseokdae ? item : max), forecast[0]),
    jungbong: forecast.reduce((max, item) => (item.jungbong > max.jungbong ? item : max), forecast[0]),
    wonhyo: forecast.reduce((max, item) => (item.wonhyo > max.wonhyo ? item : max), forecast[0]),
    jeungsim: forecast.reduce((max, item) => (item.jeungsim > max.jeungsim ? item : max), forecast[0]),
  } : null;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">24시간 예측</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI 모델 기반 탐방객 수 예측 (정확도: 약 85%)
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <p className="text-sm text-amber-700 font-medium">예상 피크 시간</p>
            <p className="text-2xl font-bold text-amber-800 mt-1">{peakData?.time}</p>
            <p className="text-sm text-amber-600">약 {peakData?.total.toLocaleString()}명</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <p className="text-sm text-green-700 font-medium">추천 방문 시간</p>
            <p className="text-2xl font-bold text-green-800 mt-1">{lowData?.time}</p>
            <p className="text-sm text-green-600">약 {lowData?.total.toLocaleString()}명</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-700 font-medium">오늘 날씨</p>
            <p className="text-2xl font-bold text-blue-800 mt-1">{weatherData.current.temp}°C</p>
            <p className="text-sm text-blue-600">{weatherData.current.condition}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <p className="text-sm text-purple-700 font-medium">예측 정확도</p>
            <p className="text-2xl font-bold text-purple-800 mt-1">85%</p>
            <p className="text-sm text-purple-600">LSTM 모델 기반</p>
          </div>
        </div>

        {/* Total Forecast */}
        <div className="bg-white rounded-2xl p-6 border border-green-100 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">전체 탐방객 예측</h2>
          <TotalForecastChart data={forecast} />
        </div>

        {/* Trail-wise Forecast */}
        <div className="bg-white rounded-2xl p-6 border border-green-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800">탐방로별 예측</h2>

            <div className="flex items-center gap-4">
              {/* Chart Type Selector */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {(['area', 'line', 'bar'] as ChartType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setChartType(type)}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                      chartType === type
                        ? 'bg-white text-green-700 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                  >
                    {type === 'area' ? '영역' : type === 'line' ? '라인' : '막대'}
                  </button>
                ))}
              </div>

              {/* Show Total Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTotal}
                  onChange={(e) => setShowTotal(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">전체 합계</span>
              </label>
            </div>
          </div>

          <ForecastChart data={forecast} type={chartType} showTotal={showTotal} />
        </div>

        {/* Trail Peak Times */}
        {trailPeaks && (
          <div className="mt-6 bg-white rounded-2xl p-6 border border-green-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">코스별 피크 시간</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: '서석대', data: trailPeaks.seoseokdae, key: 'seoseokdae', color: 'red' },
                { name: '입석대', data: trailPeaks.ipseokdae, key: 'ipseokdae', color: 'orange' },
                { name: '중봉', data: trailPeaks.jungbong, key: 'jungbong', color: 'yellow' },
                { name: '원효사', data: trailPeaks.wonhyo, key: 'wonhyo', color: 'green' },
                { name: '증심사', data: trailPeaks.jeungsim, key: 'jeungsim', color: 'teal' },
              ].map((trail) => (
                <div key={trail.key} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">{trail.name}</p>
                  <p className="text-xl font-bold text-gray-800">{trail.data.time}</p>
                  <p className="text-sm text-gray-500">
                    {(trail.data[trail.key as keyof ForecastData] as number).toLocaleString()}명
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Model Info */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-green-800 mb-2">AI 예측 모델 정보</h3>
              <p className="text-sm text-green-700 mb-3">
                본 예측은 LSTM(Long Short-Term Memory) 딥러닝 모델을 기반으로 합니다.
                과거 탐방 데이터, 기상 정보, 공휴일 여부, SNS 언급량 등을 종합하여 예측합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">과거 탐방 데이터</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">기상 정보</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">공휴일/요일</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">SNS 트렌드</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
