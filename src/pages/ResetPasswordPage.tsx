import React, { useState } from "react";
import AuthLayout from "../components/layouts/AuthLayout";

interface ResetPasswordPageProps {
  onBackToLogin?: () => void;
  onGetCodeClick?: (email: string) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({
  onBackToLogin,
  onGetCodeClick,
}) => {
  const [email, setEmail] = useState("");

  // Check if email is valid
  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password email sent to:", email);
    // Navigate to OTP page with the email
    if (onGetCodeClick) {
      onGetCodeClick(email);
    }
  };

  return (
    <AuthLayout>
      {/* Left Side - Reset Password Form */}

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-gray-900 mb-2 text-left
         dark:text-gray-250">
          Reset Password
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-left">
          Enter your email address. We'll send you a code to reset password.
        </p>
      </div>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 my-2"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-3 border border-gray-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-base"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Reset Password Button */}
        <div>
          <button
            type="submit"
            disabled={!isEmailValid}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
              isEmailValid ? "opacity-100" : "opacity-50 cursor-not-allowed"
            }`}
            style={{
              backgroundColor: isEmailValid ? "#75AE46" : "#9CA3AF",
            }}
            aria-label="Send reset password code to email"
          >
            Get a code
          </button>
        </div>

        {/* Back to Login Link */}
        {/* <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button 
                  onClick={onBackToLogin}
                  className="font-medium hover:text-green-500 focus:outline-none"
                  style={{color: '#75AE46'}}
                >
                  Back to login
                </button>
              </p>
            </div> */}
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
