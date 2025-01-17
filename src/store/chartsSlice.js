import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  loading: false,
  error: null,
  data: {
    inconsistencyTypes: [],
    documentTypes: [],
    sectorDistribution: [],
    professionalDistribution: [],
    roleDistribution: [],
    resolutionTrend: [],
    resolutionRate: []
  }
};

// Thunks
const fetchChartData = createAsyncThunk(
  'charts/fetchData',
  async (filters) => {
    const response = await api.get('/statistics', { params: filters });
    return response.data;
  }
);

const refreshChartData = createAsyncThunk(
  'charts/refreshData',
  async (filters) => {
    const response = await api.get('/statistics/refresh', { params: filters });
    return response.data;
  }
);

const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setChartData: (state, action) => {
      const { chartType, data } = action.payload;
      state.data[chartType] = data;
      state.loading = false;
      state.error = null;
    },
    clearChartData: (state, action) => {
      const chartType = action.payload;
      state.data[chartType] = [];
    },
    resetCharts: (state) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = null;
    }
  }
});

// Actions extraídas do reducer:
export const {
  setLoading,
  setError,
  setChartData,
  clearChartData,
  resetCharts
} = chartsSlice.actions;

// Selectors:
export const selectChartLoading = (state) => state.charts.loading;
export const selectChartError = (state) => state.charts.error;
export const selectChartData =
  (chartType) => (state) => state.charts.data[chartType];

export const selectInconsistencyTypes = (state) =>
  state.charts.data.inconsistencyTypes;
export const selectDocumentTypes = (state) =>
  state.charts.data.documentTypes;
export const selectSectorDistribution = (state) =>
  state.charts.data.sectorDistribution;
export const selectProfessionalDistribution = (state) =>
  state.charts.data.professionalDistribution;
export const selectRoleDistribution = (state) =>
  state.charts.data.roleDistribution;
export const selectResolutionTrend = (state) =>
  state.charts.data.resolutionTrend;
export const selectResolutionRate = (state) =>
  state.charts.data.resolutionRate;

// Reducer padrão:
export default chartsSlice.reducer;

// Exporte thunks e demais funcionalidades (sem repetir as actions):
export { fetchChartData, refreshChartData };
