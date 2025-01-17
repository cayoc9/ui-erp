import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfMonth } from 'date-fns';
import TextField from '@mui/material/TextField';
import {
  setDateRange,
  setNonConformities,
  setProfessional,
  setRole,
  setSectors,
  setForms,
  resetFilters
} from '../store/filtersSlice';

function FiltersPanel() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const inconsistencyTypes = useSelector((state) => state.inconsistencias.tiposInconsistencias);
  const professionals = useSelector((state) => state.profissionais.list);
  const sectors = useSelector((state) => state.setores.list);
  const forms = useSelector((state) => state.formularios.list);

  const handleDateRangeChange = (type) => (date) => {
    dispatch(setDateRange({ ...filters.dateRange, [type]: date }));
  };

  const handleNonConformityChange = (id) => (event) => {
    const newSelection = event.target.checked
      ? [...filters.nonConformities, id]
      : filters.nonConformities.filter(item => item !== id);
    dispatch(setNonConformities(newSelection));
  };

  const handleProfessionalChange = (event) => {
    dispatch(setProfessional(event.target.value));
  };

  const handleRoleChange = (event) => {
    dispatch(setRole(event.target.value));
  };

  const handleSectorChange = (type) => (event) => {
    dispatch(setSectors({ ...filters.sectors, [type]: event.target.value }));
  };

  const handleFormsChange = (id) => (event) => {
    const newSelection = event.target.checked
      ? [...filters.forms, id]
      : filters.forms.filter(item => item !== id);
    dispatch(setForms(newSelection));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Filtros</h2>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Limpar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="flex flex-col gap-4">
              <DatePicker
                label="Data Inicial"
                value={filters.dateRange.start || startOfMonth(new Date())}
                onChange={handleDateRangeChange('start')}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth size="small" />
                }}
              />
              <DatePicker
                label="Data Final"
                value={filters.dateRange.end || new Date()}
                onChange={handleDateRangeChange('end')}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth size="small" />
                }}
              />
            </div>
          </LocalizationProvider>
        </div>

        {/* Non-conformities Checklist */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Não Conformidades</label>
          <div className="max-h-40 overflow-y-auto">
            {inconsistencyTypes.map((type) => (
              <div key={type.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`type-${type.id}`}
                  checked={filters.nonConformities.includes(type.id)}
                  onChange={handleNonConformityChange(type.id)}
                  className="rounded border-gray-300"
                />
                <label htmlFor={`type-${type.id}`} className="ml-2 text-sm text-gray-700">
                  {type.description}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Professional and Role */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Profissional</label>
            <select
              value={filters.professional}
              onChange={handleProfessionalChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {professionals.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cargo</label>
            <select
              value={filters.role}
              onChange={handleRoleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="MEDICO">Médico</option>
              <option value="ENFERMEIRO">Enfermeiro</option>
              <option value="TECNICO">Técnico</option>
            </select>
          </div>
        </div>

        {/* Sectors */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Setor de Registro</label>
            <select
              value={filters.sectors.registration}
              onChange={handleSectorChange('registration')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Setor Responsável</label>
            <select
              value={filters.sectors.responsible}
              onChange={handleSectorChange('responsible')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Forms Checklist */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Formulários</label>
          <div className="max-h-40 overflow-y-auto">
            {forms.map((form) => (
              <div key={form.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`form-${form.id}`}
                  checked={filters.forms.includes(form.id)}
                  onChange={handleFormsChange(form.id)}
                  className="rounded border-gray-300"
                />
                <label htmlFor={`form-${form.id}`} className="ml-2 text-sm text-gray-700">
                  {form.description}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltersPanel;