import React, { useState } from 'react';
import FiltersPanel from '../components/FiltersPanel';
import ChartGrid from '../components/ChartGrid';
import RefreshIcon from '@mui/icons-material/Refresh';

// Dados mockados baseados no mockgraph.md
const mockData = {
  inconsistencyTypes: [
    { description: 'Registro sem assinatura do profissional', count: 51 },
    { description: 'Formulário ausente', count: 9 },
    { description: 'Registro incompleto', count: 6 },
    { description: 'Registro incorreto', count: 5 },
    { description: 'Formulário sem data', count: 4 }
  ],
  documentTypes: [
    { description: 'Relatório Cirúrgico', count: 30 },
    { description: 'Anamnese', count: 20 },
    { description: 'Partograma', count: 10 },
    { description: 'Sumário de Alta/Transferência/Óbito', count: 8 },
    { description: 'Lista de Verificação de Cirurgia Segura', count: 3 }
  ],
  sectorDistribution: [
    { name: 'Centro Cirúrgico Recepção', count: 34 },
    { name: 'Pronto Socorro Obstetrícia', count: 16 },
    { name: '2º Andar Ginecologia', count: 8 }
  ],
  professionalDistribution: [
    { name: 'Profissional A', count: 11 },
    { name: 'Profissional B', count: 7 },
    { name: 'Profissional C', count: 5 }
  ],
  resolutionRate: {
    resolved: 61.33,
    pending: 38.67
  },
  resolutionTrend: [
    { period: 'Jan/2024', resolutionRate: 50 },
    { period: 'Fev/2024', resolutionRate: 60 },
    { period: 'Mar/2024', resolutionRate: 55 },
    { period: 'Dez/2024', resolutionRate: 40 }
  ]
};

function Indicadores() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simula delay de atualização
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in p-6">
      {/* Header com título e botão de atualizar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Indicadores</h1>
          <p className="text-sm text-gray-600">
            Análise de inconsistências e taxa de resolução
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          <RefreshIcon className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erro ao carregar dados
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Painel de filtros */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>
          <FiltersPanel />
        </div>
      </div>

      {/* Grid de gráficos */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Gráficos</h2>
          <ChartGrid data={mockData} />
        </div>
      </div>
    </div>
  );
}

export default Indicadores;