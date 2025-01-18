import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFormularios } from '../store/formulariosSlice';
import { fetchProfissionais } from '../store/profissionaisSlice';
import { fetchTiposInconsistencias, updateInconsistencia } from '../store/inconsistenciasSlice';
import { fetchSectors } from '../store/setoresSlice';

function EditInconsistency() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form state
    const [formData, setFormData] = useState({
        selectedProfissional: '',
        cdProntuario: '', // Garanta que seja string vazia ao invés de undefined
        selectedFormulario: '',
        selectedInconsistencia: '',
        listaInconsistencias: [],
        selectedSetor: '',
        observacoes: '',
        hospitalId: parseInt(import.meta.env.VITE_DEFAULT_HOSPITAL_ID) || 1
    });

    // UI state
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    // Redux state
    const profissionais = useSelector((state) => state.profissionais.list);
    const formularios = useSelector((state) => state.formularios.list);
    const inconsistenciasDisponiveis = useSelector((state) => state.inconsistencias.tiposInconsistencias);
    const setores = useSelector((state) => state.setores.list);
    const currentInconsistency = useSelector((state) =>
        state.inconsistencias.list.find(inc => inc.id === parseInt(id))
    );

    // Load dependencies
    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchProfissionais()),
                    dispatch(fetchFormularios()),
                    dispatch(fetchTiposInconsistencias()),
                    dispatch(fetchSectors())
                ]);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar dados necessários');
                setLoading(false);
            }
        };
        loadData();
    }, [dispatch]);

    // Populate form when currentInconsistency is available
    useEffect(() => {
        if (currentInconsistency) {
            setFormData({
                selectedProfissional: currentInconsistency.professionalId || '',
                cdProntuario: currentInconsistency.prontuarioCode || '',
                selectedFormulario: currentInconsistency.formularioId || '',
                selectedInconsistencia: '',
                listaInconsistencias: currentInconsistency.tpInconsistenciaIds || [],
                selectedSetor: currentInconsistency.sectorId || '',
                observacoes: currentInconsistency.observacoes || '',
                hospitalId: currentInconsistency.hospitalId || parseInt(import.meta.env.VITE_DEFAULT_HOSPITAL_ID) || 1
            });
        }
    }, [currentInconsistency]);

    const handleAddInconsistencia = () => {
        if (formData.selectedInconsistencia && !formData.listaInconsistencias.includes(formData.selectedInconsistencia)) {
            setFormData(prev => ({
                ...prev,
                listaInconsistencias: [...prev.listaInconsistencias, formData.selectedInconsistencia],
                selectedInconsistencia: ''
            }));
        }
    };

    const handleRemoveInconsistencia = (incId) => {
        setFormData(prev => ({
            ...prev,
            listaInconsistencias: prev.listaInconsistencias.filter(id => id !== incId)
        }));
    };

    const handleSubmit = async () => {
        if (!formData.cdProntuario || !formData.selectedFormulario ||
            !formData.selectedProfissional || !formData.selectedSetor) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            await dispatch(updateInconsistencia({
                id: parseInt(id),
                data: {
                    prontuarioCode: formData.cdProntuario,
                    formularioId: formData.selectedFormulario,
                    formularioDate: new Date(),
                    professionalId: formData.selectedProfissional,
                    hospitalId: formData.hospitalId,
                    sectorId: formData.selectedSetor,
                    observacoes: formData.observacoes,
                    tpInconsistenciaIds: formData.listaInconsistencias,
                    updateUser: formData.selectedProfissional
                }
            })).unwrap();

            navigate('/inconsistencies');
        } catch (err) {
            setError('Erro ao atualizar inconsistência. Tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-4">Carregando...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary-900">Editar Inconsistência</h1>
                <p className="mt-2 text-secondary-600">Atualize os detalhes da inconsistência</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="form-container space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Responsável</label>
                        <select
                            value={formData.selectedProfissional}
                            onChange={(e) => setFormData(prev => ({ ...prev, selectedProfissional: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                            <option value="">Selecione um responsável</option>
                            {profissionais.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Código do Prontuário</label>
                        <input
                            type="number"
                            value={formData.cdProntuario}
                            onChange={(e) => setFormData(prev => ({ ...prev, cdProntuario: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                    <select
                        value={formData.selectedFormulario}
                        onChange={(e) => setFormData(prev => ({ ...prev, selectedFormulario: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                        <option value="">Selecione o tipo de documento</option>
                        {formularios.map((f) => (
                            <option key={f.id} value={f.id}>{f.description}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inconsistências</label>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <select
                                value={formData.selectedInconsistencia}
                                onChange={(e) => setFormData(prev => ({ ...prev, selectedInconsistencia: e.target.value }))}
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            >
                                <option value="">Selecione uma inconsistência</option>
                                {inconsistenciasDisponiveis
                                    ?.filter(inc => !formData.listaInconsistencias.includes(String(inc.id)))
                                    .map((inc) => (
                                        <option key={inc.id} value={inc.id}>{inc.description}</option>
                                    ))}
                            </select>
                            <button
                                onClick={handleAddInconsistencia}
                                disabled={!formData.selectedInconsistencia}
                                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                Adicionar
                            </button>
                        </div>

                        {formData.listaInconsistencias.length > 0 && (
                            <ul className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                                {formData.listaInconsistencias.map((incId) => {
                                    const inconsistencia = inconsistenciasDisponiveis?.find(inc => String(inc.id) === String(incId));
                                    return (
                                        <li key={incId} className="flex items-center justify-between p-3">
                                            <span className="text-gray-700">
                                                {inconsistencia ? inconsistencia.description : 'Inconsistência não encontrada'}
                                            </span>
                                            <button
                                                onClick={() => handleRemoveInconsistencia(incId)}
                                                className="text-red-600 hover:text-red-700 text-sm"
                                            >
                                                Remover
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Setor Responsável</label>
                    <select
                        value={formData.selectedSetor}
                        onChange={(e) => setFormData(prev => ({ ...prev, selectedSetor: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                        <option value="">Selecione o setor</option>
                        {setores.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea
                        value={formData.observacoes}
                        onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                    <button
                        onClick={() => navigate('/inconsistencies')}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditInconsistency;