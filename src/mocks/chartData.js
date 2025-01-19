const TIPOS_INCONSISTENCIAS = [
  { id: 1, description: 'Registro sem assinatura do profissional', count: 51 },
  { id: 2, description: 'Formulário ausente', count: 9 },
  { id: 3, description: 'Registro incompleto', count: 6 },
  { id: 4, description: 'Registro incorreto', count: 5 },
  { id: 5, description: 'Formulário sem data', count: 4 }
];

const TIPOS_DOCUMENTOS = [
  { id: 1, description: 'Relatório Cirúrgico', count: 30 },
  { id: 2, description: 'Anamnese', count: 20 },
  { id: 3, description: 'Partograma', count: 10 },
  { id: 4, description: 'Sumário de Alta/Transferência/Óbito', count: 8 },
  { id: 5, description: 'Lista de Verificação de Cirurgia Segura', count: 3 }
];

const SETORES = [
  { id: 1, name: 'Centro Cirúrgico Recepção', count: 34 },
  { id: 2, name: 'Pronto Socorro Obstetrícia', count: 16 },
  { id: 3, name: '2º Andar Ginecologia', count: 8 }
];

const PROFISSIONAIS = [
  { id: 1, name: 'Dr. João Silva', count: 11 },
  { id: 2, name: 'Enf. Maria Santos', count: 7 },
  { id: 3, name: 'Dr. Pedro Oliveira', count: 5 }
];

export const mockChartData = {
  data: {
    inconsistencyTypes: TIPOS_INCONSISTENCIAS,
    documentTypes: TIPOS_DOCUMENTOS,
    sectorDistribution: SETORES,
    professionalDistribution: PROFISSIONAIS,
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
  },
  filters: {
    roles: [
      { id: 1, name: 'Médico(a)' },
      { id: 2, name: 'Enfermeiro(a)' },
      { id: 3, name: 'Técnico(a)' }
    ],
    sectors: [
      { id: 1, name: 'Centro Cirúrgico' },
      { id: 2, name: 'Pronto Socorro' },
      { id: 3, name: 'UTI Adulto' }
    ],
    forms: [
      { id: 1, name: 'Anamnese' },
      { id: 2, name: 'Relatório Cirúrgico' },
      { id: 3, name: 'Declaração de Óbito' }
    ]
  }
};

export const getMockedData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockChartData;
};
