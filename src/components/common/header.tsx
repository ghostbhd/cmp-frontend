import type { ReactNode } from 'react';

type HeaderProps = {
    title: string;
    subtitle?: string;
    rightContent?: ReactNode; // Optional content (e.g., button)
};

export default function Header({
    title,
    subtitle,
    rightContent,
}: Readonly<HeaderProps>) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                </h1>
                {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {rightContent && <div>{rightContent}</div>}
        </div>
    );
}
