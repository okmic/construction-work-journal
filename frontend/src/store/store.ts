import { configureStore } from '@reduxjs/toolkit'
import workFactSlice from './slices/workFact.slice'

const store = configureStore({
  reducer: {
    workFact: workFactSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
