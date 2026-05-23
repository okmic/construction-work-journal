import React from 'react'
import { FaClipboardList, FaUsers, FaCube, FaChartLine } from 'react-icons/fa'
import type { WorkFact } from '../../../pkg/types/workFact'

interface StatsCardsProps {
  records: WorkFact[]
}

export const StatsCards: React.FC<StatsCardsProps> = ({ records }) => {
  const totalVolume = records.reduce((sum, r) => sum + r.volume, 0)
  const uniqueWorkers = new Set(records.map(r => r.workerName)).size
  const uniqueWorkTypes = new Set(records.map(r => r.workTypeId)).size

  const stats = [
    {
      label: 'Всего записей',
      value: records.length,
      icon: FaClipboardList,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Общий объем',
      value: totalVolume.toFixed(1),
      unit: 'ед.',
      icon: FaCube,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      label: 'Исполнителей',
      value: uniqueWorkers,
      icon: FaUsers,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Видов работ',
      value: uniqueWorkTypes,
      icon: FaChartLine,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`${stat.bg} p-2 rounded-lg`}>
              <stat.icon className={`${stat.color} text-sm`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {stat.value}
            {stat.unit && <span className="text-sm font-normal text-slate-500 ml-1">{stat.unit}</span>}
          </p>
          <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}