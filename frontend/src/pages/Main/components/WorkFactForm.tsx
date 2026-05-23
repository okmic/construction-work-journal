import React, { useState, useEffect } from 'react'
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast'
import type { WorkType, WorkFact, WorkFactFormData } from '../../../pkg/types/workFact'

interface WorkFactFormProps {
  workTypes: WorkType[]
  onSubmit: (data: WorkFactFormData) => Promise<void>
  editingRecord: WorkFact | null
  onCancel: () => void
}

export const WorkFactForm: React.FC<WorkFactFormProps> = ({
  workTypes,
  onSubmit,
  editingRecord,
  onCancel
}) => {
  const [formData, setFormData] = useState<WorkFactFormData>({
    workDate: '',
    workTypeId: '',
    volume: 0,
    unit: '',
    workerName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingRecord) {
      const workDate = editingRecord.workDate instanceof Date
        ? editingRecord.workDate.toISOString().split('T')[0]
        : editingRecord.workDate
      
      setFormData({
        workDate,
        workTypeId: editingRecord.workTypeId,
        volume: editingRecord.volume,
        unit: editingRecord.unit,
        workerName: editingRecord.workerName
      })
    } else {
      setFormData({
        workDate: new Date().toISOString().split('T')[0],
        workTypeId: '',
        volume: 0,
        unit: '',
        workerName: ''
      })
    }
  }, [editingRecord])

  const handleWorkTypeChange = (workTypeId: string) => {
    const selectedType = workTypes.find(t => t.id === workTypeId)
    setFormData({
      ...formData,
      workTypeId,
      unit: selectedType?.unit || ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.workDate || !formData.workTypeId || !formData.volume || !formData.workerName) {
      toast.error('Заполните все обязательные поля')
      return
    }

    setIsSubmitting(true)
    await onSubmit(formData)
    setIsSubmitting(false)
    
    if (!editingRecord) {
      setFormData({
        workDate: new Date().toISOString().split('T')[0],
        workTypeId: '',
        volume: 0,
        unit: '',
        workerName: ''
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sticky top-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        {editingRecord ? (
          <>
            <FaSave className="text-orange-600" />
            Редактирование записи
          </>
        ) : (
          <>
            <FaPlus className="text-orange-600" />
            Добавить запись
          </>
        )}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Дата выполнения *
          </label>
          <input
            type="date"
            value={formData.workDate}
            onChange={(e) => setFormData({ ...formData, workDate: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Вид работ *
          </label>
          <select
            value={formData.workTypeId}
            onChange={(e) => handleWorkTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            required
          >
            <option value="">Выберите вид работ</option>
            {workTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Объем *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.volume || ''}
              onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ед. изм.
            </label>
            <input
              type="text"
              value={formData.unit}
              readOnly
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-600"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            ФИО исполнителя *
          </label>
          <input
            type="text"
            value={formData.workerName}
            onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
            placeholder="Иванов И.И."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            required
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Сохранение...' : (editingRecord ? 'Сохранить' : 'Добавить')}
          </button>
          
          {editingRecord && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              <FaTimes className="inline mr-1" />
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  )
}