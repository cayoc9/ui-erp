import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch inconsistencies list
export const fetchInconsistencias = createAsyncThunk(
  'inconsistencias/fetchInconsistencias',
  async ({ page }) => {
    console.log('Fetching page:', page);
    try {
      const response = await api.get('/failures', {
        params: { page }
      });
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
);

// Fetch inconsistency types
export const fetchTiposInconsistencias = createAsyncThunk(
  'inconsistencias/fetchTiposInconsistencias',
  async () => {
    const response = await api.get('/tp-inconsistencies');
    return response.data;
  }
);

// Create new inconsistency
export const addInconsistencia = createAsyncThunk(
  'inconsistencias/addInconsistencia',
  async (novaInconsistencia) => {
    const response = await api.post('/tp-inconsistencies', novaInconsistencia);
    return response.data;
  }
);

// Update inconsistency
export const updateInconsistencia = createAsyncThunk(
  'inconsistencias/updateInconsistencia',
  async ({ id, data }) => {
    const response = await api.put(`/tp-inconsistencies/${id}`, data);
    return response.data;
  }
);

// Remove inconsistency
export const removeInconsistencia = createAsyncThunk(
  'inconsistencias/removeInconsistencia',
  async (id) => {
    await api.delete(`/tp-inconsistencies/${id}`);
    return id;
  }
);

// Resolve inconsistencies
export const resolveInconsistencias = createAsyncThunk(
  'inconsistencias/resolveInconsistencias',
  async (ids) => {
    const response = await api.post('/failures/resolve', { ids });
    return response.data;
  }
);

// Calculate time open
const calculateTimeOpen = (createDate) => {
  const created = new Date(createDate);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return `${days}d:${hours}h`;
};

const inconsistenciasSlice = createSlice({
  name: 'inconsistencias',
  initialState: {
    list: [],
    tiposInconsistencias: [],
    selectedIds: [], // For bulk operations
    status: 'idle',
    tiposStatus: 'idle',
    error: null,
    page: 1,
    perPage: 10,
    totalItems: 0
  },
  reducers: {
    toggleSelection: (state, action) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(i => i !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch inconsistencies
      .addCase(fetchInconsistencias.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInconsistencias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Verifica se payload tem a estrutura esperada e acessa data
        const data = action.payload?.data || [];
        state.list = data.map(item => ({
          ...item,
          timeOpen: calculateTimeOpen(item.createDate),
          hospitalName: item.hospital?.name || 'N/A',
          sectorName: item.sector?.name || 'N/A'
        }));
        state.totalItems = data.length;
      })
      .addCase(fetchInconsistencias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch types
      .addCase(fetchTiposInconsistencias.pending, (state) => {
        state.tiposStatus = 'loading';
      })
      .addCase(fetchTiposInconsistencias.fulfilled, (state, action) => {
        state.tiposStatus = 'succeeded';
        state.tiposInconsistencias = action.payload;
      })
      .addCase(fetchTiposInconsistencias.rejected, (state, action) => {
        state.tiposStatus = 'failed';
        state.error = action.error.message;
      })

      // Add
      .addCase(addInconsistencia.fulfilled, (state, action) => {
        state.list.push({
          ...action.payload,
          timeOpen: '0d:0h'
        });
      })

      // Update
      .addCase(updateInconsistencia.fulfilled, (state, action) => {
        const index = state.list.findIndex(inc => inc.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = {
            ...action.payload,
            timeOpen: calculateTimeOpen(action.payload.createDate)
          };
        }
      })

      // Remove
      .addCase(removeInconsistencia.fulfilled, (state, action) => {
        state.list = state.list.filter(inc => inc.id !== action.payload);
        state.selectedIds = state.selectedIds.filter(id => id !== action.payload);
      })

      // Resolve
      .addCase(resolveInconsistencias.fulfilled, (state, action) => {
        const resolvedIds = action.payload.map(item => item.id);
        state.list = state.list.map(inc =>
          resolvedIds.includes(inc.id)
            ? { ...inc, status: 'resolved', resolvedDate: new Date().toISOString() }
            : inc
        );
        state.selectedIds = state.selectedIds.filter(id => !resolvedIds.includes(id));
      });
  },
});

export const { toggleSelection, clearSelection, setPage } = inconsistenciasSlice.actions;
export default inconsistenciasSlice.reducer;
