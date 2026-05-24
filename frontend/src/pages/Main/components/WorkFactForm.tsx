import React, { useState, useEffect, useRef } from 'react'
import { FaCalendarAlt, FaChevronDown, FaSearch, FaInfoCircle, FaHardHat, FaCube, FaUser, FaRulerCombined } from 'react-icons/fa'
import toast from 'react-hot-toast'
import type { WorkType, WorkFact, WorkFactFormData } from '../../../pkg/types/workFact'
import { formatDate } from '../../../pkg/utils/date.util'

interface WorkFactFormProps {
  workTypes: WorkType[]
  onSubmit: (data: WorkFactFormData) => Promise<void>
  editingRecord: WorkFact | null
  onCancel: () => void
}

const UNIT_OPTIONS = ['м³', 'м²', 'м', 'т', 'кг', 'шт', 'компл', 'п.м', 'м³/ч']

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
  const [isOpen, setIsOpen] = useState(false)
  const [isUnitOpen, setIsUnitOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [unitSearchTerm, setUnitSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const unitDropdownRef = useRef<HTMLDivElement>(null)

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
      setSearchTerm(workTypes.find(t => t.id === editingRecord.workTypeId)?.name || '')
    } else {
      const today = new Date().toISOString().split('T')[0]
      setFormData({
        workDate: today,
        workTypeId: '',
        volume: 0,
        unit: '',
        workerName: ''
      })
      setSearchTerm('')
    }
  }, [editingRecord, workTypes])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
      if (unitDropdownRef.current && !unitDropdownRef.current.contains(event.target as Node)) {
        setIsUnitOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedWorkType = workTypes.find(t => t.id === formData.workTypeId)
  const filteredWorkTypes = workTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUnits = UNIT_OPTIONS.filter(unit =>
    unit.toLowerCase().includes(unitSearchTerm.toLowerCase())
  )

  const handleWorkTypeSelect = (type: WorkType) => {
    setFormData({
      ...formData,
      workTypeId: type.id,
      unit: type.unit
    })
    setSearchTerm(type.name)
    setIsOpen(false)
  }

  const handleUnitSelect = (unit: string) => {
    setFormData({
      ...formData,
      unit
    })
    setIsUnitOpen(false)
    setUnitSearchTerm('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.workTypeId) {
      toast.error('Выберите вид работ')
      return
    }
    
    if (!formData.volume || formData.volume <= 0) {
      toast.error('Укажите корректный объем')
      return
    }
    
    if (!formData.workerName.trim()) {
      toast.error('Укажите ФИО исполнителя')
      return
    }

    setIsSubmitting(true)
    await onSubmit(formData)
    setIsSubmitting(false)
    
    if (!editingRecord) {
      const today = new Date().toISOString().split('T')[0]
      setFormData({
        workDate: today,
        workTypeId: '',
        volume: 0,
        unit: '',
        workerName: ''
      })
      setSearchTerm('')
    }
  }

  const helpItems = [
    { icon: FaCalendarAlt, label: 'Дата выполнения', desc: 'Укажите день, когда были выполнены работы. По умолчанию — сегодняшняя дата.' },
    { icon: FaHardHat, label: 'Вид работ', desc: 'Выберите тип выполненных работ из справочника. Доступен поиск по названию.' },
    { icon: FaCube, label: 'Объем', desc: 'Укажите количество выполненных работ в числовом значении (например, 24.5).' },
    { icon: FaRulerCombined, label: 'Единица измерения', desc: 'Выберите единицу измерения из списка или используйте автоматическую подстановку.' },
    { icon: FaUser, label: 'Исполнитель', desc: 'ФИО бригадира или работника, выполнившего работы (например, "Иванов И.И.").' }
  ]

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Дата выполнения
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.workDate}
                onChange={(e) => setFormData({ ...formData, workDate: e.target.value })}
                className="w-full px-3 py-2 pr-8 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Исполнитель
            </label>
            <input
              type="text"
              value={formData.workerName}
              onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
              placeholder="Иванов И.И."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Вид работ
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-left flex items-center justify-between transition-colors focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            >
              <span className={selectedWorkType ? 'text-slate-700' : 'text-slate-400'}>
                {selectedWorkType?.name || 'Выберите вид работ'}
              </span>
              <FaChevronDown className={`text-slate-400 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                />
                <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden" style={{ minWidth: '300px' }}>
                  <div className="p-3 border-b border-slate-100 bg-slate-50">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type="text"
                        placeholder="Поиск видов работ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredWorkTypes.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <p className="text-slate-400 text-sm">Ничего не найдено</p>
                      </div>
                    ) : (
                      filteredWorkTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleWorkTypeSelect(type)}
                          className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center justify-between
                            ${selectedWorkType?.id === type.id ? 'bg-orange-50' : ''}`}
                        >
                          <span className={`text-sm ${selectedWorkType?.id === type.id ? 'text-orange-600 font-medium' : 'text-slate-700'}`}>
                            {type.name}
                          </span>
                          <span className={`text-xs font-mono px-2 py-1 rounded ${selectedWorkType?.id === type.id ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                            {type.unit}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Объем
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.volume || ''}
              onChange={(e) => setFormData({ ...formData, volume: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-700 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Единица измерения
            </label>
            <div className="relative" ref={unitDropdownRef}>
              <button
                type="button"
                onClick={() => setIsUnitOpen(!isUnitOpen)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-left flex items-center justify-between transition-colors focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              >
                <span className={formData.unit ? 'text-slate-700 font-mono' : 'text-slate-400'}>
                  {formData.unit || 'Выберите единицу измерения'}
                </span>
                <FaChevronDown className={`text-slate-400 text-xs transition-transform ${isUnitOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isUnitOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUnitOpen(false)}
                  />
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-2 border-b border-slate-100 bg-slate-50">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                        <input
                          type="text"
                          placeholder="Поиск единиц измерения..."
                          value={unitSearchTerm}
                          onChange={(e) => setUnitSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredUnits.length === 0 ? (
                        <div className="px-4 py-6 text-center">
                          <p className="text-slate-400 text-sm">Ничего не найдено</p>
                        </div>
                      ) : (
                        filteredUnits.map((unit) => (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => handleUnitSelect(unit)}
                            className={`w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors font-mono text-sm
                              ${formData.unit === unit ? 'bg-orange-50 text-orange-600 font-medium' : 'text-slate-700'}`}
                          >
                            {unit}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer flex-1 bg-orange-500 text-white py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                Сохранение...
              </span>
            ) : (editingRecord ? 'Сохранить' : 'Добавить')}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 border border-slate-300 text-slate-600 rounded-lg font-medium text-sm transition-all"
          >
            Отмена
          </button>
        </div>
        
        {editingRecord && (
          <div className="text-center text-xs text-orange-600 bg-orange-50 py-1.5 rounded-lg">
            Редактирование: {formatDate(formData.workDate)}
          </div>
        )}
        
        <div className="border-t border-slate-100 pt-4 mt-2">
          <div className="flex items-center gap-2 mb-3">
            <FaInfoCircle className="text-orange-400 text-xs" />
            <span className="text-xs font-medium text-slate-500">Справка по заполнению</span>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {helpItems.map((item, idx) => (
              <div key={idx} className="flex gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="text-orange-500 text-xs" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
