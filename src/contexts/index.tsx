import React from 'react';
import { FailuresProvider } from './FailureContext';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => <FailuresProvider>{children}</FailuresProvider>;
