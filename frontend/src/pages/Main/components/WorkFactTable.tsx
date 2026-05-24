import React, { useState } from 'react'
import { FaEdit, FaTrash, FaCube, FaUser, FaCalendarAlt, FaRulerCombined, FaHardHat, FaCheckCircle, FaClock } from 'react-icons/fa'
import type { WorkFact, WorkType } from '../../../pkg/types/workFact'
import { formatDate } from '../../../pkg/utils/date.util'

interface WorkFactTableProps {
  records: WorkFact[]
  workTypes: WorkType[]
  onEdit: (record: WorkFact) => void
  onDelete: (id: string) => void
}

export const WorkFactTable: React.FC<WorkFactTableProps> = ({ records, workTypes, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
          <FaCube className="text-3xl text-slate-300" />
        </div>
        <p className="text-base font-semibold text-slate-500 mb-1">Журнал пуст</p>
        <p className="text-sm text-slate-400">Нажмите «Новая запись» чтобы добавить первую работу</p>
      </div>
    )
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setTimeout(() => {
      onDelete(id)
      setDeleteId(null)
    }, 200)
  }

  const getWorkTypeName = (workTypeId: string): string => {
    return workTypes.find(wt => wt.id === workTypeId)?.name || workTypeId
  }

  const getWorkTypeUnit = (workTypeId: string): string => {
    return workTypes.find(wt => wt.id === workTypeId)?.unit || ''
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
              <th className="px-5 py-3.5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <FaCalendarAlt className="text-orange-500 text-xs" />
                  Дата
                </div>
              </th>
              <th className="px-5 py-3.5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <FaHardHat className="text-orange-500 text-xs" />
                  Вид работ
                </div>
              </th>
              <th className="px-5 py-3.5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <FaRulerCombined className="text-orange-500 text-xs" />
                  Объем
                </div>
              </th>
              <th className="px-5 py-3.5 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <FaUser className="text-orange-500 text-xs" />
                  Исполнитель
                </div>
              </th>
              <th className="px-5 py-3.5 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((record, index) => (
              <tr 
                key={record._id} 
                onMouseEnter={() => setHoveredRow(record._id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`transition-all duration-200 ${
                  deleteId === record._id 
                    ? 'bg-red-50 animate-pulse' 
                    : hoveredRow === record._id 
                      ? 'bg-gradient-to-r from-orange-50/60 to-transparent' 
                      : index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                }`}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FaCalendarAlt className="text-blue-500 text-xs" />
                    </div>
                    <span className="text-sm font-mono font-medium text-slate-700">
                      {formatDate(record.workDate)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                      <FaHardHat className="text-orange-600 text-xs" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      {getWorkTypeName(record.workTypeId)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <FaRulerCombined className="text-emerald-600 text-xs" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-orange-600">
                        {record.volume.toLocaleString('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-slate-500 ml-0.5 font-mono">
                        {record.unit || getWorkTypeUnit(record.workTypeId)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-sm">
                      <FaUser className="text-slate-600 text-xs" />
                    </div>
                    <span className="text-sm text-slate-700">
                      {record.workerName}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="group relative w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
                      title="Редактировать"
                    >
                      <FaEdit className="text-sm transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Редактировать
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="group relative w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center shadow-sm hover:shadow-md cursor-pointer"
                      title="Удалить"
                    >
                      <FaTrash className="text-sm transition-transform" />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Удалить
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-5 py-2.5 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-emerald-500 text-xs" />
            <p className="text-xs text-slate-500">
              Всего записей: <span className="font-bold text-slate-700">{records.length}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <FaClock className="text-slate-300 text-[10px]" />
            <span className="text-[10px] text-slate-400">актуально</span>
          </div>
        </div>
      </div>
    </div>
  )
}
