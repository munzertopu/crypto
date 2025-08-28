import React, { useState } from 'react';
import LottieAnimation from '../components/LottieAnimation';

interface ResetPasswordPageProps {
  onBackToLogin?: () => void;
  onGetCodeClick?: (email: string) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onBackToLogin, onGetCodeClick }) => {
  const [email, setEmail] = useState('');

  // Check if email is valid
  const isEmailValid = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password email sent to:', email);
    // Navigate to OTP page with the email
    if (onGetCodeClick) {
      onGetCodeClick(email);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Reset Password Form */}
      <div className="flex-1 flex items-center justify-center px-8 sm:px-12 lg:px-16 text-left">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Reset Password</h1>
            <p className="text-gray-600 text-left">Enter your email address. We'll send you a code to reset password.</p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                  isEmailValid ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ backgroundColor: isEmailValid ? '#75AE46' : '#9CA3AF' }}
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
        </div>
      </div>

      {/* Right Side - Crypto Icons and Portal */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 relative overflow-hidden">
         <div className="text-center relative z-10">
           <LottieAnimation
             type="animation"
             width={700}
             height={700}
             loop={true}
             autoplay={true}
             className="mb-6"
           />
         </div>
       </div>
    </div>
  );
};

export default ResetPasswordPage;
