import { Document, Schema, model, Types, Model } from 'mongoose'

export interface IWorkFact extends Document {
  _id: Types.ObjectId
  createdAt: Date
  workDate: Date
  workTypeId: string
  volume: number
  unit: string
  workerName: string
  updatedAt: Date
}

const workFactSchema = new Schema<IWorkFact>({
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

interface IWorkFactModel extends Model<IWorkFact> {}

export const WorkFact = model<IWorkFact, IWorkFactModel>('WorkFact', workFactSchema)