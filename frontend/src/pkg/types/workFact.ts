import type { IWorkFact } from "../../../../backend/src/models/WorkFact.model"

export type WorkFact = IWorkFact
export type WorkType = {
    id: string
    name: string
    unit: string
}
export type WorkFactFormData = {
  workDate: string
  workTypeId: string
  volume: number
  unit: string
  workerName: string
}