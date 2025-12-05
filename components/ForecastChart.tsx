'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
} from 'recharts';
import { ForecastData } from '@/lib/types';

interface ForecastChartProps {
  data: ForecastData[];
  type?: 'line' | 'area' | 'bar';
  showTotal?: boolean;
}

const trailColors = {
  seoseokdae: '#ef4444',
  ipseokdae: '#f97316',
  jungbong: '#eab308',
  wonhyo: '#22c55e',
  jeungsim: '#14b8a6',
  total: '#6366f1',
};

const trailNames = {
  seoseokdae: '서석대',
  ipseokdae: '입석대',
  jungbong: '중봉',
  wonhyo: '원효사',
  jeungsim: '증심사',
  total: '전체',
};

export function ForecastChart({ data, type = 'area', showTotal = false }: ForecastChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {trailNames[entry.dataKey as keyof typeof trailNames] || entry.dataKey}: {entry.value.toLocaleString()}명
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => trailNames[value as keyof typeof trailNames] || value}
          />
          <Bar dataKey="seoseokdae" fill={trailColors.seoseokdae} radius={[4, 4, 0, 0]} />
          <Bar dataKey="ipseokdae" fill={trailColors.ipseokdae} radius={[4, 4, 0, 0]} />
          <Bar dataKey="jungbong" fill={trailColors.jungbong} radius={[4, 4, 0, 0]} />
          <Bar dataKey="wonhyo" fill={trailColors.wonhyo} radius={[4, 4, 0, 0]} />
          <Bar dataKey="jeungsim" fill={trailColors.jeungsim} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            {Object.entries(trailColors).map(([key, color]) => (
              <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => trailNames[value as keyof typeof trailNames] || value}
          />
          {showTotal && (
            <Area
              type="monotone"
              dataKey="total"
              stroke={trailColors.total}
              fill={`url(#colortotal)`}
              strokeWidth={2}
            />
          )}
          <Area
            type="monotone"
            dataKey="seoseokdae"
            stroke={trailColors.seoseokdae}
            fill={`url(#colorseoseokdae)`}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="ipseokdae"
            stroke={trailColors.ipseokdae}
            fill={`url(#coloripseokdae)`}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="wonhyo"
            stroke={trailColors.wonhyo}
            fill={`url(#colorwonhyo)`}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="jeungsim"
            stroke={trailColors.jeungsim}
            fill={`url(#colorjeungsim)`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => trailNames[value as keyof typeof trailNames] || value}
        />
        {showTotal && (
          <Line type="monotone" dataKey="total" stroke={trailColors.total} strokeWidth={3} dot={false} />
        )}
        <Line type="monotone" dataKey="seoseokdae" stroke={trailColors.seoseokdae} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="ipseokdae" stroke={trailColors.ipseokdae} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="jungbong" stroke={trailColors.jungbong} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="wonhyo" stroke={trailColors.wonhyo} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="jeungsim" stroke={trailColors.jeungsim} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface TotalChartProps {
  data: ForecastData[];
}

export function TotalForecastChart({ data }: TotalChartProps) {
  const peakHour = data.reduce((max, item) => (item.total > max.total ? item : max), data[0]);

  return (
    <div>
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-amber-800">
            예상 피크 시간: <strong>{peakHour?.time}</strong> (약 {peakHour?.total.toLocaleString()}명)
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" interval={2} />
          <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 rounded-lg shadow border border-gray-200">
                    <p className="text-sm font-bold">{label}</p>
                    <p className="text-sm text-green-600">예상: {payload[0].value?.toLocaleString()}명</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#22c55e"
            fill="url(#colorTotal)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
