import { Document, Schema, model, Model } from 'mongoose'

export interface IWorkFact {
  _id: string
  createdAt: Date
  workDate: Date
  workTypeId: string
  volume: number
  unit: string
  workerName: string
  updatedAt: Date
  workType?: {
    id: string
    name: string
    unit: string
  }
}

export type WorkFactDocument = Document & IWorkFact

const workFactSchema = new Schema<WorkFactDocument>({
  workDate: { type: Date, required: true },
  workTypeId: { type: String, required: true },
  volume: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true },
  workerName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

workFactSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: new Date() })
})

interface IWorkFactModel extends Model<WorkFactDocument> {}

export const WorkFact = model<WorkFactDocument, IWorkFactModel>('WorkFact', workFactSchema)