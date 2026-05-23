import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IWorkFact } from '../../../../backend/src/models/workFact.model'

interface workFactState {
    workFact: IWorkFact[]
    workTypes: {
        id: string
        name: string
        unit: string
    }[]
}

const initialState: workFactState = {
    workFact: [],
    workTypes: [],
}

const workFactSlice = createSlice({
    name: 'workFact',
    initialState,
    reducers: {
        setWF: (state, payload: PayloadAction<{ wfs: IWorkFact[] }>) => {
            state.workFact = payload.payload.wfs
        },
        addWF: (state, payload: PayloadAction<{ wf: IWorkFact }>) => {
            state.workFact.unshift(payload.payload.wf)
        },
        updateWF: (state, payload: PayloadAction<{ wf: IWorkFact }>) => {
            const index = state.workFact.findIndex(wf => wf._id === payload.payload.wf._id)
            if (index !== -1) {
                state.workFact[index] = payload.payload.wf
            }
        },
        deleteWF: (state, payload: PayloadAction<{ id: string }>) => {
            state.workFact = state.workFact.filter(wf => wf._id !== payload.payload.id)
        },
        setWT: (state, payload: PayloadAction<{ wts: { id: string, name: string, unit: string }[] }>) => {
            state.workTypes = payload.payload.wts
        }
    }
})

export const { setWF, addWF, updateWF, deleteWF, setWT } = workFactSlice.actions
export default workFactSlice.reducer
