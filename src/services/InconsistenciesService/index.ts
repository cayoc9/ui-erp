import { api } from '../api';

export class InconsistenciesService {
  static async getIncon() {
    const { data } = await api.get<Inconsistencies.GetInconsistenciesOutput>('inconsistency-types');

    return data.inconsistencies;
  }
}
