import { useEffect, useState } from 'react';
import SIMCard from './sim-card';

// Type pour les données SIM
type StatusCount = {
    status: string;
    count: number;
};

// Données mockées
const mockSimData: StatusCount[] = [
    { status: 'Active', count: 120 },
    { status: 'Inactive', count: 45 },
    { status: 'Pending', count: 30 },
    { status: 'Blocked', count: 5 },
];

export default function SIMOverview() {
    const [simData, setSimData] = useState<StatusCount[]>([]);

    useEffect(() => {
        // Simulation d'un appel API
        setSimData(mockSimData);
    }, []);

    const handleStatusClick = (status: string) => {
        // Navigate using native browser redirect
        const targetStatus = encodeURIComponent(status);
        window.location.href = `/sim-management?status=${targetStatus}`;
    };

    return (
        <div className="space-y-3 bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900">
                SIM Overview
            </h2>
            <div className="overflow-x-auto">
                <div className="flex gap-6 min-w-fit">
                    <SIMCard
                        label="Total"
                        value={simData.reduce(
                            (acc, item) => acc + item.count,
                            0,
                        )}
                    />
                    {simData.map((item) => (
                        <SIMCard
                            key={item.status}
                            label={item.status}
                            value={item.count}
                            onClick={() => handleStatusClick(item.status)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
