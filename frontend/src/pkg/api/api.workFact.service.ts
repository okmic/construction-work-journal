import axios, { type AxiosInstance } from 'axios'
import appconfig from '../../appconfig'
import { handlerError } from './api.util'
import type { IWorkFact } from '../../../../backend/src/models/workFact.model'

interface WorkType {
  id: string
  name: string
  unit: string
}

interface WorkFactResponse extends IWorkFact {
  workType?: WorkType
}

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

  public async findAll(): Promise<WorkFactResponse[]> {
    return await this.axiosInstance.get<WorkFactResponse[]>(
      `/api/work-facts`,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }

  public async findById(id: string): Promise<WorkFactResponse | null> {
    return await this.axiosInstance.get<WorkFactResponse>(
      `/api/work-facts/${id}`,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }

  public async findByDateRange(startDate: Date, endDate: Date): Promise<WorkFactResponse[]> {
    return await this.axiosInstance.get<WorkFactResponse[]>(
      `/api/work-facts/range/${startDate.toISOString()}/${endDate.toISOString()}`,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }

  public async create(data: {
    workDate: Date
    workTypeId: string
    volume: number
    unit: string
    workerName: string
  }): Promise<WorkFactResponse> {
    return await this.axiosInstance.post<WorkFactResponse>(
      '/api/work-facts',
      data,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }

  public async update(id: string, data: {
    workDate?: Date
    workTypeId?: string
    volume?: number
    unit?: string
    workerName?: string
  }): Promise<WorkFactResponse | null> {
    return await this.axiosInstance.put<WorkFactResponse>(
      `/api/work-facts/${id}`,
      data,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }

  public async delete(id: string): Promise<WorkFactResponse | null> {
    return await this.axiosInstance.delete<WorkFactResponse>(
      `/api/work-facts/${id}`,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }

  public async getWorkTypes(): Promise<WorkType[]> {
    return await this.axiosInstance.get<WorkType[]>(
      `/api/work-types`,
    )
      .then(r => r.data)
      .catch(e => handlerError(e))
  }
}

export default new ApiWorkFactService()