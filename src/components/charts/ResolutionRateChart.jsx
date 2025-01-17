import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartWrapper from './ChartWrapper';

const COLORS = {
    resolved: '#4caf50', // Green for resolved
    pending: '#ff9800'   // Orange for pending
};

function ResolutionRateChart({ data, loading, error }) {
    const chartData = [
        { name: 'Resolvido', value: data?.resolved || 0 },
        { name: 'Pendente', value: data?.pending || 0 }
    ];

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    // Custom tooltip to show counts and percentages
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
                <div className="bg-white p-2 shadow rounded border">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm">
                        {item.value} ({percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom label to show percentages
    const renderLabel = (entry) => {
        const percentage = ((entry.value / total) * 100).toFixed(1);
        return `${percentage}%`;
    };

    const isEmpty = total === 0;

    return (
        <ChartWrapper
            title="Taxa de Resolutividade"
            loading={loading}
            error={error}
            isEmpty={isEmpty}
        >
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={renderLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === 0 ? COLORS.resolved : COLORS.pending}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        onClick={(data) => console.log('Legend clicked:', data)}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
}

export default ResolutionRateChart;