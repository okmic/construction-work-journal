import React from 'react'
import { FaCalendarAlt, FaTimes } from 'react-icons/fa'

interface FilterBarProps {
  filterDate: string
  onFilterChange: (date: string) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({ filterDate, onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-slate-400 text-sm" />
          <label className="text-sm font-medium text-slate-700">
            Фильтр по дате
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        {filterDate && (
          <button
            onClick={() => onFilterChange('')}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <FaTimes className="text-xs" />
            Сбросить фильтр
          </button>
        )}
      </div>
    </div>
  )
}