import { ContextData } from '@/@types/common';
import { InconsistenciesService } from '@/services/InconsistenciesService';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router';

interface InconsistenciesContextData {
  Inconsistencies: Inconsistencies;
  resetInconsistenciesContext: VoidFunction;
}

type Inconsistencies = ContextData<Models.Inconsistency>;

interface Props {
  children: React.ReactNode;
}

const context = createContext<InconsistenciesContextData>({} as InconsistenciesContextData);

export const InconsistenciesProvider: React.FC<Props> = ({ children }) => {
  const hasLoaded = useRef(false);

  const { pathname } = useLocation();

  const [Inconsistencies, setInconsistencies] = useState<Inconsistencies>({
    data: [],
    isLoading: false,
  });

  const handleLoadData = useCallback(async () => {
    setInconsistencies((p) => ({
      ...p,
      isLoading: true,
    }));

    try {
      const Inconsistencies = await InconsistenciesService.getSectors();

      setInconsistencies({
        data: Inconsistencies,
        isLoading: false,
      });

      hasLoaded.current = true;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) return;

    const whiteList = ['/failures/create'];

    const shouldLoad = whiteList.includes(pathname);

    if (!shouldLoad) return;

    handleLoadData();
  }, [handleLoadData, pathname]);

  const resetInconsistenciesContext = useCallback(() => {
    setInconsistencies({
      data: [],
      isLoading: false,
    });

    hasLoaded.current = false;
  }, []);

  const value = useMemo(
    () => ({
      Inconsistencies,
      resetInconsistenciesContext,
    }),
    [Inconsistencies, resetInconsistenciesContext],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useInconsistencies = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('Error inside of useInconsistencies');
  }

  return ctx;
};
