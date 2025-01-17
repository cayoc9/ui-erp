/**
 * Lida com formulários, permitindo fetch e criação
 * incluindo falhas relacionadas ao formulário.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunks
export const fetchFormularios = createAsyncThunk(
  'formularios/fetchFormularios',
  async () => {
    const response = await api.get('/forms'); // GET /api/forms
    console.log('Response from /forms:', response.data); // Adicione este log
    return response.data;
  }
);

// Nova action thunk para criar formulário com falhas
export const createFormWithFailures = createAsyncThunk(
  'formularios/createFormWithFailures',
  async (formData) => {
    const response = await api.post('/forms/with-failures', formData);
    return response.data;
  }
);

// Nova action thunk para criar falha
export const createFailure = createAsyncThunk(
  'formularios/createFailure',
  async (failureData) => {
    const response = await api.post('/failures', failureData);
    return response.data;
  }
);

const formulariosSlice = createSlice({
  name: 'formularios',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormularios.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormularios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchFormularios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFormWithFailures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFormWithFailures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.list.push(action.payload);
        }
      })
      .addCase(createFormWithFailures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createFailure.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFailure.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createFailure.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default formulariosSlice.reducer;
