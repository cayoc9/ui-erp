import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInconsistencias, resolveInconsistencias } from '../store/inconsistenciasSlice';

function Incosistencies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redux state
  const {
    list: inconsistencias,
    status,
    totalPages,
    error: reduxError
  } = useSelector((state) => state.inconsistencias);

  // Load initial data
  useEffect(() => {
    dispatch(fetchInconsistencias({ page: currentPage }));
  }, [dispatch, currentPage]);

  // Calculate time open for each inconsistency
  const calculateTimeOpen = (createDate) => {
    const start = new Date(createDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d:${hours}h`;
  };

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(new Set(inconsistencias.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  // Handle resolve action
  const handleResolve = async () => {
    if (selectedItems.size === 0) return;

    setLoading(true);
    setError(null);
    try {
      await dispatch(resolveInconsistencias(Array.from(selectedItems))).unwrap();
      setSelectedItems(new Set());
    } catch (err) {
      setError('Erro ao resolver inconsistências');
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers
  const handleCreate = () => navigate('/inconsistencies/new');
  const handleEdit = (id) => navigate(`/inconsistencies/edit/${id}`);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inconsistências</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nova Inconsistência
        </button>
      </div>

      {/* Error Display */}
      {(error || reduxError) && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-red-700">{error || reduxError}</p>
        </div>
      )}

      {/* Actions Bar */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleResolve}
          disabled={selectedItems.size === 0 || loading}
          className={`px-4 py-2 rounded ${selectedItems.size > 0
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {loading ? 'Resolvendo...' : 'Resolver Selecionados'}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.size === inconsistencias.length}
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prontuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tempo Aberto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Setor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {status === 'loading' ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  Carregando...
                </td>
              </tr>
            ) : inconsistencias.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
                <td className="px-6 py-4">{item.prontuarioCode}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {item.status === 'resolved' ? 'Resolvido' : 'Pendente'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {calculateTimeOpen(item.createDate)}
                </td>
                <td className="px-6 py-4">{item.sectorName}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}

export default Incosistencies;