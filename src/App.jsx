/**
 * Componente principal que define a estrutura básica:
 * Header fixo, Sidebar e conteúdo das rotas.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Indicadores from './pages/Indicadores';
import Home from './pages/Home';
import Inconsistencies from './pages/Incosistencies';
import NewInconsistency from './pages/NewInconsistency';
import EditInconsistency from './pages/EditInconsistency';
import PySUSQuery from './pages/PySUSQuery';

function ErrorFallback({ error }) {
  return (
    <div className="p-4 bg-red-50 border border-red-400 rounded">
      <h2 className="text-red-800">Ocorreu um erro:</h2>
      <pre className="text-sm">{error.message}</pre>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/indicadores" element={<Indicadores />} />
              <Route path="/inconsistencies" element={<Inconsistencies />} />
              <Route path="/inconsistencies/new" element={<NewInconsistency />} />
              <Route path="/inconsistencies/edit/:id" element={<EditInconsistency />} />
              <Route path="/pysus-query" element={<PySUSQuery />} />
            </Routes>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
