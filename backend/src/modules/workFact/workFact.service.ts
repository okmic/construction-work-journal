import { WorkFact } from "../../models/workFact.model"
import { WORK_TYPES } from "./workFact.constant"

class WorkFactService {
  async findAll() {
    const records = await WorkFact.find().sort({ workDate: -1 })
    return records.map(record => ({
      ...record.toObject(),
      workType: WORK_TYPES.find(type => type.id === record.workTypeId)
    }))
  }

  async findById(id: string) {
    const record = await WorkFact.findById(id)
    if (!record) return null
    return {
      ...record.toObject(),
      workType: WORK_TYPES.find(type => type.id === record.workTypeId)
    }
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    const records = await WorkFact.find({
      workDate: { $gte: startDate, $lte: endDate }
    }).sort({ workDate: -1 })
    return records.map(record => ({
      ...record.toObject(),
      workType: WORK_TYPES.find(type => type.id === record.workTypeId)
    }))
  }

  async create(data: {
    workDate: Date
    workTypeId: string
    volume: number
    unit: string
    workerName: string
  }) {
    const workFact = new WorkFact(data)
    const saved = await workFact.save()
    return {
      ...saved.toObject(),
      workType: WORK_TYPES.find(type => type.id === saved.workTypeId)
    }
  }

  async update(id: string, data: {
    workDate?: Date
    workTypeId?: string
    volume?: number
    unit?: string
    workerName?: string
  }) {
    const updated = await WorkFact.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    if (!updated) return null
    return {
      ...updated.toObject(),
      workType: WORK_TYPES.find(type => type.id === updated.workTypeId)
    }
  }

  async delete(id: string) {
    return await WorkFact.findByIdAndDelete(id)
  }

  async deleteByDateRange(startDate: Date, endDate: Date) {
    return await WorkFact.deleteMany({
      workDate: { $gte: startDate, $lte: endDate }
    })
  }

  async getWorkTypes() {
    return WORK_TYPES
  }
}

export default new WorkFactService()