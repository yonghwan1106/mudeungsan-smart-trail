import { Trail, Alert, ForecastData, SimulationData } from './types';

export const trails: Trail[] = [
  {
    id: 'seoseokdae',
    name: '서석대 코스',
    shortName: '서석대',
    capacity: 500,
    currentCount: 0,
    distance: '4.2km',
    difficulty: 'hard',
    coordinates: [
      { lat: 35.1347, lng: 126.9889 },
      { lat: 35.1320, lng: 126.9850 },
      { lat: 35.1280, lng: 126.9820 },
    ],
    description: '무등산 정상 주상절리를 감상할 수 있는 대표 코스',
  },
  {
    id: 'ipseokdae',
    name: '입석대 코스',
    shortName: '입석대',
    capacity: 400,
    currentCount: 0,
    distance: '3.8km',
    difficulty: 'hard',
    coordinates: [
      { lat: 35.1340, lng: 126.9920 },
      { lat: 35.1310, lng: 126.9880 },
      { lat: 35.1275, lng: 126.9840 },
    ],
    description: '입석대 주상절리와 천왕봉 조망이 가능한 코스',
  },
  {
    id: 'jungbong',
    name: '중봉 코스',
    shortName: '중봉',
    capacity: 300,
    currentCount: 0,
    distance: '5.1km',
    difficulty: 'medium',
    coordinates: [
      { lat: 35.1380, lng: 126.9950 },
      { lat: 35.1350, lng: 126.9910 },
      { lat: 35.1320, lng: 126.9870 },
    ],
    description: '중봉을 경유하는 능선 종주 코스',
  },
  {
    id: 'wonhyo',
    name: '원효사 코스',
    shortName: '원효사',
    capacity: 350,
    currentCount: 0,
    distance: '3.2km',
    difficulty: 'easy',
    coordinates: [
      { lat: 35.1290, lng: 126.9780 },
      { lat: 35.1260, lng: 126.9750 },
      { lat: 35.1230, lng: 126.9720 },
    ],
    description: '원효사를 경유하는 편안한 산책 코스',
  },
  {
    id: 'jeungsim',
    name: '증심사 코스',
    shortName: '증심사',
    capacity: 450,
    currentCount: 0,
    distance: '2.8km',
    difficulty: 'easy',
    coordinates: [
      { lat: 35.1250, lng: 126.9700 },
      { lat: 35.1220, lng: 126.9670 },
      { lat: 35.1190, lng: 126.9640 },
    ],
    description: '증심사와 계곡을 따라 걷는 힐링 코스',
  },
];

// 시간대별 탐방객 패턴 (0-23시, 비율)
const hourlyPattern = [
  0.05, 0.02, 0.01, 0.01, 0.02, 0.05, // 0-5시
  0.15, 0.35, 0.55, 0.75, 0.90, 1.00, // 6-11시
  0.95, 0.85, 0.80, 0.70, 0.55, 0.40, // 12-17시
  0.25, 0.15, 0.10, 0.08, 0.06, 0.05, // 18-23시
];

// 요일별 보정 계수 (일-토)
const dayOfWeekMultiplier = [1.2, 0.5, 0.5, 0.6, 0.6, 0.7, 1.3];

export function generateCurrentCrowdData(): Trail[] {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();
  const baseMultiplier = hourlyPattern[hour] * dayOfWeekMultiplier[dayOfWeek];

  // 각 코스별 인기도 가중치
  const popularityWeights: Record<string, number> = {
    seoseokdae: 1.4,  // 가장 인기
    ipseokdae: 1.2,
    jungbong: 0.8,
    wonhyo: 0.9,
    jeungsim: 1.0,
  };

  return trails.map(trail => {
    const weight = popularityWeights[trail.id] || 1;
    const noise = 0.8 + Math.random() * 0.4; // 80%-120% 변동
    const count = Math.round(trail.capacity * baseMultiplier * weight * noise);
    return {
      ...trail,
      currentCount: Math.min(count, Math.round(trail.capacity * 1.2)), // 최대 120%
    };
  });
}

export function generateForecastData(): ForecastData[] {
  const now = new Date();
  const currentHour = now.getHours();
  const dayOfWeek = now.getDay();
  const forecast: ForecastData[] = [];

  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24;
    const futureDayOffset = Math.floor((currentHour + i) / 24);
    const futureDay = (dayOfWeek + futureDayOffset) % 7;
    const baseMultiplier = hourlyPattern[hour] * dayOfWeekMultiplier[futureDay];

    const noise = () => 0.9 + Math.random() * 0.2;

    const seoseokdae = Math.round(500 * baseMultiplier * 1.4 * noise());
    const ipseokdae = Math.round(400 * baseMultiplier * 1.2 * noise());
    const jungbong = Math.round(300 * baseMultiplier * 0.8 * noise());
    const wonhyo = Math.round(350 * baseMultiplier * 0.9 * noise());
    const jeungsim = Math.round(450 * baseMultiplier * 1.0 * noise());

    forecast.push({
      hour: i,
      time: `${hour.toString().padStart(2, '0')}:00`,
      seoseokdae,
      ipseokdae,
      jungbong,
      wonhyo,
      jeungsim,
      total: seoseokdae + ipseokdae + jungbong + wonhyo + jeungsim,
    });
  }

  return forecast;
}

export function generateAlerts(trailData: Trail[]): Alert[] {
  const alerts: Alert[] = [];

  trailData.forEach(trail => {
    const ratio = trail.currentCount / trail.capacity;

    if (ratio >= 1.0) {
      alerts.push({
        id: `alert-${trail.id}-overcapacity`,
        trailId: trail.id,
        trailName: trail.name,
        type: 'danger',
        message: `${trail.name} 수용인원 초과! 즉시 분산 유도 필요`,
        timestamp: new Date(),
        status: 'active',
      });
    } else if (ratio >= 0.8) {
      alerts.push({
        id: `alert-${trail.id}-warning`,
        trailId: trail.id,
        trailName: trail.name,
        type: 'warning',
        message: `${trail.name} 혼잡도 80% 도달. 분산 유도 권장`,
        timestamp: new Date(),
        status: 'active',
      });
    }
  });

  return alerts;
}

export const simulationData: SimulationData[] = [
  { trailId: 'seoseokdae', trailName: '서석대', before: 70, after: 45 },
  { trailId: 'ipseokdae', trailName: '입석대', before: 55, after: 48 },
  { trailId: 'jungbong', trailName: '중봉', before: 25, after: 42 },
  { trailId: 'wonhyo', trailName: '원효사', before: 30, after: 38 },
  { trailId: 'jeungsim', trailName: '증심사', before: 40, after: 47 },
];

export const weatherData = {
  current: {
    temp: 12,
    condition: '맑음',
    humidity: 45,
    wind: 8,
  },
  forecast: [
    { time: '오전', temp: 10, condition: '맑음' },
    { time: '오후', temp: 15, condition: '구름조금' },
    { time: '저녁', temp: 8, condition: '맑음' },
  ],
};

export const statsData = {
  todayTotal: 3247,
  yesterdayTotal: 2891,
  weeklyAverage: 2650,
  peakTime: '11:00',
  recommendedTrail: '원효사 코스',
};
