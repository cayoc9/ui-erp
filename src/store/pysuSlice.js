import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Thunk para fazer a consulta
export const fetchPySUSData = createAsyncThunk(
    'pysus/fetchData',
    async (queryParams) => {
        const response = await api.post('http://node208714-pysus.sp1.br.saveincloud.net.br:15473/query', queryParams);
        return response.data;
    }
);

const pysusSlice = createSlice({
    name: 'pysus',
    initialState: {
        data: [],
        columns: [],
        totalRecords: 0,
        loading: false,
        error: null
    },
    reducers: {
        clearData: (state) => {
            state.data = [];
            state.columns = [];
            state.totalRecords = 0;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPySUSData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPySUSData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.dados;
                state.columns = action.payload.colunas;
                state.totalRecords = action.payload.total_registros;
            })
            .addCase(fetchPySUSData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearData } = pysusSlice.actions;
export default pysusSlice.reducer;
