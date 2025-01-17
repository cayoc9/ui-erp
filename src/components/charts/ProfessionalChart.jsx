import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartWrapper from './ChartWrapper';

const ProfessionalChart = ({ data, loading, error }) => {
    // Transform data if needed
    const chartData = data?.map(item => ({
        name: item.name,
        count: item.count
    })) || [];

    return (
        <ChartWrapper
            title="Inconsistências por Profissional"
            loading={loading}
            error={error}
            isEmpty={!data?.length}
        >
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Quantidade" fill="#ff7300" />
                </BarChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export default ProfessionalChart;