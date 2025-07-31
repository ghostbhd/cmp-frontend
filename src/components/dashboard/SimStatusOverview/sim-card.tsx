import { Smartphone } from 'lucide-react';

interface SIMCardProps {
    label: string;
    value: string | number;
    onClick?: () => void;
}

export default function SIMCard({
    label,
    value,
    onClick,
}: Readonly<SIMCardProps>) {
    const isTotal = label === 'Total';

    const bgColor = isTotal ? '#56ABA0' : '#F2F4F7';
    const iconColor = isTotal ? '#F2F4F7' : '#56ABA0';
    const iconBgColor = isTotal ? '#96b5af' : '#B0DFD6';

    return (
        <div
            className={`py-6 px-4 rounded-lg w-[254px] flex-shrink-0`}
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: iconBgColor }}
                >
                    <Smartphone
                        className="h-6 w-6"
                        style={{ color: iconColor }}
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}
