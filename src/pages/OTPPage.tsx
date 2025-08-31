import React, { useState, useRef, useEffect, Fragment } from "react";
import LottieAnimation from "../components/LottieAnimation";
import AuthLayout from "../components/layouts/AuthLayout";

interface OTPPageProps {
  onBackToLogin?: () => void;
  onVerifyCodeClick?: (email: string) => void;
  email?: string;
}

const OTPPage: React.FC<OTPPageProps> = ({
  onBackToLogin,
  onVerifyCodeClick,
  email = "jon.doe@gmail.com",
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize the refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Check if OTP is complete (all 6 digits filled)
  const isOTPComplete = otp.every((digit) => digit !== "");

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    console.log("OTP verification attempt:", otpString);
    // Navigate to new password page with the email
    if (onVerifyCodeClick) {
      onVerifyCodeClick(email);
    }
  };

  const handleResendCode = () => {
    console.log("Resend code requested for:", email);
  };

  return (
    <AuthLayout>
      {/* Left Side - OTP Verification Form */}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">
          Enter 6 digit code we sent you
        </h1>
        <p className="text-gray-600 text-left">
          We sent a code to <strong>{email}</strong> to verify your identity.
          Enter it below to reset your password securely.
        </p>
      </div>

      {/* OTP Verification Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Code
          </label>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) {
                    inputRefs.current[index] = el;
                  }
                }}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold"
                placeholder="-"
                maxLength={1}
                required
              />
            ))}
          </div>
        </div>

        {/* Verify Code Button */}
        <div>
          <button
            type="submit"
            disabled={!isOTPComplete}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
              isOTPComplete ? "opacity-100" : "opacity-50 cursor-not-allowed"
            }`}
            style={{ backgroundColor: isOTPComplete ? "#75AE46" : "#9CA3AF" }}
            aria-label="Verify OTP code and proceed"
          >
            Verify Code
          </button>
        </div>

        {/* Resend Code Link */}
        {/* <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button 
                  type="button"
                  onClick={handleResendCode}
                  className="font-medium hover:text-green-500 focus:outline-none"
                  style={{color: '#75AE46'}}
                >
                  Get a code
                </button>
              </p>
            </div> */}

        {/* Back to Login Link */}
        {/* <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button 
                  type="button"
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

export default OTPPage;
