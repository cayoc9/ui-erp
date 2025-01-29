import { storageTokens } from '@/config/storageTokens';
import { api } from '@/services/api';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  signedIn: boolean;
  signIn: (props: SignInProps) => Promise<void>;
  logout: VoidFunction;
}

interface SignInProps {
  email: string;
  password: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(() => {
    return !!localStorage.getItem(storageTokens.accessToken);
  });

  const signIn = useCallback(async (props: SignInProps) => {
    // const { accessToken } = await AuthService.signIn(props);
    console.log(props);

    const accessToken: string = await new Promise((res) =>
      setTimeout(() => res('mock_token'), 1000),
    );

    localStorage.setItem(storageTokens.accessToken, accessToken);

    setSignedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  useEffect(() => {
    api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(storageTokens.accessToken);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    api.interceptors.response.use(undefined, (error: AxiosError) => {
      const isAuthError = error?.status === 401;

      if (!isAuthError) {
        return Promise.reject(error);
      }

      logout();
    });

    return () => {
      api.interceptors.request.clear();
      api.interceptors.response.clear();
    };
  }, [logout]);

  const value: AuthContextData = {
    signedIn,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Error inside of useAuth');
  }

  return context;
};
