import { FastifyRequest, FastifyReply } from 'fastify'
import WorkFactService from './workFact.service'
import { successResponse } from '../../pkg/request/response.handler'

class WorkFactController {
  async findAll(_request: FastifyRequest, reply: FastifyReply) {
    const records = await WorkFactService.findAll()
    return successResponse("success", { records }, reply)
  }

  async findById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params
    const record = await WorkFactService.findById(id)
    if (!record) {
      return successResponse("Record not found", null, reply)
    }
    return successResponse("success", { record }, reply)
  }

  async findByDateRange(request: FastifyRequest<{ Querystring: { startDate: string, endDate: string } }>, reply: FastifyReply) {
    const { startDate, endDate } = request.query
    const records = await WorkFactService.findByDateRange(new Date(startDate), new Date(endDate))
    return successResponse("success", { records }, reply)
  }

  async create(request: FastifyRequest<{ Body: { workDate: string, workTypeId: string, volume: number, unit: string, workerName: string } }>, reply: FastifyReply) {
    const { workDate, workTypeId, volume, unit, workerName } = request.body
    const record = await WorkFactService.create({
      workDate: new Date(workDate),
      workTypeId,
      volume,
      unit,
      workerName
    })
    return successResponse("Record created successfully", { record }, reply)
  }

  async update(request: FastifyRequest<{ Params: { id: string }, Body: { workDate?: string, workTypeId?: string, volume?: number, unit?: string, workerName?: string } }>, reply: FastifyReply) {
    const { id } = request.params
    const { workDate, workTypeId, volume, unit, workerName } = request.body
    const record = await WorkFactService.update(id, {
      workDate: workDate ? new Date(workDate) : undefined,
      workTypeId,
      volume,
      unit,
      workerName
    })
    if (!record) {
      return successResponse("Record not found", null, reply)
    }
    return successResponse("Record updated successfully", { record }, reply)
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params
    const deleted = await WorkFactService.delete(id)
    if (!deleted) {
      return successResponse("Record not found", null, reply)
    }
    return successResponse("Record deleted successfully", null, reply)
  }

  async getWorkTypes(_request: FastifyRequest, reply: FastifyReply) {
    const types = await WorkFactService.getWorkTypes()
    return successResponse("success", { types }, reply)
  }
}

export default new WorkFactController()