export enum EPages {
  HOME = '/',
  INDICATORS = '/indicators',
  FAILURES = '/failures',
  CREATE_FAILURES = '/failures/create',
}

export enum EPageSections {
  HOME = 'home',
  INDICATORS = 'indicators',
  FAILURES = 'failures',
}

interface PageInfo {
  title: string;
  section: string;
  pathPages: EPages[];
}

export const APP_PAGES: Record<EPages, PageInfo> = {
  [EPages.HOME]: {
    title: 'Home',
    section: EPageSections.HOME,
    pathPages: [],
  },
  [EPages.INDICATORS]: {
    title: 'Indicadores',
    section: EPageSections.INDICATORS,
    pathPages: [],
  },
  [EPages.FAILURES]: {
    title: 'Falhas',
    section: EPageSections.FAILURES,
    pathPages: [],
  },
  [EPages.CREATE_FAILURES]: {
    title: 'Cadastrar falha',
    section: EPageSections.FAILURES,
    pathPages: [EPages.FAILURES],
  },
};
