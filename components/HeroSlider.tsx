'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
    title: 'AI가 안내하는',
    subtitle: '혼잡 없는 무등산',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    title: '실시간 탐방객 분석',
    subtitle: '스마트한 산행의 시작',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80',
    title: '자연과 기술의 조화',
    subtitle: '생태계 보전과 탐방 만족',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    title: '24시간 예측 시스템',
    subtitle: '최적의 탐방 시간을 안내합니다',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const targetCount = 3247;

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Counter animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-all duration-1000 ease-in-out',
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>
      ))}

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">스마트 탐방로</h1>
                <p className="text-xs text-white/80">무등산국립공원</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 bg-white/20 backdrop-blur-md text-white rounded-full font-medium hover:bg-white/30 transition-all border border-white/30"
            >
              대시보드 시작
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white text-sm font-medium mb-6 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                무등산국립공원 국민참여 정책제안 출품작
              </div>

              {/* Animated Title */}
              <div className="overflow-hidden mb-6">
                <h2
                  key={currentSlide}
                  className="text-4xl md:text-6xl font-bold text-white leading-tight animate-slide-up"
                >
                  {slides[currentSlide].title}
                  <br />
                  <span className="text-green-400">{slides[currentSlide].subtitle}</span>
                </h2>
              </div>

              <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
                실시간 탐방객 밀집도 예측과 자동 분산 유도 시스템으로
                <br className="hidden sm:block" />
                생태계를 보전하고 탐방 만족도를 높입니다.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30 flex items-center gap-2 group"
                >
                  실시간 현황 보기
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/simulation"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/30"
                >
                  효과 시뮬레이션
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <p className="text-sm text-white/70 mb-2">현재 총 탐방객</p>
                  <p className="text-6xl font-bold text-white">
                    {count.toLocaleString()}
                    <span className="text-2xl text-white/60 ml-2">명</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2" />
                    <p className="text-xs text-white/60">여유</p>
                    <p className="font-bold text-white">3개 코스</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-amber-400 rounded-full mx-auto mb-2" />
                    <p className="text-xs text-white/60">보통</p>
                    <p className="font-bold text-white">1개 코스</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mx-auto mb-2 animate-pulse" />
                    <p className="text-xs text-white/60">혼잡</p>
                    <p className="font-bold text-white">1개 코스</p>
                  </div>
                </div>

                {/* Mini trail status */}
                <div className="mt-6 space-y-2">
                  {['서석대', '입석대', '중봉', '원효사', '증심사'].map((trail, i) => {
                    const levels = ['high', 'medium', 'low', 'low', 'low'];
                    const percentages = [85, 65, 40, 35, 45];
                    const colors = {
                      high: 'bg-red-400',
                      medium: 'bg-amber-400',
                      low: 'bg-green-400',
                    };
                    return (
                      <div key={trail} className="flex items-center gap-3">
                        <span className="text-xs text-white/70 w-12">{trail}</span>
                        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full transition-all duration-1000', colors[levels[i] as keyof typeof colors])}
                            style={{ width: `${percentages[i]}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/70 w-8">{percentages[i]}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LIVE Badge */}
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20 group"
        aria-label="이전 슬라이드"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20 group"
        aria-label="다음 슬라이드"
      >
        <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'transition-all duration-300',
              index === currentSlide
                ? 'w-12 h-3 bg-green-400 rounded-full'
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/80'
            )}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest rotate-90 origin-center translate-y-8">SCROLL</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
