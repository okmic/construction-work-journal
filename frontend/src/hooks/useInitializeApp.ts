import { useEffect, useState } from "react"
import apiWorkFactService from "../pkg/api/api.workFact.service"
import { useDispatch } from "react-redux"
import { setWF, setWT, setLoading } from "../store/slices/workFact.slice"

interface UseInitializeAppReturn {
  isLoading: boolean
  initialized: boolean
  error: Error | null
}

export const useInitializeApp = (): UseInitializeAppReturn => {
  const dispatch = useDispatch()
  const [state, setState] = useState<UseInitializeAppReturn>({
    isLoading: true,
    initialized: false,
    error: null,
  })

  useEffect(() => {
    const initializeApp = async () => {
      try {
        dispatch(setLoading(true))
        const workTypes = await apiWorkFactService.getWorkTypes()
        const workFacts = await apiWorkFactService.findAll()
        
        dispatch(setWT({ wts: workTypes }))
        dispatch(setWF({ wfs: workFacts }))
        dispatch(setLoading(false))

        setState({
          isLoading: false,
          initialized: true,
          error: null,
        })
      } catch (error) {
        dispatch(setLoading(false))
        setState({
          isLoading: false,
          initialized: true,
          error: error as Error,
        })
      }
    }
    initializeApp()
  }, [])

  return state
}