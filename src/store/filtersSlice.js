import { createSlice } from '@reduxjs/toolkit';

const getCurrentMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
};

const initialState = {
    dateRange: getCurrentMonthRange(),
    nonConformities: [],
    sectors: [],
    forms: [],
    roles: [],
    professionals: []
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setNonConformities: (state, action) => {
            state.nonConformities = action.payload;
        },
        setProfessional: (state, action) => {
            state.professionals = action.payload;
        },
        setRole: (state, action) => {
            state.roles = action.payload;
        },
        setSectors: (state, action) => {
            state.sectors = action.payload;
        },
        setForms: (state, action) => {
            state.forms = action.payload;
        },
        toggleFilter: (state, action) => {
            const { type, value } = action.payload;
            const filterArray = state[type];
            const index = filterArray.indexOf(value);

            if (index === -1) {
                filterArray.push(value);
            } else {
                filterArray.splice(index, 1);
            }
        },
        clearFilters: (state) => {
            Object.keys(initialState).forEach(key => {
                if (Array.isArray(state[key])) {
                    state[key] = [];
                }
            });
            state.dateRange = getCurrentMonthRange();
        }
    }
});

// Actions
export const {
    setDateRange,
    setNonConformities,
    setProfessional,
    setRole,
    setSectors,
    setForms,
    toggleFilter,
    clearFilters: resetFilters // Renomeando a action
} = filtersSlice.actions;

// Selectors
export const selectDateRange = (state) => state.filters.dateRange;
export const selectActiveFilters = (state) => ({
    nonConformities: state.filters.nonConformities,
    sectors: state.filters.sectors,
    forms: state.filters.forms,
    roles: state.filters.roles,
    professionals: state.filters.professionals
});

export const selectHasActiveFilters = (state) =>
    Object.values(selectActiveFilters(state))
        .some(filterArray => filterArray.length > 0);

export default filtersSlice.reducer;