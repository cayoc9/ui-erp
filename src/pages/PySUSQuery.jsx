import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPySUSData } from '../store/pysuSlice';

const BASES = ['SIH', 'SIA'];

const GRUPOS = {
  SIH: ['RD', 'RJ', 'ER', 'SP'],
  SIA: ['PA', 'BI', 'AB', 'ABO', 'ACF', 'AD', 'AM', 'AMP', 'AN', 'AQ', 'AR', 'ATD']
};

const PySUSQuery = () => {
  const dispatch = useDispatch();
  const { loading, error, data, totalRecords } = useSelector((state) => state.pysus);

  const [formData, setFormData] = useState({
    base: 'SIH',
    grupo: 'RD',
    cnes_list: [''],
    campos_agrupamento: ['CNES', 'ANO_CMPT', 'MES_CMPT'],
    competencia_inicio: '',
    competencia_fim: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCNESChange = (index, value) => {
    const newCnesList = [...formData.cnes_list];
    newCnesList[index] = value;
    setFormData(prev => ({
      ...prev,
      cnes_list: newCnesList
    }));
  };

  const addCNES = () => {
    setFormData(prev => ({
      ...prev,
      cnes_list: [...prev.cnes_list, '']
    }));
  };

  const removeCNES = (index) => {
    setFormData(prev => ({
      ...prev,
      cnes_list: prev.cnes_list.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filtra CNES vazios antes de enviar
    const cleanedData = {
      ...formData,
      cnes_list: formData.cnes_list.filter(cnes => cnes.trim() !== '')
    };
    dispatch(fetchPySUSData(cleanedData));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Consulta DataSUS</h1>
        <p className="mt-2 text-gray-600">
          Extraia dados do SIH e SIA usando a API PySUS
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Base de Dados */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Base de Dados *
            </label>
            <select
              name="base"
              value={formData.base}
              onChange={handleInputChange}
              className="mt-1 block w-full"
              required
            >
              {BASES.map(base => (
                <option key={base} value={base}>{base}</option>
              ))}
            </select>
          </div>

          {/* Grupo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grupo *
            </label>
            <select
              name="grupo"
              value={formData.grupo}
              onChange={handleInputChange}
              className="mt-1 block w-full"
              required
            >
              {GRUPOS[formData.base].map(grupo => (
                <option key={grupo} value={grupo}>{grupo}</option>
              ))}
            </select>
          </div>

          {/* Competência */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Competência Início *
            </label>
            <input
              type="text"
              name="competencia_inicio"
              value={formData.competencia_inicio}
              onChange={handleInputChange}
              placeholder="MM/YYYY"
              pattern="\d{2}/\d{4}"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Competência Fim *
            </label>
            <input
              type="text"
              name="competencia_fim"
              value={formData.competencia_fim}
              onChange={handleInputChange}
              placeholder="MM/YYYY"
              pattern="\d{2}/\d{4}"
              className="mt-1 block w-full"
              required
            />
          </div>
        </div>

        {/* Lista de CNES */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Códigos CNES *
          </label>
          {formData.cnes_list.map((cnes, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={cnes}
                onChange={(e) => handleCNESChange(index, e.target.value)}
                placeholder="Código CNES"
                className="flex-1"
                required
              />
              {formData.cnes_list.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCNES(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCNES}
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Adicionar CNES
          </button>
        </div>

        {/* Botões */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? 'Consultando...' : 'Consultar'}
          </button>
        </div>
      </form>

      {/* Resultados */}
      {data.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Resultados ({totalRecords} registros)
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {data[0] && Object.keys(data[0]).map(key => (
                    <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 100).map((row, i) => (
                  <tr key={i} className="border-t">
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="px-4 py-2 text-sm text-gray-900">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PySUSQuery;
