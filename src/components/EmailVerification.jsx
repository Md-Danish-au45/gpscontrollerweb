// 4. FRONTEND: Fixed EmailVerification.jsx component
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { useVerifyEmailTokenQuery } from '@/app/api/authApiSlice'; // Changed to useQuery

export function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  
  // RTK Query hook - Now using useQuery instead of useMutation
  const { 
    data,
    isLoading, 
    isSuccess, 
    isError, 
    error 
  } = useVerifyEmailTokenQuery(token, {
    skip: !token // Only run query if token exists
  });
  useEffect(() => {
    console.log('EmailVerification component mounted');
    console.log('Token from URL:', token);
    console.log('Current URL:', window.location.href);
  }, [token]);
  // Handle countdown after success
  useEffect(() => {
        console.log('API State:', { data, isLoading, isSuccess, isError, error });

    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      navigate('/login', { 
        state: { 
          message: "Email verified successfully! Please log in.",
          type: "success"
        } 
      });
    }
  }, [isSuccess, countdown, navigate]);

  const handleReturnToSignup = () => {
    navigate('/signup');
  };

  const handleGoToLogin = () => {
    navigate('/login', { 
      state: { 
        message: "Email verified successfully! Please log in.",
        type: "success"
      } 
    });
  };

  const getErrorMessage = () => {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.status === 400) {
      return 'Invalid or expired verification token';
    }
    if (error?.status >= 500) {
      return 'Server error. Please try again later.';
    }
    return 'Verification failed. Please try again.';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            {/* Status Icon */}
            <div className="mx-auto mb-6">
              {isLoading && (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              )}
              {isSuccess && (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              )}
              {isError && (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Verifying Your Email
                </h2>
                <p className="text-gray-600 mb-6">
                  Please wait while we verify your email address...
                </p>
                <div className="flex justify-center">
                  <div className="animate-pulse flex space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {isSuccess && (
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Email Verified Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your account has been verified. You can now log in to your account.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Redirecting to login in {countdown} seconds...
                </p>
                <button
                  onClick={handleGoToLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Continue to Login
                </button>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 mb-4">
                  {getErrorMessage()}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleReturnToSignup}
                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors bg-white hover:bg-gray-50"
                  >
                    Return to Sign Up
                  </button>
                  <button
                    onClick={handleGoToLogin}
                    className="w-full text-blue-600 hover:text-blue-700 font-medium py-2 px-4 transition-colors"
                  >
                    Go to Login
                  </button>
                </div>
              </div>
            )}

            {/* No Token Error */}
            {!token && (
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-2">
                  Invalid Link
                </h2>
                <p className="text-gray-600 mb-6">
                  This verification link is invalid or malformed.
                </p>
                <button
                  onClick={handleReturnToSignup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Return to Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500">GPS Controller</span>
            </div>
            <p className="text-xs text-gray-400">
             Track Anything, Anywhere
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2024 GPS Controller. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
