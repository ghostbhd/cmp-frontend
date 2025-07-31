import './TopConsumptionItem.css';

export interface TopConsumption {
    rank: string;
    iccid: string;
    usage: {
        value: number;
        unit: string;
    };
    type: string;
}

interface TopConsumptionItemProps {
    item: TopConsumption;
}

export function TopConsumptionItem({
    item,
}: Readonly<TopConsumptionItemProps>) {
    return (
        <div
            className="top-consumption-item-container"
            data-testid="top-consumption-item"
        >
            <div className="top-consumption-rank-wrapper">
                <div className="top-consumption-rank-bg">{item.rank}</div>
            </div>
            <div className="top-consumption-info flex-1 ml-4">
                <div className="top-consumption-iccid">{item.iccid}</div>
                <div className="top-consumption-details flex items-center mt-1">
                    <span className="text-gray-500 text-sm">
                        Data Used ({item.usage.value.toFixed(2)}{' '}
                        {item.usage.unit})
                    </span>
                    <div className="dot-separator w-1 h-1 bg-gray-300 rounded-full mx-2"></div>
                    <span className="text-gray-500 text-xs">{item.type}</span>
                </div>
            </div>
        </div>
    );
}
