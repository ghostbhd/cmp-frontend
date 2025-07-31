import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import './CurrentConsumption.css';

// Utilitaires fictifs à conserver
function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

export interface ChartDataEntry {
    name: string;
    value: number;
    color: string;
}

// Simule une addition d’usage
function dataAddition(
    a: { value: number; unit: string },
    b: { value: number; unit: string },
) {
    return { value: a.value + b.value, unit: a.unit };
}

// Simule un ratio d’usage
function dataRatio(
    part: { value: number; unit: string },
    total: { value: number; unit: string },
) {
    return { value: part.value / total.value, unit: '' };
}

// Simule formatUsage (unités constantes ici)
function formatUsage(value: number, unit: string) {
    return { value, unit };
}

const PERCENTAGE_FACTOR = 100;

function getPercentage(
    part: { value: number; unit: string },
    total: { value: number; unit: string },
    loading: boolean,
): string {
    if (total.value > 0) {
        const raw = dataRatio(part, total).value * PERCENTAGE_FACTOR;
        return raw > 0 && raw < 1 ? raw.toFixed(1) : Math.round(raw).toString();
    } else if (loading) {
        return '-';
    } else {
        return '0';
    }
}

export default function CurrentConsumption() {
    const [loading, setLoading] = useState(true);
    const [chartDataMap, setChartDataMap] = useState<{
        [key: string]: ChartDataEntry[];
    }>({});
    const [lastUpdated, setLastUpdated] = useState<string>('');

    const fetchData = async () => {
        setLoading(true);

        // MOCK DATA ICI
        const mockResponse = {
            Data: {
                data: [
                    { name: 'Used Data', value: 745.32, color: '#56ABA0' },
                    { name: 'Remaining', value: 254.68, color: '#95B0BF' },
                ],
                last_updated: new Date().toISOString(),
            },
        };

        const chartData = mockResponse.Data.data;
        setChartDataMap({ Data: chartData });
        setLastUpdated(mockResponse.Data.last_updated);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const placeholderData: ChartDataEntry[] = [
        { name: 'Used Data', value: 50, color: '#56ABA0' },
        { name: 'Remaining', value: 50, color: '#95B0BF' },
    ];

    const consumptionData = loading
        ? placeholderData
        : chartDataMap['Data'] || [];

    const used = loading
        ? { value: 0, unit: 'MB' }
        : formatUsage(consumptionData[0]?.value || 0, 'MB');
    const remaining = loading
        ? { value: 0, unit: 'MB' }
        : formatUsage(consumptionData[1]?.value || 0, 'MB');
    const total = dataAddition(used, remaining);

    const usedPercentage = getPercentage(used, total, loading);
    const remainingPercentage = getPercentage(remaining, total, loading);

    return (
        <div className="current-consumption-container bg-white p-6 rounded-xl relative">
            <div className="flex justify-between items-start mb-4">
                <h3 className="current-consumption-title">
                    Current Consumption
                </h3>
                <div className="flex flex-col items-end text-xs">
                    <span className="text-gray-500">Last Updated On :</span>
                    <span className="text-gray-700">
                        {formatDate(lastUpdated)}
                    </span>
                </div>
            </div>
            <div className="current-consumption-chart-wrapper flex flex-col items-center">
                <div className="pie-chart-relative w-72 h-72 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={consumptionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={95}
                                outerRadius={130}
                                startAngle={55}
                                endAngle={480}
                                dataKey="value"
                            >
                                {consumptionData.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="pie-chart-center absolute inset-0 flex items-center justify-center">
                        <div className="pie-center-text">
                            <div className="pie-center-value">
                                {loading
                                    ? 'Loading'
                                    : `${total.value.toFixed(2)} ${total.unit}`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="current-consumption-stats flex w-full justify-between mt-2">
                    <div className="stat-item flex items-start">
                        <div className="stat-badge-used flex items-center justify-center text-white font-medium text-sm rounded-lg">
                            {usedPercentage}%
                        </div>
                        <div className="stat-text ml-2">
                            <div className="stat-label">Used Data</div>
                            <div className="stat-value">
                                {used.value.toFixed(2)} {used.unit}
                            </div>
                        </div>
                    </div>
                    <div className="stat-item flex items-start">
                        <div className="stat-badge-remain flex items-center justify-center text-white font-medium text-sm rounded-lg">
                            {remainingPercentage}%
                        </div>
                        <div className="stat-text ml-2">
                            <div className="stat-label">Remaining</div>
                            <div className="stat-value">
                                {remaining.value.toFixed(2)} {remaining.unit}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
