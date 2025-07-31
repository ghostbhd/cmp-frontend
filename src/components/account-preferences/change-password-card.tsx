import { useState, type FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';

interface PasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface PasswordErrors {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    general?: string;
}

const MIN_PASSWORD_LENGTH = 8;
const LOADING_DELAY = 1500;
const SUCCESS_TIMEOUT = 3000;

/**
 * ChangePasswordCard Component
 *
 * A secure password change form with real-time validation and user feedback.
 * Features password visibility toggles, strength validation, and success notifications.
 *
 * Key Features:
 * - Three password fields (current, new, confirm)
 * - Password visibility toggles
 * - Real-time validation (matching passwords, strength requirements)
 * - Success/error feedback
 * - Form reset after successful submission
 * - Accessibility support with proper labels and error announcements
 *
 * Password Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 *
 * @example
 * <ChangePasswordCard />
 */

export function ChangePasswordCard() {
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<PasswordErrors>({});
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validatePasswords = (): PasswordErrors => {
        const newErrors: PasswordErrors = {};

        // Validate old password
        if (!passwordForm.oldPassword.trim()) {
            newErrors.oldPassword = 'Current password is required';
        }

        // Validate new password
        if (!passwordForm.newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordForm.newPassword.length < MIN_PASSWORD_LENGTH) {
            newErrors.newPassword =
                'Password must be at least 8 characters long';
        } else if (
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)
        ) {
            newErrors.newPassword =
                'Password must contain uppercase, lowercase, and number';
        }

        // Validate confirm password
        if (!passwordForm.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your new password';
        } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleInputChange = (field: keyof PasswordForm, value: string) => {
        setPasswordForm((prev) => ({ ...prev, [field]: value }));

        // Clear errors when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }

        // Clear general error
        if (errors.general) {
            setErrors((prev) => ({ ...prev, general: undefined }));
        }

        // Real-time validation for password matching
        if (field === 'confirmPassword' || field === 'newPassword') {
            const newPassword =
                field === 'newPassword' ? value : passwordForm.newPassword;
            const confirmPassword =
                field === 'confirmPassword'
                    ? value
                    : passwordForm.confirmPassword;

            if (confirmPassword && newPassword !== confirmPassword) {
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: 'Passwords do not match',
                }));
            } else if (errors.confirmPassword === 'Passwords do not match') {
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
        }
    };

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validatePasswords();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, LOADING_DELAY));

            // Simulate success
            setShowSuccess(true);
            setPasswordForm({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), SUCCESS_TIMEOUT);
        } catch {
            setErrors({
                general: 'Failed to change password. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const renderPasswordInput = (
        field: keyof PasswordForm,
        label: string,
        placeholder: string,
    ) => {
        const isVisible = showPasswords[field];

        return (
            <div className="space-y-2 w-full">
                <Label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </Label>
                <div className="relative">
                    <Input
                        id={field}
                        type={isVisible ? 'text' : 'password'}
                        placeholder={placeholder}
                        value={passwordForm[field]}
                        onChange={(e) =>
                            handleInputChange(field, e.target.value)
                        }
                        className={`pr-10 ${
                            errors[field]
                                ? 'border-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:border-[#56ABA0]'
                        } focus:ring-[#56ABA0]/20`}
                        aria-describedby={
                            errors[field] ? `${field}-error` : undefined
                        }
                        aria-invalid={!!errors[field]}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility(field)}
                        aria-label={
                            isVisible
                                ? `Hide ${label.toLowerCase()}`
                                : `Show ${label.toLowerCase()}`
                        }
                    >
                        {isVisible ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                        )}
                    </Button>
                </div>
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
    };

    return (
        <Card className="w-full max-w-2xl" style={{ backgroundColor: 'white' }}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                    <Lock className="w-5 h-5" style={{ color: '#56ABA0' }} />
                    Change Password
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="max-w-lg mx-auto">
                    {showSuccess && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">
                                    Password changed successfully!
                                </span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderPasswordInput(
                            'oldPassword',
                            'Current Password',
                            'Enter your current password',
                        )}

                        {renderPasswordInput(
                            'newPassword',
                            'New Password',
                            'Enter your new password',
                        )}

                        {renderPasswordInput(
                            'confirmPassword',
                            'Confirm New Password',
                            'Confirm your new password',
                        )}

                        {errors.general && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p
                                    className="text-sm text-red-600"
                                    role="alert"
                                >
                                    {errors.general}
                                </p>
                            </div>
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                className="w-full hover:opacity-90 cursor-pointer"
                                style={{
                                    backgroundColor: '#56ABA0',
                                    color: 'white',
                                }}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? 'Changing Password...'
                                    : 'Change Password'}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            <strong>Password requirements:</strong>
                        </p>
                        <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            <li>• At least 8 characters long</li>
                            <li>• Contains uppercase and lowercase letters</li>
                            <li>• Contains at least one number</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Default export for lazy loading
export default ChangePasswordCard;
