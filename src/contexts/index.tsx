import React from 'react';
import { FailuresProvider } from './FailureContext';
import { AuthProvider } from './AuthContext';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <FailuresProvider>{children}</FailuresProvider>
  </AuthProvider>
);
