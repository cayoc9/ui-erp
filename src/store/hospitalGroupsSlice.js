/**
 * Gerencia as ações de fetch, adição e remoção de Grupos Hospitalares.
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunks
export const fetchHospitalGroups = createAsyncThunk(
  'hospitalGroups/fetchHospitalGroups',
  async () => {
    const response = await api.get('/hospital-groups'); // GET /api/hospital-groups
    return response.data;
  }
);

export const addHospitalGroup = createAsyncThunk(
  'hospitalGroups/addHospitalGroup',
  async (novoGrupo) => {
    const response = await api.post('/hospital-groups', novoGrupo); // POST /api/hospital-groups
    return response.data;
  }
);

export const removeHospitalGroup = createAsyncThunk(
  'hospitalGroups/removeHospitalGroup',
  async (id) => {
    await api.delete(`/hospital-groups/${id}`); // DELETE /api/hospital-groups/:id
    return id;
  }
);

const hospitalGroupsSlice = createSlice({
  name: 'hospitalGroups',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchHospitalGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHospitalGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchHospitalGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add
      .addCase(addHospitalGroup.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // Remove
      .addCase(removeHospitalGroup.fulfilled, (state, action) => {
        state.list = state.list.filter((grupo) => grupo.id !== action.payload);
      });
  },
});

export default hospitalGroupsSlice.reducer;
