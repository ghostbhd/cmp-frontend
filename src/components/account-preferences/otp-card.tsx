import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Shield, ShieldCheck, QrCode, Smartphone } from 'lucide-react';

const OTP_LENGTH = 6;
const VERIFICATION_DELAY = 1000;

/**
 * OTPCard Component
 *
 * A two-factor authentication setup component with modal-based QR code display
 * and 6-digit OTP input verification.
 *
 * Key Features:
 * - Enable/Disable 2FA toggle
 * - Modal with QR code placeholder for authenticator app setup
 * - 6-digit OTP input with auto-submission
 * - State persistence for enabled/disabled status
 * - Focus management and keyboard navigation
 * - Accessibility support with proper ARIA labels
 *
 * User Flow:
 * 1. Click "Enable Two-Factor Authentication"
 * 2. Modal opens with QR code and instructions
 * 3. User scans QR code with authenticator app
 * 4. User enters 6-digit verification code
 * 5. Code auto-submits when complete
 * 6. Modal closes and button changes to "Disable"
 *
 * @example
 * <OTPCard />
 */

export function OTPCard() {
    const [isOTPEnabled, setIsOTPEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleEnableOTP = () => {
        setIsModalOpen(true);
        setOtpValue('');
    };

    const handleDisableOTP = () => {
        setIsOTPEnabled(false);
    };

    const handleOTPComplete = async (value: string) => {
        if (value.length === OTP_LENGTH) {
            setIsLoading(true);

            try {
                // Simulate API verification
                await new Promise((resolve) =>
                    setTimeout(resolve, VERIFICATION_DELAY),
                );

                // Simulate successful verification
                setIsOTPEnabled(true);
                setIsModalOpen(false);
                setOtpValue('');
            } catch {
                // Handle error - in real app, show error message
                setOtpValue('');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleModalClose = () => {
        if (!isLoading) {
            setIsModalOpen(false);
            setOtpValue('');
        }
    };

    return (
        <>
            <Card
                className="w-full max-w-2xl"
                style={{ backgroundColor: 'white' }}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        {isOTPEnabled ? (
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                        ) : (
                            <Shield
                                className="w-5 h-5"
                                style={{ color: '#56ABA0' }}
                            />
                        )}
                        Two-Factor Authentication
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="max-w-lg mx-auto">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    <Smartphone className="w-5 h-5 text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900">
                                        {isOTPEnabled
                                            ? 'Two-factor authentication is enabled'
                                            : 'Add an extra layer of security'}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {isOTPEnabled
                                            ? 'Your account is protected with two-factor authentication using an authenticator app.'
                                            : "Protect your account with two-factor authentication. You'll need to verify your identity with a code from your authenticator app."}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2">
                                {isOTPEnabled ? (
                                    <Button
                                        variant="outline"
                                        onClick={handleDisableOTP}
                                        className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50 cursor-pointer"
                                    >
                                        Disable Two-Factor Authentication
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleEnableOTP}
                                        style={{
                                            backgroundColor: '#56ABA0',
                                            color: 'white',
                                        }}
                                        className="hover:opacity-90 cursor-pointer"
                                    >
                                        Enable Two-Factor Authentication
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-gray-900">
                            <QrCode
                                className="w-5 h-5"
                                style={{ color: '#56ABA0' }}
                            />
                            Set up Two-Factor Authentication
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* QR Code Section */}
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                <div className="text-center">
                                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">
                                        QR Code Placeholder
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Scan with your authenticator app
                                    </p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                <p className="font-medium mb-1 text-gray-900">
                                    Setup Instructions:
                                </p>
                                <ol className="text-left space-y-1 max-w-sm mx-auto">
                                    <li>1. Open your authenticator app</li>
                                    <li>2. Scan the QR code above</li>
                                    <li>3. Enter the 6-digit code below</li>
                                </ol>
                            </div>
                        </div>

                        {/* OTP Input Section */}
                        <div className="space-y-4">
                            <div className="text-center">
                                <label
                                    htmlFor="otp-input"
                                    className="text-sm font-medium text-gray-900 block mb-3"
                                >
                                    Enter verification code
                                </label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        id="otp-input"
                                        maxLength={OTP_LENGTH}
                                        value={otpValue}
                                        onChange={setOtpValue}
                                        onComplete={handleOTPComplete}
                                        disabled={isLoading}
                                    >
                                        <InputOTPGroup>
                                            {Array.from(
                                                { length: OTP_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className="w-10 h-10 text-center border rounded-md"
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>

                                {isLoading && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Verifying code...
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Helper Text */}
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                                The verification code will be automatically
                                submitted when you enter all 6 digits.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

// Default export for lazy loading
export default OTPCard;
