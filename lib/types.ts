export interface Trail {
  id: string;
  name: string;
  shortName: string;
  capacity: number;
  currentCount: number;
  distance: string;
  difficulty: 'easy' | 'medium' | 'hard';
  coordinates: { lat: number; lng: number }[];
  description: string;
}

export interface CrowdData {
  trailId: string;
  timestamp: Date;
  count: number;
  predicted: boolean;
}

export interface Alert {
  id: string;
  trailId: string;
  trailName: string;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: Date;
  status: 'active' | 'resolved';
}

export interface ForecastData {
  hour: number;
  time: string;
  seoseokdae: number;
  ipseokdae: number;
  jungbong: number;
  wonhyo: number;
  jeungsim: number;
  total: number;
}

export interface SimulationData {
  trailId: string;
  trailName: string;
  before: number;
  after: number;
}

export type CrowdLevel = 'low' | 'medium' | 'high';

export function getCrowdLevel(current: number, capacity: number): CrowdLevel {
  const ratio = current / capacity;
  if (ratio < 0.5) return 'low';
  if (ratio < 0.8) return 'medium';
  return 'high';
}

export function getCrowdLevelColor(level: CrowdLevel): string {
  switch (level) {
    case 'low': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'high': return '#ef4444';
  }
}

export function getCrowdLevelText(level: CrowdLevel): string {
  switch (level) {
    case 'low': return '여유';
    case 'medium': return '보통';
    case 'high': return '혼잡';
  }
}
