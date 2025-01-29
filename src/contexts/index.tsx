import React from 'react';
import { FailuresProvider } from './FailureContext';
import { AuthProvider } from './AuthContext';
import { SectorsProvider } from './SectorsContext';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <SectorsProvider>
      <FailuresProvider>{children}</FailuresProvider>
    </SectorsProvider>
  </AuthProvider>
);
