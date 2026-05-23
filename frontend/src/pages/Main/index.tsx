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

  const handleSubmit = async (data: WorkFactFormData) => {
    if (editingRecord) {
      await updateRecord(editingRecord._id, data)
      setEditingRecord(null)
    } else {
      await createRecord(data)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Загрузка журнала..." />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Журнал работ
        </h1>
        <p className="text-slate-500 text-sm">
          Учёт выполненных работ на строительном объекте
        </p>
      </div>

      <StatsCards records={records} />
      
      <FilterBar
        filterDate={filterDate}
        onFilterChange={setFilterDate}
      />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WorkFactForm
            workTypes={workTypes}
            onSubmit={handleSubmit}
            editingRecord={editingRecord}
            onCancel={() => setEditingRecord(null)}
          />
        </div>
        
        <div className="lg:col-span-2">
          <WorkFactTable
            records={records}
            workTypes={workTypes}
            onEdit={setEditingRecord}
            onDelete={deleteRecord}
          />
        </div>
      </div>
    </div>
  )
}