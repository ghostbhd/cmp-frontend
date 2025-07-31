import { MoreHorizontal } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { TopConsumptionItem } from './TopConsumptionItem';
import './TopConsumptionsList.css';

interface TopConsumptionDisplay {
    rank: string;
    iccid: string;
    usage: {
        value: number;
        unit: string;
    };
    type: string;
}

const mockTopConsumptions: TopConsumptionDisplay[] = [
    {
        rank: '1',
        iccid: '89320123456789012345',
        usage: { value: 1024, unit: 'MB' },
        type: 'Data',
    },
    {
        rank: '2',
        iccid: '89320123456789012346',
        usage: { value: 850, unit: 'MB' },
        type: 'Data',
    },
    {
        rank: '3',
        iccid: '89320123456789012347',
        usage: { value: 780, unit: 'MB' },
        type: 'Voice',
    },
];

export default function TopConsumptionsList() {
    const [topConsumptions, setTopConsumptions] = useState<
        TopConsumptionDisplay[]
    >([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        setTopConsumptions(mockTopConsumptions);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="top-consumptions-container bg-white p-6 pb-2 rounded-xl">
            <div className="top-consumptions-header flex items-center justify-between mb-6">
                <h3 className="top-consumptions-title">Top consumptions</h3>
                <MoreHorizontal className="top-consumptions-icon" />
            </div>
            <div className="top-consumptions-list">
                {!loading &&
                    topConsumptions.map((item, index) => (
                        <Fragment key={item.iccid}>
                            <TopConsumptionItem item={item} />
                            {index < topConsumptions.length - 1 && (
                                <div className="divider"></div>
                            )}
                        </Fragment>
                    ))}
                {loading && (
                    <TopConsumptionItem
                        item={{
                            rank: '-1',
                            iccid: 'Loading...',
                            usage: { value: 0, unit: 'MB' },
                            type: 'Unknown',
                        }}
                    />
                )}
            </div>
        </div>
    );
}
