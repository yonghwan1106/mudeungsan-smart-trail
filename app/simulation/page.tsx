'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { SimulationChart, ComparisonSlider } from '@/components/SimulationChart';
import { simulationData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function SimulationPage() {
  const [viewMode, setViewMode] = useState<'chart' | 'slider'>('chart');

  const improvementStats = {
    concentration: { before: 70, after: 50, improvement: 29 },
    ecoImpact: { before: 500, after: 350, improvement: 30 },
    satisfaction: { before: 3.2, after: 4.0, improvement: 25 },
    efficiency: { before: 100, after: 70, improvement: 30 },
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">분산 효과 시뮬레이션</h1>
          <p className="text-sm text-gray-500 mt-1">
            AI 기반 탐방객 분산 유도 시스템 도입 시 예상되는 효과를 시뮬레이션합니다
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">탐방객 집중도</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                -{improvementStats.concentration.improvement}%
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-800">{improvementStats.concentration.after}%</span>
              <span className="text-sm text-gray-400 line-through mb-1">{improvementStats.concentration.before}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">최대 집중 코스 비율</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">생태 답압 피해</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                -{improvementStats.ecoImpact.improvement}%
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-800">{improvementStats.ecoImpact.after}m²</span>
              <span className="text-sm text-gray-400 line-through mb-1">{improvementStats.ecoImpact.before}m²</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">연간 훼손 면적</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">탐방 만족도</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                +{improvementStats.satisfaction.improvement}%
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-800">{improvementStats.satisfaction.after}/5.0</span>
              <span className="text-sm text-gray-400 line-through mb-1">{improvementStats.satisfaction.before}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">평균 만족도 점수</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-green-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">인력 운영 효율</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                +{improvementStats.efficiency.improvement}%
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-800">{improvementStats.efficiency.after}%</span>
              <span className="text-sm text-gray-400 line-through mb-1">{improvementStats.efficiency.before}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">필요 인력 대비</p>
          </div>
        </div>

        {/* Simulation Chart */}
        <div className="bg-white rounded-2xl p-6 border border-green-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">코스별 분산 효과</h2>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('chart')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all',
                  viewMode === 'chart'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                차트 보기
              </button>
              <button
                onClick={() => setViewMode('slider')}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all',
                  viewMode === 'slider'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                슬라이더 보기
              </button>
            </div>
          </div>

          {viewMode === 'chart' ? (
            <SimulationChart data={simulationData} />
          ) : (
            <ComparisonSlider data={simulationData} />
          )}
        </div>

        {/* System Overview */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* How it works */}
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">시스템 작동 원리</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: '데이터 수집', desc: '탐방로 입구 센서에서 실시간 인원 카운팅', icon: '📡' },
                { step: 2, title: 'AI 예측', desc: 'LSTM 모델로 1시간~1일 후 혼잡도 예측', icon: '🤖' },
                { step: 3, title: '분산 유도', desc: '전광판/앱으로 한적한 코스 추천', icon: '📱' },
                { step: 4, title: '효과 측정', desc: '분산 효과 실시간 모니터링 및 피드백', icon: '📊' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">STEP {item.step}</span>
                      <span className="font-medium text-gray-800">{item.title}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Economic Benefits */}
          <div className="bg-white rounded-2xl p-6 border border-green-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">경제적 기대효과</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-green-800">생태 복원 비용 절감</span>
                  <span className="text-xl font-bold text-green-700">연 5천만원</span>
                </div>
                <p className="text-sm text-green-600">답압 피해 30% 감소로 복원 비용 절감</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">인력 효율화</span>
                  <span className="text-xl font-bold text-blue-700">연 3천만원</span>
                </div>
                <p className="text-sm text-blue-600">수동 인원 카운팅 인력 30% 절감</p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-800">초기 투자비</span>
                  <span className="text-xl font-bold text-amber-700">약 1.5억원</span>
                </div>
                <p className="text-sm text-amber-600">센서 5개소 + AI 시스템 구축</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-300">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-green-800">투자 회수 기간</span>
                  <span className="text-2xl font-bold text-green-700">약 2년</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expansion Potential */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold">전국 22개 국립공원 확산 가능</h3>
              <p className="opacity-90">무등산 실증 후 표준 모델로 발전</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <p className="text-3xl font-bold">22개</p>
              <p className="text-sm opacity-80">국립공원</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <p className="text-3xl font-bold">4,700만</p>
              <p className="text-sm opacity-80">연간 탐방객</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <p className="text-3xl font-bold">30%+</p>
              <p className="text-sm opacity-80">혼잡 개선 잠재력</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
