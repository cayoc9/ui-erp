import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartWrapper from './ChartWrapper';

function ResolutionTrendChart({ data, loading, error }) {
    // Data should be in format: [{ period: 'Jan 2024', resolutionRate: 75.5 }, ...]
    const formattedData = data?.map(item => ({
        ...item,
        resolutionRate: Number(item.resolutionRate).toFixed(1)
    })) || [];

    const isEmpty = !loading && !error && (!data || data.length === 0);

    return (
        <ChartWrapper
            title="Percentual Mensal de Resoluções"
            loading={loading}
            error={error}
            isEmpty={isEmpty}
        >
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="period"
                        padding={{ left: 30, right: 30 }}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        formatter={(value) => [`${value}%`, 'Taxa de Resolução']}
                        labelStyle={{ color: '#666' }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="resolutionRate"
                        name="Taxa de Resolução"
                        stroke="#2196f3"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
}

export default ResolutionTrendChart;