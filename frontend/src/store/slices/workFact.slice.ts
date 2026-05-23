import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WorkFact, WorkType } from '../../pkg/types/workFact'

interface WorkFactState {
  records: WorkFact[]
  workTypes: WorkType[]
  filterDate: string
  isLoading: boolean
}

const initialState: WorkFactState = {
  records: [],
  workTypes: [],
  filterDate: '',
  isLoading: true
}

const workFactSlice = createSlice({
  name: 'workFact',
  initialState,
  reducers: {
    setWF: (state, action: PayloadAction<{ wfs: WorkFact[] }>) => {
      state.records = action.payload.wfs
      state.isLoading = false
    },
    setWT: (state, action: PayloadAction<{ wts: WorkType[] }>) => {
      state.workTypes = action.payload.wts
    },
    addWF: (state, action: PayloadAction<WorkFact>) => {
      state.records = [action.payload, ...state.records]
    },
    updateWF: (state, action: PayloadAction<WorkFact>) => {
      state.records = state.records.map(record =>
        record._id === action.payload._id ? action.payload : record
      )
    },
    removeWF: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(record => record._id !== action.payload)
    },
    setFilterDate: (state, action: PayloadAction<string>) => {
      state.filterDate = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setWF, setWT, addWF, updateWF, removeWF, setFilterDate, setLoading } = workFactSlice.actions
export default workFactSlice.reducer