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
export const fetchChartData = createAsyncThunk(
  'charts/fetchChartData',
  async (filters = {}) => {
    try {
      const response = await api.get('/statistics', {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao carregar dados dos gráficos';
    }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Actions
export const {
  setLoading,
  setError,
  setChartData,
  clearChartData,
  resetCharts
} = chartsSlice.actions;

// Selectors
export const selectChartLoading = (state) => state.charts.loading;
export const selectChartError = (state) => state.charts.error;
export const selectChartData = (chartType) => (state) => state.charts.data[chartType];

export const {
  selectInconsistencyTypes,
  selectDocumentTypes,
  selectSectorDistribution,
  selectProfessionalDistribution,
  selectRoleDistribution,
  selectResolutionTrend,
  selectResolutionRate
} = {
  selectInconsistencyTypes: (state) => state.charts.data.inconsistencyTypes,
  selectDocumentTypes: (state) => state.charts.data.documentTypes,
  selectSectorDistribution: (state) => state.charts.data.sectorDistribution,
  selectProfessionalDistribution: (state) => state.charts.data.professionalDistribution,
  selectRoleDistribution: (state) => state.charts.data.roleDistribution,
  selectResolutionTrend: (state) => state.charts.data.resolutionTrend,
  selectResolutionRate: (state) => state.charts.data.resolutionRate
};

// Exporte o reducer como default
export default chartsSlice.reducer;

// Exporte o thunk refreshChartData
export { refreshChartData };
