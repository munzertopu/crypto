import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, } from '@fortawesome/free-solid-svg-icons';
import LottieAnimation from '../components/LottieAnimation';

interface LoginPageProps {
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSignUpClick, onForgotPasswordClick, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    
    // Simulate login success - in real app, this would validate credentials
    if (email && password) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

  return (
    <div className="flex bg-white mx-14 my-6 p-14">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center px-8 sm:px-12 lg:px-16 text-left">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-[#0E201E] mb-2 text-left">Login</h1>
            <p className="text-lg text-[#2F3232] text-left">Access your crypto tax tools securely.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className='my-4'>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 my-2">
                Email
              </label>
              
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full my-1 py-2 px-4 border border-gray-300 rounded-xl focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className='my-4'>
              <div className="flex text-sm justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 my-0">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onForgotPasswordClick) {
                      onForgotPasswordClick();
                    }
                  }}
                  className="font-medium focus:outline-none"
                  style={{ color: '#75AE46' }}
                  aria-label="Navigate to forgot password page"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full my-1 py-2 px-4 border border-gray-300 rounded-xl focus:outline-none"
                  placeholder="Type a password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password field' : 'Show password field'}
                >
                  <FontAwesomeIcon 
                    icon={showPassword ? faEye : faEyeSlash} 
                    className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" 
                  />
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className='mt-6 mb-4'>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-lg"
                style={{ backgroundColor: '#90C853', color: 'black' }}
                aria-label="Sign in to account"
              >
                Login
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={onSignUpClick}
                  className="font-medium focus:outline-none"
                  style={{ color: '#75AE46' }}
                  aria-label="Navigate to sign up page"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right Side - Lottie Animation with Stars */}
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

export default LoginPage;
