import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useWorkFacts } from './hooks/useWorkFacts'
import type { WorkFact, WorkFactFormData } from '../../pkg/types/workFact'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import { StatsCards } from './components/StatsCards'
import { FilterBar } from './components/FilterBar'
import { WorkFactForm } from './components/WorkFactForm'
import { WorkFactTable } from './components/WorkFactTable'
import type { RootState } from '../../store/store'
import { FaClipboardList, FaPlusCircle, FaPen, FaTimes } from 'react-icons/fa'

export const WorkJournalPage: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.workFact.isLoading)
  const {
    records,
    workTypes,
    filterDate,
    setFilterDate,
    createRecord,
    updateRecord,
    deleteRecord
  } = useWorkFacts()

  const [editingRecord, setEditingRecord] = useState<WorkFact | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (record: WorkFact) => {
    setEditingRecord(record)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingRecord(null)
    setShowForm(true)
  }

  const handleSubmit = async (data: WorkFactFormData) => {
    if (editingRecord) {
      await updateRecord(editingRecord._id, data)
    } else {
      await createRecord(data)
    }
    setShowForm(false)
    setEditingRecord(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingRecord(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <LoadingSpinner size="lg" text="Загрузка журнала..." />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <FaClipboardList className="text-white text-sm" />
              </div>
              Журнал работ
            </h1>
            <p className="text-sm text-slate-500 ml-10">Учёт выполненных работ на строительном объекте</p>
          </div>
          
          {!showForm && (
            <button
              onClick={handleCreate}
              className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 shadow-sm"
            >
              <FaPlusCircle className="text-xs" />
              Новая запись
            </button>
          )}
        </div>
      </div>

      <StatsCards records={records} />
      
      <div className="mt-6">
        {showForm ? (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex items-center justify-between">
              <div className="cursor-pointer flex items-center gap-2">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${editingRecord ? 'bg-blue-100' : 'bg-orange-100'}`}>
                  {editingRecord ? (
                    <FaPen className="text-blue-600 text-xs" />
                  ) : (
                    <FaPlusCircle className="text-orange-600 text-xs" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    {editingRecord ? 'Редактирование записи' : 'Новая запись'}
                  </h2>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="group cursor-pointer w-7 h-7 rounded-lg bg-orange-100 hover:bg-orange-500 transition-all duration-200 flex items-center justify-center shadow-sm"
              >
                <FaTimes className="text-orange-500 group-hover:text-white text-sm transition-colors duration-200" />
              </button>
            </div>
            <div className="p-4">
              <WorkFactForm
                workTypes={workTypes}
                onSubmit={handleSubmit}
                editingRecord={editingRecord}
                onCancel={handleCancel}
              />
            </div>
          </div>
        ) : (
          <>
            <FilterBar
              filterDate={filterDate}
              onFilterChange={setFilterDate}
            />
            <div className="mt-4">
              <WorkFactTable
                records={records}
                workTypes={workTypes}
                onEdit={handleEdit}
                onDelete={deleteRecord}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}