'use client';

import Link from 'next/link';
import { HeroSlider } from '@/components/HeroSlider';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* 공모전 출품작 뱃지 */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          2025 무등산국립공원 국민참여 정책제안 출품작
        </div>
      </div>

      {/* Hero Slider - Full Screen */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">핵심 기능</h2>
            <p className="text-gray-600">AI 기술로 더 스마트한 국립공원 관리를 실현합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '📡',
                title: '실시간 모니터링',
                desc: '5개 주요 탐방로의 혼잡도를 실시간으로 파악',
                link: '/dashboard',
              },
              {
                icon: '🗺️',
                title: '히트맵 시각화',
                desc: '지도 위에서 한눈에 보는 혼잡 현황',
                link: '/heatmap',
              },
              {
                icon: '🤖',
                title: 'AI 예측',
                desc: '24시간 후까지 탐방객 수를 85% 정확도로 예측',
                link: '/forecast',
              },
              {
                icon: '🔔',
                title: '스마트 알림',
                desc: '혼잡 임계치 초과 시 자동 알림 및 분산 유도',
                link: '/alerts',
              },
            ].map((feature, i) => (
              <Link key={i} href={feature.link}>
                <div className="bg-green-50 rounded-2xl p-6 hover:bg-green-100 transition-all cursor-pointer group h-full hover:shadow-lg hover:-translate-y-1 duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">시스템 작동 원리</h2>
            <p className="text-gray-600">4단계로 스마트하게 작동하는 분산 유도 시스템</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-green-200 -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { step: 1, icon: '📡', title: '데이터 수집', desc: '탐방로 입구 센서에서 실시간 인원 카운팅' },
                { step: 2, icon: '🤖', title: 'AI 예측', desc: 'LSTM 모델로 1시간~1일 후 혼잡도 예측' },
                { step: 3, icon: '📱', title: '분산 유도', desc: '전광판/앱으로 한적한 코스 추천' },
                { step: 4, icon: '📊', title: '효과 측정', desc: '분산 효과 실시간 모니터링 및 피드백' },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg shadow-green-200">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">기대 효과</h2>
            <p className="text-gray-600">분산 유도 시스템 도입으로 얻을 수 있는 효과</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-green-100 text-center hover:shadow-2xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">29%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">집중도 감소</h3>
              <p className="text-gray-600">특정 코스 편중 현상 개선</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-green-600 font-medium">70% → 50% 분산</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-green-100 text-center hover:shadow-2xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">30%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">생태 피해 감소</h3>
              <p className="text-gray-600">답압으로 인한 훼손 면적 절감</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-emerald-600 font-medium">연 500m² → 350m²</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-green-100 text-center hover:shadow-2xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">25%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">만족도 향상</h3>
              <p className="text-gray-600">탐방 경험 품질 개선</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-teal-600 font-medium">3.2점 → 4.0점</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">경제적 기대효과</h2>
              <p className="text-gray-600 mb-8">
                초기 투자 대비 빠른 회수와 지속적인 비용 절감 효과
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">생태 복원 비용 절감</p>
                    <p className="text-sm text-gray-600">연간 약 5천만원 절감</p>
                  </div>
                  <span className="text-2xl font-bold text-green-600">5천만원</span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">인력 효율화</p>
                    <p className="text-sm text-gray-600">수동 카운팅 인력 30% 절감</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">3천만원</span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">초기 투자비</p>
                    <p className="text-sm text-gray-600">센서 5개소 + AI 시스템</p>
                  </div>
                  <span className="text-2xl font-bold text-amber-600">1.5억원</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">투자 회수 기간</p>
                    <p className="text-3xl font-bold">약 2년</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">전국 확산 가능성</h3>
                <p className="text-white/80 mb-6">
                  무등산 실증 후 전국 22개 국립공원 표준 모델로 발전
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-3xl font-bold">22개</p>
                    <p className="text-sm text-white/70">국립공원</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-3xl font-bold">4,700만</p>
                    <p className="text-sm text-white/70">연간 탐방객</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-3xl font-bold">30%+</p>
                    <p className="text-sm text-white/70">개선 잠재력</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full opacity-50 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 Q25,50 50,70 T100,30 V100 Z" fill="white" />
              </svg>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">지금 바로 체험해보세요</h2>
              <p className="text-lg opacity-90 mb-8">
                AI 기반 스마트 탐방로 시스템이 만드는<br />
                새로운 국립공원 경험
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg group"
                >
                  대시보드 시작하기
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/heatmap"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30"
                >
                  히트맵 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">스마트 탐방로</p>
                <p className="text-xs text-gray-400">무등산국립공원</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                2025 무등산국립공원 국민참여 정책제안 공모전
              </p>
              <p className="text-xs text-gray-500 mt-1">
                본 프로토타입은 정책 제안을 위한 시연용입니다
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
