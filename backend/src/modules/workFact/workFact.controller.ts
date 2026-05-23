import { FastifyRequest, FastifyReply } from 'fastify'
import WorkFactService from './workFact.service'

class WorkFactController {
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const records = await WorkFactService.findAll()
    return reply.send(records)
  }

  async findById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params
    const record = await WorkFactService.findById(id)
    if (!record) {
      return reply.code(404).send({ error: 'Record not found' })
    }
    return reply.send(record)
  }

  async findByDateRange(request: FastifyRequest<{ Querystring: { startDate: string, endDate: string } }>, reply: FastifyReply) {
    const { startDate, endDate } = request.query
    const records = await WorkFactService.findByDateRange(new Date(startDate), new Date(endDate))
    return reply.send(records)
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
    return reply.code(201).send(record)
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
      return reply.code(404).send({ error: 'Record not found' })
    }
    return reply.send(record)
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params
    const deleted = await WorkFactService.delete(id)
    if (!deleted) {
      return reply.code(404).send({ error: 'Record not found' })
    }
    return reply.code(204).send()
  }

  async getWorkTypes(request: FastifyRequest, reply: FastifyReply) {
    const types = await WorkFactService.getWorkTypes()
    return reply.send(types)
  }
}

export default new WorkFactController()