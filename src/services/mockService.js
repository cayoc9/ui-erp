// src/pages/ReportarFalha.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addInconsistencia } from '../store/inconsistenciasSlice';
import api from '../services/api'; // Importar o serviço de API real

function ReportarFalha() {
  const [profissionais, setProfissionais] = useState([]);
  const [formularios, setFormularios] = useState([]);
  const [inconsistencias, setInconsistencias] = useState([]);
  const [setores, setSetores] = useState([]);

  const [selectedProfissional, setSelectedProfissional] = useState('');
  const [cdProntuario, setCdProntuario] = useState('');
  const [selectedFormulario, setSelectedFormulario] = useState('');
  const [selectedInconsistencia, setSelectedInconsistencia] = useState('');
  const [listaInconsistencias, setListaInconsistencias] = useState([]);
  const [selectedSetor, setSelectedSetor] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const profissionaisRes = await api.get('/profissionais'); // Defina os endpoints corretos
        const formulariosRes = await api.get('/formularios');
        const inconsistenciasRes = await api.get('/tp_inconsistencias');
        const setoresRes = await api.get('/setores_hospital');

        setProfissionais(profissionaisRes.data);
        setFormularios(formulariosRes.data);
        setInconsistencias(inconsistenciasRes.data);
        setSetores(setoresRes.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar dados.');
      }
    }
    fetchData();
  }, []);

  const handleAddInconsistencia = () => {
    if (selectedInconsistencia) {
      setListaInconsistencias([...listaInconsistencias, selectedInconsistencia]);
      setSelectedInconsistencia('');
    }
  }

  const handleSubmit = async () => {
    if (
      !selectedProfissional ||
      !cdProntuario ||
      !selectedFormulario ||
      listaInconsistencias.length === 0 ||
      !selectedSetor
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);

    const novaInconsistencia = {
      CD_PRONTUARIO: cdProntuario,
      CD_FORMULARIO: selectedFormulario,
      CD_INCONSISTENCIA: listaInconsistencias,
      CD_PROFISSIONAL: selectedProfissional,
      CD_SETOR: selectedSetor,
      OBSERVACOES: observacoes,
      STATUS: "Aberto"
    };

    try {
      await dispatch(addInconsistencia(novaInconsistencia)).unwrap();
      alert('Inconsistência reportada com sucesso!');
      // Resetar o formulário
      setSelectedProfissional('');
      setCdProntuario('');
      setSelectedFormulario('');
      setListaInconsistencias([]);
      setSelectedSetor('');
      setObservacoes('');
    } catch (err) {
      console.error(err);
      setError('Erro ao reportar inconsistência.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Reportar Falha</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-2">
        <label>Responsável: </label>
        <select
          value={selectedProfissional}
          onChange={(e) => setSelectedProfissional(e.target.value)}
          className="ml-2 p-1 border rounded"
        >
          <option value="">Selecione</option>
          {profissionais.map(p => (
            <option key={p.CD_USUARIO} value={p.CD_USUARIO}>{p.DS_USUARIO}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Código do Prontuário: </label>
        <input
          type="number"
          value={cdProntuario}
          onChange={(e) => setCdProntuario(e.target.value)}
          className="ml-2 p-1 border rounded"
        />
      </div>

      <div className="mb-2">
        <label>Tipo de Documento: </label>
        <select
          value={selectedFormulario}
          onChange={(e) => setSelectedFormulario(e.target.value)}
          className="ml-2 p-1 border rounded"
        >
          <option value="">Selecione</option>
          {formularios.map(f => (
            <option key={f.CD_FORMULARIO} value={f.CD_FORMULARIO}>{f.DS_FORMULARIO}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Inconsistências: </label>
        <div className="flex items-center gap-2">
          <select
            value={selectedInconsistencia}
            onChange={(e) => setSelectedInconsistencia(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="">Selecione</option>
            {inconsistencias.map(i => (
              <option key={i.CD_INCONSITENCIA} value={i.CD_INCONSITENCIA}>{i.DS_INCONSITENCIA}</option>
            ))}
          </select>
          <button
            onClick={handleAddInconsistencia}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Adicionar
          </button>
        </div>
        <ul className="mt-2 list-disc list-inside">
          {listaInconsistencias.map((inc, idx) => (
            <li key={idx}>
              {inconsistencias.find(i => i.CD_INCONSITENCIA == inc)?.DS_INCONSITENCIA}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <label>Setor Responsável: </label>
        <select
          value={selectedSetor}
          onChange={(e) => setSelectedSetor(e.target.value)}
          className="ml-2 p-1 border rounded"
        >
          <option value="">Selecione</option>
          {setores.map(s => (
            <option key={s.CD_SETOR} value={s.CD_SETOR}>{s.DS_SETOR}</option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Observações: </label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          className="ml-2 p-1 border rounded w-full"
          rows="4"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </div>
  )
}
