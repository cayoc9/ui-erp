import { createContext, useContext, useMemo, useState } from 'react';

interface FailuresContextData {
  failures: object[];
}

interface Props {
  children: React.ReactNode;
}

export const FailuresContext = createContext({} as FailuresContextData);

export const FailuresProvider: React.FC<Props> = ({ children }) => {
  const [failures] = useState([]);

  const value: FailuresContextData = useMemo(
    () => ({
      failures,
    }),
    [failures],
  );

  return <FailuresContext.Provider value={value}>{children}</FailuresContext.Provider>;
};

export const useFailures = () => {
  const context = useContext(FailuresContext);

  if (!context) {
    throw new Error('Error inside of useFailures');
  }

  return context;
};
