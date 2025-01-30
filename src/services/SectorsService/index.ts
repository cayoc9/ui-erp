import { api } from '../api';

export class SectorsService {
  static async getSectors() {
    const { data } = await api.get<Sectors.GetSectorsOutput>('sectors');

    return data.sectors;
  }
}
