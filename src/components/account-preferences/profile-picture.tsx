import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit } from 'lucide-react';

interface ProfilePictureProps {
    className?: string;
    imageUrl?: string;
    initials?: string;
}

/**
 * ProfilePicture Component
 *
 * A circular profile picture component with 3D flip animation that reveals an edit icon on hover.
 * Features keyboard accessibility and proper ARIA labels.
 *
 * @param className - Additional CSS classes to apply
 * @param imageUrl - URL of the profile image (defaults to placeholder)
 * @param initials - Fallback initials to display if image fails to load
 *
 * @example
 * <ProfilePicture
 *   imageUrl="/path/to/image.jpg"
 *   initials="JD"
 *   className="custom-class"
 * />
 */

export function ProfilePicture({
    className = '',
    imageUrl = '/ghost.png',
    initials = 'JD',
}: ProfilePictureProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className={`flip-card-container w-32 h-32 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                role="button"
                tabIndex={0}
                aria-label="Profile picture - hover to see edit option, press Enter to edit"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsHovered(!isHovered);
                    }
                }}
                style={{ cursor: 'pointer' }}
            >
                <div
                    className={`flip-card relative w-full h-full ${isHovered ? 'flipped' : ''}`}
                >
                    {/* Front face - Avatar */}
                    <div className="flip-card-front absolute inset-0">
                        <Avatar
                            className="w-full h-full border-4 shadow-lg"
                            style={{ borderColor: '#B0DFD6' }}
                        >
                            <AvatarImage
                                src={imageUrl}
                                alt="Profile picture"
                                className="object-cover"
                            />
                            <AvatarFallback
                                className="text-2xl font-semibold text-white"
                                style={{ backgroundColor: '#56ABA0' }}
                            >
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Back face - Edit icon */}
                    <div className="flip-card-back absolute inset-0">
                        <div
                            className="w-full h-full rounded-full flex items-center justify-center border-4 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                            style={{
                                backgroundColor: '#56ABA0',
                                borderColor: '#B0DFD6',
                            }}
                        >
                            <Edit
                                className="w-12 h-12 text-white"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">
                    John Doe
                </h3>
                <p className="text-sm text-gray-600">
                    Click to edit profile picture
                </p>
            </div>
        </div>
    );
}

// Default export for lazy loading
export default ProfilePicture;
