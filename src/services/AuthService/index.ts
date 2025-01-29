import { api } from '../api';

export class AuthService {
  static async signIn(props: Auth.SignInInput) {
    const { data } = await api.post<Auth.SignInOutput>('sign-in', props);

    return data;
  }
}
