import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardAction,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, X } from 'lucide-react';

interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phone: string;
}

const MIN_USERNAME_LENGTH = 3;

/**
 * UserInfoCard Component
 *
 * A card component that displays user information with toggle between read-only and edit modes.
 * Features form validation, error handling, and accessibility support.
 *
 * Key Features:
 * - Toggle between read-only and edit modes
 * - Form validation for all fields
 * - Real-time error feedback
 * - Keyboard navigation support
 * - ARIA labels for accessibility
 *
 * @example
 * <UserInfoCard />
 */

export function UserInfoCard() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [errors, setErrors] = useState<Partial<UserInfo>>({});

    // Original user data
    const [originalUserInfo] = useState<UserInfo>({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        phone: '+1 (555) 123-4567',
    });

    // Current form data
    const [userInfo, setUserInfo] = useState<UserInfo>(originalUserInfo);

    const validateField = (field: keyof UserInfo, value: string): string => {
        switch (field) {
            case 'firstName':
            case 'lastName':
                return value.trim() === '' ? 'This field is required' : '';
            case 'email':
                if (value.trim() === '') return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address';
                }
                return '';
            case 'username':
                if (value.trim() === '') return 'Username is required';
                if (value.length < MIN_USERNAME_LENGTH) {
                    return 'Username must be at least 3 characters';
                }
                return '';
            case 'phone':
                if (value.trim() === '') return 'Phone number is required';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (field: keyof UserInfo, value: string) => {
        setUserInfo((prev) => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const handleSave = () => {
        // Validate all fields
        const newErrors: Partial<UserInfo> = {};
        let hasErrors = false;

        (Object.keys(userInfo) as (keyof UserInfo)[]).forEach((field) => {
            const error = validateField(field, userInfo[field]);
            if (error) {
                newErrors[field] = error;
                hasErrors = true;
            }
        });

        setErrors(newErrors);

        if (!hasErrors) {
            // Save the data (in a real app, this would be an API call)
            setIsEditMode(false);
            // Simulate successful save without console.log
        }
    };

    const handleCancel = () => {
        // Reset to original data
        setUserInfo(originalUserInfo);
        setErrors({});
        setIsEditMode(false);
    };

    const renderField = (
        field: keyof UserInfo,
        label: string,
        type: string = 'text',
    ) => {
        if (isEditMode) {
            return (
                <div className="space-y-2">
                    <Label
                        htmlFor={field}
                        className="text-sm font-medium text-gray-700"
                    >
                        {label}
                    </Label>
                    <Input
                        id={field}
                        type={type}
                        value={userInfo[field]}
                        onChange={(e) =>
                            handleInputChange(field, e.target.value)
                        }
                        className={`${errors[field] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#56ABA0]'} focus:ring-[#56ABA0]/20`}
                        aria-describedby={
                            errors[field] ? `${field}-error` : undefined
                        }
                        aria-invalid={!!errors[field]}
                    />
                    {errors[field] && (
                        <p
                            id={`${field}-error`}
                            className="text-sm text-red-600"
                            role="alert"
                        >
                            {errors[field]}
                        </p>
                    )}
                </div>
            );
        }

        return (
            <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">
                    {label}
                </Label>
                <p className="text-sm font-medium text-gray-900 p-2 bg-gray-50 rounded-md min-h-[32px] flex items-center">
                    {userInfo[field] || 'Not provided'}
                </p>
            </div>
        );
    };

    return (
        <Card className="w-full max-w-2xl" style={{ backgroundColor: 'white' }}>
            <CardHeader>
                <CardTitle className="text-gray-900">
                    Personal Information
                </CardTitle>
                <CardAction>
                    {isEditMode ? (
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={handleSave}
                                aria-label="Save changes"
                                style={{
                                    backgroundColor: '#56ABA0',
                                    color: 'white',
                                }}
                                className="hover:opacity-90 cursor-pointer"
                            >
                                <Save className="w-4 h-4 mr-1" />
                                Save
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancel}
                                aria-label="Cancel editing"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsEditMode(true)}
                            aria-label="Edit personal information"
                            style={{ borderColor: '#56ABA0', color: '#56ABA0' }}
                            className="hover:bg-green-50 cursor-pointer"
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                        </Button>
                    )}
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="max-w-lg mx-auto">
                    <div className="grid gap-6 md:grid-cols-2">
                        {renderField('firstName', 'First Name')}
                        {renderField('lastName', 'Last Name')}
                        {renderField('email', 'Email Address', 'email')}
                        {renderField('username', 'Username')}
                        <div className="md:col-span-2">
                            {renderField('phone', 'Phone Number', 'tel')}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Default export for lazy loading
export default UserInfoCard;
