import axios, { type AxiosInstance } from 'axios'
import appconfig from '../../appconfig'
import { handlerError } from './api.util'
import type { WorkFact, WorkFactFormData, WorkType } from "../types/workFact"

class ApiWorkFactService {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: appconfig.backendUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public async findAll(): Promise<WorkFact[]> {
    return await this.axiosInstance.get(
      `/api/work-facts`,
    )
      .then(r => r.data.records)
      .catch(e => handlerError(e))
  }

  public async findById(id: string): Promise<WorkFact | null> {
    return await this.axiosInstance.get(
      `/api/work-facts/${id}`,
    )
      .then(r => r.data.record)
      .catch(e => handlerError(e))
  }

  public async findByDateRange(startDate: Date, endDate: Date): Promise<WorkFact[]> {
    return await this.axiosInstance.get(
      `/api/work-facts/range/${startDate.toISOString()}/${endDate.toISOString()}`,
    )
      .then(r => r.data.records)
      .catch(e => handlerError(e))
  }

  public async create(data: WorkFactFormData): Promise<WorkFact> {
    return await this.axiosInstance.post(
      '/api/work-facts',
      data,
    )
      .then(r => r.data.record)
      .catch(e => handlerError(e))
  }

  public async update(id: string, data: {
    workDate?: Date
    workTypeId?: string
    volume?: number
    unit?: string
    workerName?: string
  }): Promise<WorkFact | null> {
    return await this.axiosInstance.put(
      `/api/work-facts/${id}`,
      data,
    )
      .then(r => r.data.record)
      .catch(e => handlerError(e))
  }

  public async delete(id: string): Promise<WorkFact | null> {
    return await this.axiosInstance.delete(
      `/api/work-facts/${id}`,
    )
      .then(r => r.data.record)
      .catch(e => handlerError(e))
  }

  public async getWorkTypes(): Promise<WorkType[]> {
    return await this.axiosInstance.get(
      `/api/work-types`,
    )
      .then(r => r.data.types)
      .catch(e => handlerError(e))
  }
}

export default new ApiWorkFactService()