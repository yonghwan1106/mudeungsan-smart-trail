'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AlertCard } from '@/components/AlertCard';
import { generateCurrentCrowdData, generateAlerts } from '@/lib/mock-data';
import { Alert } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'danger' | 'warning' | 'resolved'>('all');
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);

  useEffect(() => {
    const trails = generateCurrentCrowdData();
    const newAlerts = generateAlerts(trails);
    setAlerts(newAlerts);

    // Simulate historical alerts
    const historicalAlerts: Alert[] = [
      {
        id: 'hist-1',
        trailId: 'seoseokdae',
        trailName: '서석대 코스',
        type: 'danger',
        message: '수용인원 초과로 입장 제한 조치 시행',
        timestamp: new Date(Date.now() - 3600000),
        status: 'resolved',
      },
      {
        id: 'hist-2',
        trailId: 'ipseokdae',
        trailName: '입석대 코스',
        type: 'warning',
        message: '혼잡도 85% 도달, 분산 유도 완료',
        timestamp: new Date(Date.now() - 7200000),
        status: 'resolved',
      },
      {
        id: 'hist-3',
        trailId: 'jungbong',
        trailName: '중봉 코스',
        type: 'info',
        message: '정기 점검으로 인한 일시 통제 예정',
        timestamp: new Date(Date.now() - 10800000),
        status: 'active',
      },
    ];

    setAlerts([...newAlerts, ...historicalAlerts]);
  }, []);

  const handleResolve = (id: string) => {
    setResolvedAlerts([...resolvedAlerts, id]);
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return alert.status === 'resolved' || resolvedAlerts.includes(alert.id);
    return alert.type === filter && alert.status === 'active';
  });

  const activeCount = alerts.filter(a => a.status === 'active' && !resolvedAlerts.includes(a.id)).length;
  const dangerCount = alerts.filter(a => a.type === 'danger' && a.status === 'active' && !resolvedAlerts.includes(a.id)).length;
  const warningCount = alerts.filter(a => a.type === 'warning' && a.status === 'active' && !resolvedAlerts.includes(a.id)).length;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">알림 센터</h1>
          <p className="text-sm text-gray-500 mt-1">
            탐방로 혼잡도 및 긴급 상황 알림을 관리합니다
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all text-left',
              filter === 'all'
                ? 'border-green-400 bg-green-50'
                : 'border-gray-100 bg-white hover:border-green-200'
            )}
          >
            <p className="text-sm text-gray-500">전체 알림</p>
            <p className="text-2xl font-bold text-gray-800">{alerts.length}</p>
          </button>

          <button
            onClick={() => setFilter('danger')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all text-left',
              filter === 'danger'
                ? 'border-red-400 bg-red-50'
                : 'border-gray-100 bg-white hover:border-red-200'
            )}
          >
            <p className="text-sm text-gray-500">긴급</p>
            <p className="text-2xl font-bold text-red-600">{dangerCount}</p>
          </button>

          <button
            onClick={() => setFilter('warning')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all text-left',
              filter === 'warning'
                ? 'border-amber-400 bg-amber-50'
                : 'border-gray-100 bg-white hover:border-amber-200'
            )}
          >
            <p className="text-sm text-gray-500">주의</p>
            <p className="text-2xl font-bold text-amber-600">{warningCount}</p>
          </button>

          <button
            onClick={() => setFilter('resolved')}
            className={cn(
              'p-4 rounded-xl border-2 transition-all text-left',
              filter === 'resolved'
                ? 'border-gray-400 bg-gray-50'
                : 'border-gray-100 bg-white hover:border-gray-300'
            )}
          >
            <p className="text-sm text-gray-500">해결됨</p>
            <p className="text-2xl font-bold text-gray-600">
              {alerts.filter(a => a.status === 'resolved' || resolvedAlerts.includes(a.id)).length}
            </p>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Alert List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={{
                    ...alert,
                    status: resolvedAlerts.includes(alert.id) ? 'resolved' : alert.status,
                  }}
                  onResolve={handleResolve}
                />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-12 border border-green-100 text-center">
                <svg className="w-16 h-16 mx-auto text-green-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-600 mb-2">알림이 없습니다</h3>
                <p className="text-sm text-gray-400">현재 선택한 필터에 해당하는 알림이 없습니다.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alert Settings */}
            <div className="bg-white rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-4">알림 설정</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">긴급 알림 (80% 초과)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">주의 알림 (60% 초과)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">이메일 알림</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SMS 알림</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-4">빠른 조치</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors text-left flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  전체 분산 유도 발령
                </button>
                <button className="w-full px-4 py-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors text-left flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                  안내 방송 송출
                </button>
                <button className="w-full px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors text-left flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  모든 알림 해결 처리
                </button>
              </div>
            </div>

            {/* Response Statistics */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="font-bold text-green-800 mb-4">대응 통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">평균 대응 시간</span>
                  <span className="font-bold text-green-800">3분 24초</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">오늘 해결 건수</span>
                  <span className="font-bold text-green-800">12건</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-700">대응 성공률</span>
                  <span className="font-bold text-green-800">98.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
