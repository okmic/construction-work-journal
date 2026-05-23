import { FastifyInstance } from 'fastify'
import WorkFactController from './workFact.controller'

export default class WorkFactModule {
  constructor(server: FastifyInstance) {
    this.getRoutes(server)
  }

  private getRoutes(server: FastifyInstance) {
    server.get('/api/work-facts', {
      handler: WorkFactController.findAll.bind(WorkFactController)
    })

    server.get('/api/work-facts/:id', {
      handler: WorkFactController.findById.bind(WorkFactController)
    })

    server.get('/api/work-facts/range/:startDate/:endDate', {
      handler: WorkFactController.findByDateRange.bind(WorkFactController)
    })

    server.post('/api/work-facts', {
      handler: WorkFactController.create.bind(WorkFactController)
    })

    server.put('/api/work-facts/:id', {
      handler: WorkFactController.update.bind(WorkFactController)
    })

    server.delete('/api/work-facts/:id', {
      handler: WorkFactController.delete.bind(WorkFactController)
    })

    server.get('/api/work-types', {
      handler: WorkFactController.getWorkTypes.bind(WorkFactController)
    })
  }
}