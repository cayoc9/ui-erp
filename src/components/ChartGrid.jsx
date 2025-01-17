import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Import chart components
import InconsistencyTypeChart from './charts/InconsistencyTypeChart';
import DocumentTypeChart from './charts/DocumentTypeChart';
import SectorChart from './charts/SectorChart';
import ProfessionalChart from './charts/ProfessionalChart';
import ResolutionTrendChart from './charts/ResolutionTrendChart';
import ResolutionRateChart from './charts/ResolutionRateChart';

function ChartGrid({ layout = 'grid' }) {
    // Get chart data and loading states from Redux
    const {
        data: chartData,
        loading,
        error
    } = useSelector((state) => state.charts);

    // Handle loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-red-600">
                <p>Error loading chart data: {error}</p>
            </div>
        );
    }

    const gridClassName = layout === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'flex flex-col space-y-6';

    return (
        <div className={gridClassName}>
            {/* Resolution trend takes full width */}
            <div className={layout === 'grid' ? 'col-span-full' : ''}>
                <ResolutionTrendChart data={chartData.resolutionTrend} />
            </div>

            {/* Resolution rate pie chart */}
            <div>
                <ResolutionRateChart data={chartData.resolutionRate} />
            </div>

            {/* Bar charts */}
            <div>
                <InconsistencyTypeChart data={chartData.inconsistencyTypes} />
            </div>
            <div>
                <DocumentTypeChart data={chartData.documentTypes} />
            </div>
            <div>
                <SectorChart data={chartData.sectorDistribution} />
            </div>
            <div>
                <ProfessionalChart data={chartData.professionalDistribution} />
            </div>
        </div>
    );
}

ChartGrid.propTypes = {
    layout: PropTypes.oneOf(['grid', 'stack'])
};

export default ChartGrid;