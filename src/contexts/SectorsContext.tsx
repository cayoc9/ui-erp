import { ContextData } from '@/@types/common';
import { SectorsService } from '@/services/SectorsService';
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

interface SectorsContextData {
  sectors: Sectors;
  resetSectorsContext: VoidFunction;
}

type Sectors = ContextData<Models.Sector>;

interface Props {
  children: React.ReactNode;
}

const context = createContext<SectorsContextData>({} as SectorsContextData);

export const SectorsProvider: React.FC<Props> = ({ children }) => {
  const hasLoaded = useRef(false);

  const { pathname } = useLocation();

  const [sectors, setSectors] = useState<Sectors>({
    data: [],
    isLoading: false,
  });

  const handleLoadData = useCallback(async () => {
    setSectors((p) => ({
      ...p,
      isLoading: true,
    }));

    try {
      const sectors = await SectorsService.getSectors();

      setSectors({
        data: sectors,
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

  const resetSectorsContext = useCallback(() => {
    setSectors({
      data: [],
      isLoading: false,
    });

    hasLoaded.current = false;
  }, []);

  const value = useMemo(
    () => ({
      sectors,
      resetSectorsContext,
    }),
    [sectors, resetSectorsContext],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useMessages = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('Error inside of useMessages');
  }

  return ctx;
};
