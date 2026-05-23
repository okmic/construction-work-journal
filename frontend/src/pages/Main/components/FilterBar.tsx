import React, { useRef } from 'react'
import { FaCalendarAlt, FaTimes, FaFilter } from 'react-icons/fa'

interface FilterBarProps {
  filterDate: string
  onFilterChange: (date: string) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({ filterDate, onFilterChange }) => {
  const dateInputRef = useRef<HTMLInputElement>(null)

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-')
    return `${day}.${month}.${year}`
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value)
  }

  const handleClearFilter = () => {
    onFilterChange('')
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <input
          ref={dateInputRef}
          type="date"
          value={filterDate}
          onChange={handleDateChange}
          className="px-3 py-1.5 pr-7 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 cursor-pointer"
        />
        <FaCalendarAlt className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 text-xs pointer-events-none" />
      </div>
      
      {filterDate ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            Фильтр: <span className="font-mono text-slate-700">{formatDisplayDate(filterDate)}</span>
          </span>
          <button
            onClick={handleClearFilter}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500 text-white rounded-md text-xs font-medium hover:bg-orange-600 transition-all shadow-sm hover:shadow"
          >
            <FaTimes className="text-xs" />
            Сбросить
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <FaFilter className="text-slate-300 text-xs" />
          <span className="text-sm text-slate-400">Все записи</span>
        </div>
      )}
    </div>
  )
}