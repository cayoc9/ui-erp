import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createFailure } from '../store/formulariosSlice';
import { fetchProfissionais } from '../store/profissionaisSlice';
import { fetchFormularios } from '../store/formulariosSlice';
import { fetchTiposInconsistencias } from '../store/inconsistenciasSlice';
import { fetchSectors } from '../store/setoresSlice';

function NewInconsistency() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form state
    const [formData, setFormData] = useState({
        selectedProfissional: '',
        cdProntuario: '',
        selectedFormulario: '',
        selectedInconsistencia: '',
        listaInconsistencias: [],
        selectedSetor: '',
        observacoes: '',
        hospitalId: parseInt(import.meta.env.VITE_DEFAULT_HOSPITAL_ID)
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Redux state
    const profissionais = useSelector((state) => state.profissionais.list);
    const formularios = useSelector((state) => state.formularios.list);
    const inconsistenciasDisponiveis = useSelector((state) => state.inconsistencias.tiposInconsistencias);
    const setores = useSelector((state) => state.setores.list);

    // Load initial data
    useEffect(() => {
        dispatch(fetchProfissionais());
        dispatch(fetchFormularios());
        dispatch(fetchTiposInconsistencias());
        dispatch(fetchSectors());
    }, [dispatch]);

    // Form handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddInconsistencia = () => {
        if (formData.selectedInconsistencia &&
            !formData.listaInconsistencias.includes(formData.selectedInconsistencia)) {
            setFormData(prev => ({
                ...prev,
                listaInconsistencias: [...prev.listaInconsistencias, prev.selectedInconsistencia],
                selectedInconsistencia: ''
            }));
        }
    };

    const handleRemoveInconsistencia = (id) => {
        setFormData(prev => ({
            ...prev,
            listaInconsistencias: prev.listaInconsistencias.filter(item => item !== id)
        }));
    };

    // Validation
    const validateForm = () => {
        if (!formData.cdProntuario ||
            !formData.selectedFormulario ||
            !formData.selectedProfissional ||
            !formData.selectedSetor ||
            formData.listaInconsistencias.length === 0) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            selectedProfissional: '',
            cdProntuario: '',
            selectedFormulario: '',
            selectedInconsistencia: '',
            listaInconsistencias: [],
            selectedSetor: '',
            observacoes: '',
            hospitalId: parseInt(import.meta.env.VITE_DEFAULT_HOSPITAL_ID)
        });
        setError(null);
        setSuccessMessage('');
    };

    // Submit handlers
    const handleSubmit = async (saveAndNew = false) => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        setSuccessMessage('');

        const failureData = {
            prontuarioCode: formData.cdProntuario,
            formularioId: formData.selectedFormulario,
            formularioDate: new Date(),
            professionalId: formData.selectedProfissional,
            hospitalId: formData.hospitalId,
            sectorId: formData.selectedSetor,
            observacoes: formData.observacoes,
            tpInconsistenciaIds: formData.listaInconsistencias,
            createUser: formData.selectedProfissional
        };

        try {
            await dispatch(createFailure(failureData)).unwrap();
            setSuccessMessage('Falha reportada com sucesso!');

            if (saveAndNew) {
                resetForm();
            } else {
                navigate('/inconsistencies');
            }
        } catch (err) {
            setError('Erro ao reportar falha. Tente novamente.');
            console.error('Error creating failure:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Nova Inconsistência</h1>
                <p className="mt-2 text-gray-600">Registre uma nova inconsistência no sistema</p>
            </div>

            {/* Messages */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
                    {successMessage}
                </div>
            )}

            <form className="space-y-6 bg-white p-6 rounded-lg shadow">
                {/* Responsável */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Responsável *
                    </label>
                    <select
                        name="selectedProfissional"
                        value={formData.selectedProfissional}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Selecione um responsável</option>
                        {profissionais.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                {/* Prontuário */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Código do Prontuário *
                    </label>
                    <input
                        type="number"
                        name="cdProntuario"
                        value={formData.cdProntuario}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                {/* Formulário */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tipo de Documento *
                    </label>
                    <select
                        name="selectedFormulario"
                        value={formData.selectedFormulario}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Selecione o tipo de documento</option>
                        {formularios.map((f) => (
                            <option key={f.id} value={f.id}>{f.description}</option>
                        ))}
                    </select>
                </div>

                {/* Inconsistências */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inconsistências *
                    </label>
                    <div className="flex gap-2 mb-2">
                        <select
                            name="selectedInconsistencia"
                            value={formData.selectedInconsistencia}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Selecione uma inconsistência</option>
                            {inconsistenciasDisponiveis
                                ?.filter(inc => !formData.listaInconsistencias.includes(String(inc.id)))
                                .map((inc) => (
                                    <option key={inc.id} value={inc.id}>{inc.description}</option>
                                ))}
                        </select>
                        <button
                            type="button"
                            onClick={handleAddInconsistencia}
                            disabled={!formData.selectedInconsistencia}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                        >
                            Adicionar
                        </button>
                    </div>

                    {formData.listaInconsistencias.length > 0 && (
                        <ul className="mt-2 divide-y divide-gray-200 border rounded-md">
                            {formData.listaInconsistencias.map((incId) => {
                                const inconsistencia = inconsistenciasDisponiveis?.find(
                                    inc => String(inc.id) === String(incId)
                                );
                                return (
                                    <li key={incId} className="flex justify-between items-center p-3">
                                        <span>{inconsistencia?.description}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveInconsistencia(incId)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Remover
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Setor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Setor Responsável *
                    </label>
                    <select
                        name="selectedSetor"
                        value={formData.selectedSetor}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Selecione o setor</option>
                        {setores.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                {/* Observações */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Observações
                    </label>
                    <textarea
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleInputChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/inconsistencies')}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSubmit(true)}
                        disabled={loading}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300"
                    >
                        {loading ? 'Salvando...' : 'Salvar e Novo'}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSubmit(false)}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewInconsistency;