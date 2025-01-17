/**
 * Configura a store principal do Redux com vários reducers.
 */
import { configureStore } from '@reduxjs/toolkit';
import inconsistenciasReducer from './inconsistenciasSlice';
import formulariosReducer from './formulariosSlice';
import profissionaisReducer from './profissionaisSlice';
import setoresReducer from './setoresSlice';
import chartsReducer from './chartsSlice';
import filtersReducer from './filtersSlice';

// Importe outros slices conforme necessário

export const store = configureStore({
  reducer: {
    inconsistencias: inconsistenciasReducer,
    formularios: formulariosReducer,
    profissionais: profissionaisReducer,
    setores: setoresReducer,
    charts: chartsReducer,
    filters: filtersReducer
    // Adicione outros reducers aqui
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
