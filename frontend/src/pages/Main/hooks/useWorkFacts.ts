import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import apiWorkFactService from '../../../pkg/api/api.workFact.service'
import { addWF, updateWF, removeWF, setFilterDate } from '../../../store/slices/workFact.slice'
import type { RootState } from '../../../store/store'
import type { WorkFactFormData } from "../../../pkg/types/workFact"

export const useWorkFacts = () => {
  const dispatch = useDispatch()
  const records = useSelector((state: RootState) => state.workFact.records)
  const workTypes = useSelector((state: RootState) => state.workFact.workTypes)
  const filterDate = useSelector((state: RootState) => state.workFact.filterDate)

  const createRecord = async (data: WorkFactFormData) => {
    try {
      const newRecord = await apiWorkFactService.create(data)
      dispatch(addWF(newRecord))
      toast.success('Запись добавлена')
      return newRecord
    } catch (error) {
      toast.error('Не удалось добавить запись')
      throw error
    }
  }

  const updateRecord = async (id: string, data: Partial<WorkFactFormData>) => {
    try {
      const convertedData: {
        workDate?: Date
        workTypeId?: string
        volume?: number
        unit?: string
        workerName?: string
      } = {
        ...data,
        workDate: data.workDate ? new Date(data.workDate) : undefined
      }
      const updated = await apiWorkFactService.update(id, convertedData)
      if (updated) {
        dispatch(updateWF(updated))
      }
      toast.success('Запись обновлена')
      return updated
    } catch (error) {
      toast.error('Не удалось обновить запись')
      throw error
    }
  }

  const deleteRecord = async (id: string) => {
    try {
      await apiWorkFactService.delete(id)
      dispatch(removeWF(id))
      toast.success('Запись удалена')
    } catch (error) {
      toast.error('Не удалось удалить запись')
      throw error
    }
  }

  const handleSetFilterDate = (date: string) => {
    dispatch(setFilterDate(date))
  }

  const filteredRecords = filterDate
    ? records.filter(record => {
        const recordDate = record.workDate instanceof Date
          ? record.workDate.toISOString().split('T')[0]
          : record.workDate
        return recordDate === filterDate
      })
    : records

  return {
    records: filteredRecords,
    allRecords: records,
    workTypes,
    filterDate,
    setFilterDate: handleSetFilterDate,
    createRecord,
    updateRecord,
    deleteRecord
  }
}