/**
 * Utility functions for transforming data for different chart types
 */

/**
 * Aggregates data by time period for time series charts
 * @param {Array} data - Raw data points with dates
 * @param {Date} startDate - Period start
 * @param {Date} endDate - Period end
 * @param {string} groupBy - Grouping field (day|week|month)
 * @returns {Array} Aggregated time series data
 */
export const aggregateByPeriod = (data, startDate, endDate, groupBy = 'month') => {
    const filtered = data.filter(item => {
        const date = new Date(item.createDate);
        return date >= startDate && date <= endDate;
    });

    const groups = filtered.reduce((acc, item) => {
        const date = new Date(item.createDate);
        let key;

        switch (groupBy) {
            case 'day':
                key = date.toISOString().split('T')[0];
                break;
            case 'week':
                const week = getWeekNumber(date);
                key = `${date.getFullYear()}-W${week}`;
                break;
            case 'month':
            default:
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }

        if (!acc[key]) {
            acc[key] = {
                period: key,
                total: 0,
                resolved: 0
            };
        }

        acc[key].total++;
        if (item.status === 'resolved') {
            acc[key].resolved++;
        }

        return acc;
    }, {});

    return Object.values(groups).map(group => ({
        ...group,
        resolutionRate: (group.resolved / group.total * 100).toFixed(1)
    }));
};

/**
 * Calculates resolution rate statistics for pie charts
 * @param {Array} data - Raw inconsistency data
 * @returns {Array} Resolution rate statistics
 */
export const calculateResolutionRate = (data) => {
    const totals = data.reduce((acc, item) => {
        const status = item.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const total = Object.values(totals).reduce((sum, val) => sum + val, 0);

    return Object.entries(totals).map(([status, count]) => ({
        status,
        count,
        percentage: ((count / total) * 100).toFixed(1)
    }));
};

/**
 * Groups data by category for bar charts
 * @param {Array} data - Raw data array
 * @param {string} categoryField - Field to group by
 * @param {Object} options - Additional options
 * @returns {Array} Grouped data for bar charts
 */
export const groupByCategory = (data, categoryField, options = {}) => {
    const {
        sortBy = 'count',
        limit = 10,
        includeOthers = true
    } = options;

    const groups = data.reduce((acc, item) => {
        const category = item[categoryField] || 'Unknown';
        if (!acc[category]) {
            acc[category] = {
                category,
                count: 0,
                resolved: 0
            };
        }
        acc[category].count++;
        if (item.status === 'resolved') {
            acc[category].resolved++;
        }
        return acc;
    }, {});

    let result = Object.values(groups)
        .map(group => ({
            ...group,
            resolutionRate: (group.resolved / group.count * 100).toFixed(1)
        }))
        .sort((a, b) => b[sortBy] - a[sortBy]);

    if (limit && includeOthers && result.length > limit) {
        const topItems = result.slice(0, limit - 1);
        const others = result.slice(limit - 1).reduce((acc, item) => ({
            category: 'Others',
            count: acc.count + item.count,
            resolved: acc.resolved + item.resolved
        }), { count: 0, resolved: 0 });

        others.resolutionRate = (others.resolved / others.count * 100).toFixed(1);
        result = [...topItems, others];
    } else if (limit) {
        result = result.slice(0, limit);
    }

    return result;
};

// Helper function to get ISO week number
const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};