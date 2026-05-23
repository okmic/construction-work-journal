import React, { useState } from 'react'
import { FaEdit, FaTrash, FaCube, FaUser, FaCalendarAlt } from 'react-icons/fa'
import type { WorkFact, WorkType } from '../../../pkg/types/workFact'

interface WorkFactTableProps {
  records: WorkFact[]
  workTypes: WorkType[]
  onEdit: (record: WorkFact) => void
  onDelete: (id: string) => void
}

export const WorkFactTable: React.FC<WorkFactTableProps> = ({ records, workTypes, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
        <FaCube className="text-5xl text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500">Нет записей</p>
        <p className="text-sm text-slate-400 mt-1">Добавьте первую запись через форму справа</p>
      </div>
    )
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
    setTimeout(() => {
      onDelete(id)
      setDeleteId(null)
    }, 100)
  }

  const formatDate = (date: Date | string): string => {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]
    }
    return date
  }

  const getWorkTypeName = (workTypeId: string): string => {
    return workTypes.find(wt => wt.id === workTypeId)?.name || workTypeId
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <FaCalendarAlt className="inline mr-1 text-xs" />
                Дата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Вид работ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Объем
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <FaUser className="inline mr-1 text-xs" />
                Исполнитель
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {records.map((record) => (
              <tr 
                key={record._id} 
                className={`hover:bg-slate-50 transition-colors ${
                  deleteId === record._id ? 'animate-shake bg-red-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-700">
                  {formatDate(record.workDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-800">
                    {getWorkTypeName(record.workTypeId)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-700 font-mono">
                    {record.volume} {record.unit}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                  {record.workerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(record)}
                    className="text-blue-600 hover:text-blue-800 mr-3 transition-colors"
                    title="Редактировать"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Удалить"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Всего записей: {records.length}
        </p>
      </div>
    </div>
  )
}