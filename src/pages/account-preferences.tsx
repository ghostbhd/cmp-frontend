import { lazy, Suspense, useState, useEffect } from "react";
import Footer from "@/components/common/footer";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { Card, CardContent } from "@/components/ui/card";
import { handlePageError, diagnoseWhiteScreen } from "@/utils/error-handler";

// Lazy load components for better performance
const ProfilePicture = lazy(
  async () => import("@/components/account-preferences/profile-picture")
);
const UserInfoCard = lazy(
  async () => import("@/components/account-preferences/user-info-card")
);
const ChangePasswordCard = lazy(
  async () => import("@/components/account-preferences/change-password-card")
);
const OTPCard = lazy(
  async () => import("@/components/account-preferences/otp-card")
);

// Enhanced loading skeleton component
const LoadingSkeleton = () => (
  <Card
    className="w-full max-w-2xl mx-auto"
    style={{ backgroundColor: "white" }}
  >
    <CardContent className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

export default function AccountPreferences() {
  // Add a key that changes when there are errors to force remount
  const [componentKey] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Diagnose potential white screen issues
    try {
      const diagnosis = diagnoseWhiteScreen();
      console.warn("Page load diagnosis:", diagnosis);

      // Mark page as loaded after a short delay to ensure all components are ready
      const LOAD_DELAY = 100;
      const timer = setTimeout(() => {
        setIsPageLoaded(true);
      }, LOAD_DELAY);

      return () => clearTimeout(timer);
    } catch (error) {
      handlePageError(error as Error, "AccountPreferences");
      setIsPageLoaded(true); // Still show the page even if diagnosis fails
    }
  }, []);

  // If page is not loaded yet, show a full-page loading skeleton
  if (!isPageLoaded) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F2F8F9" }}>
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackTitle="Account Preferences Error" key={componentKey}>
      <div className="min-h-screen" style={{ backgroundColor: "#F2F8F9" }}>
        <div className="p-6 space-y-6 max-w-3xl mx-auto flex flex-col items-center">
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <ErrorBoundary
              fallbackTitle="Profile Picture Error"
              key={`profile-error-${componentKey}`}
            >
              <div className="w-full">
                <Suspense fallback={<LoadingSkeleton />}>
                  <div
                    data-testid="profile-picture"
                    key={`profile-${componentKey}`}
                  >
                    <ProfilePicture />
                  </div>
                </Suspense>
              </div>
            </ErrorBoundary>

            {/* User Info Section */}
            <ErrorBoundary
              fallbackTitle="User Information Error"
              key={`user-info-error-${componentKey}`}
            >
              <div className="w-full">
                <Suspense fallback={<LoadingSkeleton />}>
                  <div
                    data-testid="user-info-card"
                    key={`user-info-${componentKey}`}
                  >
                    <UserInfoCard />
                  </div>
                </Suspense>
              </div>
            </ErrorBoundary>

            {/* Change Password Section */}
            <ErrorBoundary
              fallbackTitle="Password Change Error"
              key={`password-error-${componentKey}`}
            >
              <div className="w-full">
                <Suspense fallback={<LoadingSkeleton />}>
                  <div
                    data-testid="change-password-card"
                    key={`password-${componentKey}`}
                  >
                    <ChangePasswordCard />
                  </div>
                </Suspense>
              </div>
            </ErrorBoundary>

            {/* OTP Section */}
            <ErrorBoundary
              fallbackTitle="Two-Factor Authentication Error"
              key={`otp-error-${componentKey}`}
            >
              <div className="w-full">
                <Suspense fallback={<LoadingSkeleton />}>
                  <div data-testid="otp-card" key={`otp-${componentKey}`}>
                    <OTPCard />
                  </div>
                </Suspense>
              </div>
            </ErrorBoundary>
          </div>

          <Footer />
        </div>
      </div>
    </ErrorBoundary>
  );
}
