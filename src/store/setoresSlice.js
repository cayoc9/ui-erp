/**
 * Slice responsável por gerenciar os setores (fetch/estado) no Redux.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunks
export const fetchSectors = createAsyncThunk(
  'setores/fetchSectors',
  async () => {
    const response = await api.get('/sectors'); // GET /api/sectors
    return response.data;
  }
);

const setoresSlice = createSlice({
  name: 'setores',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSectors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default setoresSlice.reducer;
