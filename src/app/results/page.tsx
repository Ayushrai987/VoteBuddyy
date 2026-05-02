'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ls2024Results, ls2019Results, partyColors } from '@/data/elections';
import { useLanguage } from '@/components/providers/LanguageProvider';
import ResultsMap from '@/components/charts/ResultsMap';

export default function ResultsPage() {
  const [year, setYear] = useState<'2024' | '2019'>('2024');
  const { t, language } = useLanguage();
  
  const data = year === '2024' ? ls2024Results : ls2019Results;

  // Custom Tooltip for Bar Chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-3 rounded-lg shadow-xl">
          <p className="font-bold text-[var(--text-primary)]">{label}</p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            {t('results.seats')}: {payload[0].value}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {t('results.voteShare')}: {payload[0].payload.voteShare}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-enter mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          {t('nav.results')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
          {t('results.subtitle')}
        </p>
      </div>

      {/* Controls */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-[var(--bg-glass)] border border-[var(--border-color)] p-1 rounded-xl">
          <button
            onClick={() => setYear('2024')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              year === '2024' 
                ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-md' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('results.ls2024')}
          </button>
          <button
            onClick={() => setYear('2019')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
              year === '2019' 
                ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-md' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {t('results.ls2019')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Map Visualization */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6 self-start">
            {t('results.geoWinners')}
          </h2>
          <ResultsMap year={year} />
        </div>

        {/* Main Bar Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">
            {t('results.seatTally')}
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis 
                  dataKey="party" 
                  stroke="var(--text-muted)" 
                  tick={{ fill: 'var(--text-secondary)' }}
                  axisLine={{ stroke: 'var(--border-color)' }}
                />
                <YAxis 
                  stroke="var(--text-muted)"
                  tick={{ fill: 'var(--text-secondary)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-glass)' }} />
                <Bar 
                  dataKey="seats" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Pie Chart / Summary */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-6">
            {t('results.voteShare')} %
          </h2>
          <div className="h-[250px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="voteShare"
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any, name: any, props: any) => [`${value}%`, props?.payload?.party || name]}
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
              {t('results.topParties')}
            </h3>
            <div className="space-y-3">
              {data.slice(0, 3).map((p) => (
                <div key={p.party} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }}></div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{p.party}</span>
                  </div>
                  <div className="text-sm font-bold">{p.seats} <span className="text-[10px] text-[var(--text-muted)] font-normal">{t('results.seats')}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-4 border-b border-[var(--border-color)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {t('results.detailedBreakdown')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[var(--bg-glass)]">
                  <th className="p-4 font-semibold text-[var(--text-secondary)]">{t('results.party')}</th>
                  <th className="p-4 font-semibold text-[var(--text-secondary)]">{t('results.seatsWon')}</th>
                  <th className="p-4 font-semibold text-[var(--text-secondary)]">{t('results.voteShare')}</th>
                  <th className="p-4 font-semibold text-[var(--text-secondary)]">{t('results.change')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => {
                  let changeStr = "-";
                  let changeClass = "text-[var(--text-muted)]";
                  
                  if (year === '2024') {
                    const past = ls2019Results.find(p => p.party === row.party);
                    if (past) {
                      const diff = row.seats - past.seats;
                      if (diff > 0) {
                        changeStr = `+${diff}`;
                        changeClass = "text-green-500 font-medium";
                      } else if (diff < 0) {
                        changeStr = `${diff}`;
                        changeClass = "text-red-500 font-medium";
                      } else {
                        changeStr = t('results.noChange');
                      }
                    }
                  }

                  return (
                    <tr key={row.party} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-glass)] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: row.color }}></div>
                          <span className="font-medium text-[var(--text-primary)]">{row.party}</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-[var(--text-primary)]">{row.seats}</td>
                      <td className="p-4 text-[var(--text-secondary)]">{row.voteShare}%</td>
                      <td className={`p-4 ${changeClass}`}>{changeStr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
