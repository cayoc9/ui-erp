import React from 'react';
import { CircularProgress } from '@mui/material';
import { ResponsiveContainer } from 'recharts';

/**
 * Base wrapper component for all charts
 * Handles loading, error states and provides responsive container
 */
const ChartWrapper = ({
  loading = false,
  error = null,
  isEmpty = false,
  title,
  height = 300,
  children
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow h-[300px]">
        <CircularProgress size={40} />
        <p className="mt-2 text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow h-[300px]">
        <div className="text-red-500 mb-2">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <p className="text-gray-800 font-medium">Erro ao carregar dados</p>
        <p className="text-sm text-gray-600 mt-1">{error}</p>
      </div>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow h-[300px]">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-gray-600">Nenhum dado disponível</p>
      </div>
    );
  }

  // Regular render with data
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {title && (
        <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWrapper;