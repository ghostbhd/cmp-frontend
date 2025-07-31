import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    type TooltipProps,
} from 'recharts';
import { MoveUpRight } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const timeOverviewData = [
    { day: 'Sun', consumption: 3.5, color: '#E2EEFF' },
    { day: 'Mon', consumption: 4.0, color: '#E2E2E2' },
    { day: 'Tue', consumption: 5.0, color: '#56ABA0' },
    { day: 'Wed', consumption: 4.2, color: '#E2E2E2' },
    { day: 'Thu', consumption: 4.5, color: '#E2EEFF' },
    { day: 'Fri', consumption: 4.0, color: '#E2E2E2' },
    { day: 'Sat', consumption: 4.3, color: '#E2EEFF' },
];

const defaultRadius = 4;
const defaultYDomain = 5;

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
    if (active && payload?.length) {
        return (
            <div
                className="bg-white p-3 rounded-xl shadow-lg"
                style={{ minWidth: '180px' }}
            >
                <div className="text-gray-500 text-sm mb-1">June 2025</div>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#FFEEE0] rounded-full flex items-center justify-center">
                        <MoveUpRight
                            className="h-[10px] w-[10px] text-[#56ABA0]"
                            strokeWidth={3}
                        />
                    </div>
                    <div className="font-bold text-gray-900">3.2K</div>
                    <div className="text-gray-500 text-sm">consumption</div>
                </div>
            </div>
        );
    }
    return null;
}

export default function TimeOverviewChart() {
    const [timeFilter, setTimeFilter] = useState('last-6-month');

    return (
        <div className="bg-[#F9F9F9] p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    Time Overview
                </h3>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-40 bg-[#E8EEF3] text-[#2D3748] font-medium rounded-full border-none">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last-6-month">
                            Last 6 Month
                        </SelectItem>
                        <SelectItem value="last-3-month">
                            Last 3 Month
                        </SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeOverviewData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#E5E7EB"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#6B7280' }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, defaultYDomain]}
                            tickFormatter={(value) => `${value} GB`}
                            tickCount={6}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar
                            dataKey="consumption"
                            radius={[defaultRadius, defaultRadius, 0, 0]}
                            maxBarSize={40}
                        >
                            {timeOverviewData.map((entry) => (
                                <Cell
                                    key={`cell-${entry.day}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
